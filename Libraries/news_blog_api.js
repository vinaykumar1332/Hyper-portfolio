const url = 'https://hyper-portfolio.vercel.app/api/news';
let articles = [];
let currentIndex = 0;
const batchSize = 6;

async function fetchNews() {
    try {
        showPreloader(true);
        const response = await fetch(url);
        const data = await response.json();
        showPreloader(false);

        if (data.status === 'ok') {
            articles = data.articles;
            displayNews();
        } else {
            console.error('Error fetching news:', data.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showPreloader(false);
    }
}

function displayNews() {
    const newsList = document.getElementById('news-list');
    for (let i = 0; i < batchSize && currentIndex < articles.length; i++, currentIndex++) {
        const article = articles[currentIndex];
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" />
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsList.appendChild(newsCard);
    }

    document.getElementById('load-more').style.display = currentIndex < articles.length ? 'block' : 'none';
}

function showPreloader(show) {
    document.getElementById('preloader').style.display = show ? 'block' : 'none';
}

window.onload = fetchNews;
document.getElementById('load-more').addEventListener('click', displayNews);
