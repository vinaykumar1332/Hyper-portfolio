const NEWS_URL = 'https://hyper-portfolio.vercel.app/api/news';
const DEVTO_URL = 'https://dev.to/api/articles';
let articles = [];
let currentIndex = 0;
const batchSize = 6;

window.onload = async () => {
  insertSkeletons();
  await fetchNews();
  await fetchArticlesWithVideos();
  removeSkeletons();
  displayNews();
};

document.getElementById('load-more').addEventListener('click', displayNews);

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
    console.error('Fetch error:', error);
  }
}

async function fetchArticlesWithVideos() {
    try {
      const res = await fetch(DEVTO_URL);
      const data = await res.json();
  
      // Fetch details for each article to access body_html
      const detailPromises = data.slice(0, 10).map(async (article) => {
        const detailRes = await fetch(`https://dev.to/api/articles/${article.id}`);
        return await detailRes.json();
      });
  
      const detailedArticles = await Promise.all(detailPromises);
  
      // Filter video articles
      const videoArticles = detailedArticles
        .filter(article =>
          article.body_html?.includes("<iframe") || article.body_html?.includes("<video")
        )
        .map(a => ({
          title: a.title,
          description: 'Video article by ' + a.user.name,
          url: a.url,
          body_html: a.body_html,
          urlToImage: a.cover_image || '',
          type: 'video'
        }));
  
      articles = [...articles, ...videoArticles];
    } catch (err) {
      console.error("Error fetching video articles:", err);
    }
  }
  

function displayNews() {
  const newsList = document.getElementById('news-list');
  for (let i = 0; i < batchSize && currentIndex < articles.length; i++, currentIndex++) {
    const article = articles[currentIndex];
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card', 'visible');

    if (article.type === 'news') {
      newsCard.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" />
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
    } else if (article.type === 'video') {
      newsCard.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" />
        <h2>🎥 ${article.title}</h2>
        <div class="video-content">${article.body_html}</div>
        <a href="${article.url}" target="_blank">Watch on DEV.to</a>
      `;
    }

    newsList.appendChild(newsCard);
  }

  document.getElementById('load-more').style.display = currentIndex < articles.length ? 'block' : 'none';
}

function insertSkeletons() {
  const newsList = document.getElementById('news-list');
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
