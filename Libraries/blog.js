const apiKey = 'b38c034e6f914ed1bd39d439a6adb723';
const url = `https://newsapi.org/v2/everything?q=software+development+technology&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
let articles = [];
let currentIndex = 0;
const batchSize = 6; // Number of articles to load at a time

async function fetchNews() {
    try {
        showPreloader(true);
        const response = await fetch(url);
        const data = await response.json();
        showPreloader(false);

        if (data.status === 'ok') {
            articles = data.articles.sort((a, b) => 
                new Date(b.publishedAt) - new Date(a.publishedAt)
            );
            currentIndex = 0;
            displayNews();
        } else {
            console.error('Error fetching news:', data.message);
            document.getElementById('news-list').innerHTML = '<p>Failed to load news. Please try again later.</p>';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showPreloader(false);
        document.getElementById('news-list').innerHTML = '<p>Something went wrong. Please check your connection.</p>';
    }
}

function displayNews() {
    const newsList = document.getElementById('news-list');
    for (let i = 0; i < batchSize && currentIndex < articles.length; i++, currentIndex++) {
        const article = articles[currentIndex];
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const imageUrl = article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image+Available';
        const title = article.title || 'Untitled Article';
        const description = article.description || 'No description available.';
        const url = article.url || '#';
        const publishedAt = new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });

        newsCard.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h2>${title}</h2>
            <p>${description}</p>
            <p class="date">Published: ${publishedAt}</p>
            <a href="${url}" target="_blank">Read More</a>
        `;

        newsList.appendChild(newsCard);
    }

    // Show/Hide Load More button
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.style.display = currentIndex < articles.length ? 'block' : 'none';
}

function showPreloader(show) {
    document.getElementById('preloader').style.display = show ? 'block' : 'none';
}

// Event Listeners
window.onload = fetchNews;
document.getElementById('load-more').addEventListener('click', displayNews);


function showAdPopup() {
    document.querySelector('.ad-container').style.display = 'block';
}

function closeAdPopup() {
    document.querySelector('.ad-container').style.display = 'none';
}
setTimeout(showAdPopup, 5000);