// JSON data for PDF links and card details
const pdfData = {
    'html-css-1': {
        url: 'https://drive.google.com/file/d/1rTauQMkzfm02S3uxyL2_mKDVOrJY2a0d/preview',
        title: 'HTML & CSS Basics',
        description: 'Introduction to HTML and CSS.',
        category: 'html'
    },
    'html-css-2': {
        url: 'https://drive.google.com/file/d/1sUWeS6hQYb7MTdEFOIWCorBI4rPUIUx_/preview',
        title: 'Advanced HTML & CSS',
        description: 'Deep dive into HTML and CSS.',
        category: 'html'
    },
    'html-css-3': {
        url: 'https://drive.google.com/file/d/1syooFeN_3AekujhrjCZXMXzeI9un6ypA/preview',
        title: 'CSS Flexbox',
        description: 'Learn Flexbox layout.',
        category: 'html'
    },
    'html-css-4': {
        url: 'https://drive.google.com/file/d/1t6Uhe-5BYHn5_A7mwATp16jLoYfcYrrG/preview',
        title: 'CSS Grid',
        description: 'Learn CSS Grid layout.',
        category: 'html'
    },
    'js-1': {
        url: 'https://drive.google.com/file/d/1rm3G7o2OkW24EffE5yuccc-EEhOmV2Dq/preview',
        title: 'JavaScript Basics',
        description: 'Introduction to JavaScript.',
        category: 'javascript'
    },
    'js-2': {
        url: '',  // URL is missing in the JSON data
        title: 'Advanced JavaScript',
        description: 'Deep dive into JavaScript.',
        category: 'javascript'
    },
    'react-js-1': {
        url: 'https://drive.google.com/file/d/1ridMuJU1P127v3x8IH0vKNq3sAlhOeOM/view',
        title: 'React Basics',
        description: 'Introduction to React.',
        category: 'react'
    },
    'react-js-2': {
        url: 'https://drive.google.com/file/d/1rkM7RIHmB4JHOKOtc3w7FqeKi65-sJQB/preview',
        title: 'React Advanced',
        description: 'Advanced concepts in React.',
        category: 'react'
    },
    'react-js-3': {
        url: 'https://drive.google.com/file/d/1r_Hvmprj-MmhbfOalF31yU34ylXDrk-6/preview',
        title: 'React Hooks',
        description: 'Learn React Hooks.',
        category: 'react'
    },
    'react-js-4': {
        url: 'https://drive.google.com/file/d/1re6roCDU8rWqdfLCnOtLMxFMntozojlW/preview',
        title: 'React Context API',
        description: 'Understanding Context API.',
        category: 'react'
    },
    'dsa-1': {
        url: 'https://drive.google.com/file/d/1rxTjrfVdLTXHNUc6Gc5wpghQVvOXNlxy/preview',
        title: 'Data Structures Basics',
        description: 'Introduction to Data Structures.',
        category: 'dsa'
    },
    'dsa-2': {
        url: 'https://drive.google.com/file/d/1ryvTI0qiEG_UEt-OLjBbvMZPzClbZqmz/preview',
        title: 'Algorithms Basics',
        description: 'Introduction to Algorithms.',
        category: 'dsa'
    },
    'dsa-3': {
        url: 'https://drive.google.com/file/d/1szo8VtfElXEg783P16Ds9JlrJ8ObZgvV/preview',
        title: 'Advanced Algorithms',
        description: 'Deep dive into Algorithms.',
        category: 'dsa'
    },
    'mongo-db-1': {
        url: 'https://drive.google.com/file/d/1sucxZf0txHuKDtbi9apSlkoGjkfRTl39/preview',
        title: 'MongoDB Guide',
        description: 'Learn MongoDB concepts.',
        category: 'mongodb'
    },
    'sql-1': {
        url: 'https://drive.google.com/file/d/1sfxVcTL4bavVSkzFqcns-AXNIApqdCf-/preview',
        title: 'SQL Basics',
        description: 'Introduction to SQL.',
        category: 'sql'
    },
    'python-1': {
        url: 'https://drive.google.com/file/d/1t5USIUD8K5XsBbK3AZSvQIlSvhqa8uAo/preview',
        title: 'Python Basics',
        description: 'Machine learing  Python.',
        category: 'python'
    },
    'react-js-5': {
        url: 'https://drive.google.com/file/d/1v3fEXrTREuZp0FbQspAZIJ1nPAyDwbSe/preview',
        title: 'React Libraries',
        description: 'Top React Libraries and Tools you need.',
        category: 'react'
    },
    'react-js-6': {
        url: 'https://drive.google.com/file/d/1unfOaXb0y1iRcAYqhcOcTX-xCzWtwzJS/preview',
        title: 'React useEffect()',
        description: 'useEffect() in React JS',
        category: 'react'
    },
    'react-js-7': {
        url: 'https://drive.google.com/file/d/1y-u7YXv6C3RPdlHsODZFPMOYQCnSNmcu/preview',
        title: 'React Tips',
        description: 'An intro React Basics',
        category: 'react'
    },
    'js-3': {
        url: 'https://drive.google.com/file/d/1xwRrO5nLlMmzm1_DyqLAjehSSZ5e7eBR/preview',  // URL is missing in the JSON data
        title: 'Funtions in javascript',
        description: 'Types of Funtions in javascript',
        category: 'javascript'
    },
    'js-4': {
        url: 'https://drive.google.com/file/d/1xyNl4MNBTcpqR2miRAJg7Nwm0Hmb5guv/preview',  // URL is missing in the JSON data
        title: 'Javascript Destructuring Concept',
        description: 'Javascript Destructuring',
        category: 'javascript'
    },
    'js-5': {
        url: 'https://drive.google.com/file/d/1sS4PtCU6jYKN5P62P74pmZp6LpRWsOx9/preview',  // URL is missing in the JSON data
        title: 'Javascript Concepts to Ace',
        description: 'Technical Interview',
        category: 'javascript'
    },
    'js-6': {
        url: 'https://drive.google.com/file/d/1y0Ryq2wsRLx5stNJbhRBjBwwe3q5T9ih/preview',  // URL is missing in the JSON data
        title: 'Javascript Local & Session Storage',
        description: 'Stroing Data in Browser',
        category: 'javascript'
    },
    'js-7': {
        url: 'https://drive.google.com/file/d/1sYcqsA_j81zpG3V_gM8uspLomWRl1RRZ/preview',  // URL is missing in the JSON data
        title: 'Javascript ES6 Features',
        description: 'ES6 Features',
        category: 'javascript'
    },
    'js-8': {
        url: 'https://drive.google.com/file/d/1sTmsv0YF_95pXZHntxraJLhB7sLvINpj/preview',  // URL is missing in the JSON data
        title: 'Javascript API',
        description: 'API Terminology HandBook',
        category: 'javascript'
    },
    'sql-2': {
        url: 'https://drive.google.com/file/d/1szEVOC3Vpcv3P_3N6TlxHsCZnsqSKnGd/preview',
        title: 'SQL',
        description: 'SQL Notes',
        category: 'sql'
    },
    'sql-3': {
        url: 'https://drive.google.com/file/d/1sf6ha1EhYebG_CcHlTve28UFP45R3TBR/preview',
        title: 'SQL Leetcode',
        description: 'LeetCode SQL solutions',
        category: 'sql'
    },
    'sql-4': {
        url: 'https://drive.google.com/file/d/1umzbeFY_eVndpG3IDD52IsNwy6CicdC-/preview',
        title: 'SQL ',
        description: 'SQL Interview Questions',
        category: 'sql'
    },
    'python-2': {
        url: 'https://drive.google.com/file/d/1ut6Oyf-Q6MY5ZRFpNLYE71uDwRdilzpq/preview',
        title: 'Python Basics',
        description: 'Introduction to Python.',
        category: 'python'
    },
};

 function imageLoadOnCategory() {
    const cards = document.querySelectorAll('.card');
    const imagePaths = {
        html: '../Assets/images/html-css.jpg',
        javascript: '../Assets/images/javascript.jpeg',
        react: '../Assets/images/react.png',
        dsa:'../Assets/images/dsa.jpeg',
        sql:'../Assets/images/sql.png',
        python:'../Assets/images/python.png',
        mongodb:'../Assets/images/mongodb.jpeg',
        // Add other categories and their corresponding image paths here
    };

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const img = card.querySelector('img.lazy-load');
        
        if (imagePaths[category]) {
            const imagePath = imagePaths[category];
            console.log(`Setting image src for category ${category}: ${imagePath}`);
            img.setAttribute('data-src', imagePath);
        } else {
            console.error(`Image path not found for category: ${category}`);
        }
    });
    
    // Optional: Initialize lazy loading if you're using a lazy loading library
};


// Function to shuffle cards
function shuffleCards() {
    const cardContainer = document.getElementById('cardContainer');
    const cards = Array.from(cardContainer.children);

    // Shuffle the array of cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Append shuffled cards back to the container
    cards.forEach(card => cardContainer.appendChild(card));
}
// Event listener to shuffle cards on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    shuffleCards();
});


// Function to create a card element
function createCard(id, { title, description, category }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.setAttribute('data-category', category);
    imageLoadOnCategory();
    card.innerHTML = `
        <img src="" data-src="../Assets/images/${category}.jpg" class="lazy-load" alt="${title}">
        <div class="content">
            <h2 class="card-h2">${title}</h2>
            <p class="card-p">${description}</p>
            <button class="view-btn">View PDF</button>
        </div>
    `;

    return card;
    
}

// Function to populate cards
function populateCards() {
    const cardContainer = document.getElementById('cardContainer');
    if (!cardContainer) {
        console.error('Card container not found!');
        return;
    }

    cardContainer.innerHTML = ''; // Clear existing content

    Object.entries(pdfData).forEach(([id, data]) => {
        const card = createCard(id, data);
        card.addEventListener('click', () => openPDF(id));
        cardContainer.appendChild(card);
    });

    console.log('Cards populated successfully.');
    imageLoadOnCategory();
    shuffleCards();
}

// Function to set the PDF URL in the iframe and show the overlay
function openPDF(fileId) {
    const pdfUrl = pdfData[fileId]?.url;
    const iframe = document.getElementById('pdfIframe');
    const overlay = document.getElementById('pdfOverlay');

    if (pdfUrl && iframe && overlay) {
        console.log('Setting iframe src to:', pdfUrl);
        iframe.src = pdfUrl;
        overlay.style.display = 'flex'; // Show the overlay
    } else {
        console.error('No PDF URL found for ID:', fileId);
        showToast('Sorry, File is not available');
    }
}

// Function to close the PDF overlay
function closePDF() {
    const overlay = document.getElementById('pdfOverlay');
    const iframe = document.getElementById('pdfIframe');

    if (overlay && iframe) {
        overlay.style.display = 'none'; // Hide the overlay
        iframe.src = ''; // Clear the iframe source
    }
}

// Function to show toast notifications
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.error('Toast container not found!');
        return;
    }

    const toast = document.createElement('div');
    toast.classList.add('toast');

    const toastMessage = document.createElement('span');
    toastMessage.classList.add('toast-message');
    toastMessage.textContent = message;

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const progressBarFill = document.createElement('div');
    progressBarFill.classList.add('progress-bar-fill');
    progressBar.appendChild(progressBarFill);

    toast.appendChild(toastMessage);
    toast.appendChild(progressBar);

    toastContainer.appendChild(toast);

    toast.classList.add('show');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBarFill.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300); // Delay removal for smooth transition
        }
    }, 30); // Adjust interval for progress bar speed
}

// Function to filter and count visible cards
function filterCards() {
    const searchInput = document.querySelector('.search-bar');
    const filterSelect = document.getElementById('filterOptions');
    const cardContainer = document.getElementById('cardContainer');
    const cardCount = document.getElementById('cardCount');

    if (!searchInput || !filterSelect || !cardContainer || !cardCount) {
        console.error('Search input, filter select, or card container not found!');
        return;
    }

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;
    const cards = cardContainer.getElementsByClassName('card');

    let visibleCardCount = 0;

    Array.from(cards).forEach(card => {
        const cardText = card.querySelector('h2').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        const isTextMatch = cardText.includes(searchText);
        const isCategoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;

        if (isTextMatch && isCategoryMatch) {
            card.style.display = 'block';
            visibleCardCount++;
        } else {
            card.style.display = 'none';
        }
    });

    cardCount.innerHTML = ` Results : ${visibleCardCount}`;
}

// Function to implement lazy loading
function lazyLoadInstance() {
    const lazyLoadImages = document.querySelectorAll('.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                console.log(`Loading image: ${image.dataset.src}`);  // Debugging line
                image.src = image.dataset.src;
                image.classList.remove('lazy-load');
                observer.unobserve(image);
            }
        });
    });

    lazyLoadImages.forEach(image => {
        imageObserver.observe(image);
    });
}


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateCards();
    document.querySelector('.search-bar')?.addEventListener('input', filterCards);
    document.getElementById('filterOptions')?.addEventListener('change', filterCards);
    document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
        currentPage++;
        showCards();
    });
    lazyLoadInstance();
});

//--results count 
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const cardContainer = document.getElementById('cardContainer');
    
    // Create and insert the results count element
    const resultsCount = document.createElement('p');
    resultsCount.id = 'resultsCount';
    filterSelect.parentNode.insertBefore(resultsCount, cardContainer);

    searchInput.addEventListener('input', filterCards);
    filterSelect.addEventListener('change', filterCards);

    function filterCards() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        const cards = cardContainer.getElementsByClassName('card');
        
        let visibleCardCount = 0;

        for (let card of cards) {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');
            const isTextMatch = cardText.includes(searchText);
            const isCategoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;

            if (isTextMatch && isCategoryMatch) {
                card.style.display = 'block';
                visibleCardCount++;
            } else {
                card.style.display = 'none';
            }
        }

        updateCardCount(visibleCardCount);
    }

    function updateCardCount(count) {
        resultsCount.textContent = `Results : ${count}`;
    }
    function updateNoResultsMessage(count) {
        if (count === 0) {
            noResultsMessage.style.display = 'block'; // Show message
        } else {
            noResultsMessage.style.display = 'none'; // Hide message
        }
    }
    
    // Initial count
    filterCards();
    updateNoResultsMessage();
});

//filter search and reuslts count
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar');
    const filterSelect = document.getElementById('filterOptions');
    const cardContainer = document.getElementById('cardContainer');
    const cardCount = document.getElementById('cardCount');

    searchInput.addEventListener('input', filterCards);
    filterSelect.addEventListener('change', filterCards);

    function filterCards() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        const cards = cardContainer.getElementsByClassName('card');
        
        let visibleCardCount = 0;

        for (let card of cards) {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');
            const isTextMatch = cardText.includes(searchText);
            const isCategoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;

            if (isTextMatch && isCategoryMatch) {
                card.style.display = 'block';
                visibleCardCount++;
            } else {
                card.style.display = 'none';
            }
        }

        updateCardCount(visibleCardCount);
    }

    function updateCardCount(count) {
        cardCount.textContent = ` Results : ${count}`;
    }

    // Initial count
    filterCards();
});






