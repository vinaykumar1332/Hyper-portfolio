const NEWS_URL = 'https://hyper-portfolio.vercel.app/api/news';
const DEVTO_URL = 'https://dev.to/api/articles';
let articles = [];
let currentIndex = 0;
const batchSize = 6;

document.addEventListener('DOMContentLoaded', async () => {
  insertSkeletons();
  await Promise.all([fetchNews(), fetchArticlesWithVideos()]);
  removeSkeletons();
  displayNews();
  const loadMoreButton = document.getElementById('load-more');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', displayNews);
  }
});

async function fetchNews() {
  try {
    const response = await fetch(NEWS_URL);
    const data = await response.json();
    if (data.status === 'ok') {
      articles = [...articles, ...data.articles.map(a => ({ ...a, type: 'news' }))];
    } else {
      console.error('Error fetching news:', data.message);
    }
  } catch (error) {
    console.error('Fetch news error:', error);
  }
}

async function fetchArticlesWithVideos() {
  try {
    const res = await fetch(DEVTO_URL);
    const data = await res.json();
    const detailPromises = data.slice(0, 10).map(async (article) => {
      const detailRes = await fetch(`https://dev.to/api/articles/${article.id}`);
      return await detailRes.json();
    });
    const detailedArticles = await Promise.all(detailPromises);
    const videoArticles = detailedArticles
      .filter(article => article.body_html?.includes('<iframe') || article.body_html?.includes('<video'))
      .map(a => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(a.body_html || '', 'text/html');
        const videoElement = doc.querySelector('iframe, video');
        const videoHtml = videoElement ? videoElement.outerHTML : '';
        return {
          title: a.title || 'Untitled',
          description: `Video article by ${a.user?.name || 'Unknown Author'}`,
          url: a.url || '#',
          body_html: videoHtml,
          urlToImage: a.cover_image || 'https://via.placeholder.com/300x180',
          type: 'video'
        };
      });
    articles = [...articles, ...videoArticles];
  } catch (err) {
    console.error('Error fetching video articles:', err);
  }
}

function displayNews() {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;
  for (let i = 0; i < batchSize && currentIndex < articles.length; i++, currentIndex++) {
    const article = articles[currentIndex];
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card', 'visible');
    if (article.type === 'news') {
      newsCard.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" alt="${article.title}" />
        <h2>${article.title || 'No Title'}</h2>
        <p>${article.description || 'No description available'}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
    } else if (article.type === 'video') {
      newsCard.innerHTML = `
        <img src="${article.urlToImage}" alt="${article.title}" />
        <h2>${article.title}</h2>
        <div class="video-content">${article.body_html || '<p>No video available</p>'}</div>
        <a href="${article.url}" target="_blank">Watch on DEV.to</a>
      `;
    }
    newsList.appendChild(newsCard);
  }
  const loadMoreButton = document.getElementById('load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = currentIndex < articles.length ? 'block' : 'none';
  }
}

function insertSkeletons() {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;
  const skeletonContainer = document.createElement('div');
  skeletonContainer.id = 'skeleton-loader';
  skeletonContainer.innerHTML = [...Array(batchSize)].map(() => `
    <div class="news-card skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-link"></div>
    </div>
  `).join('');
  newsList.appendChild(skeletonContainer);
}

function removeSkeletons() {
  const skeleton = document.getElementById('skeleton-loader');
  if (skeleton) skeleton.remove();
}