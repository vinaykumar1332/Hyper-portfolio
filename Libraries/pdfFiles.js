// JSON data for PDF links and card details
const dataApi = '../pdfData.json';
let pdfData;
if (localStorage.getItem('pdfData')) {
    pdfData = JSON.parse(localStorage.getItem('pdfData'));
    console.log('Loaded data from local storage:', pdfData);
    const totalKeys = Object.keys(pdfData).length;
    console.log(`Total number of entries: ${totalKeys}`);
    populateCards();
} else {
    fetch(dataApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pdfData = data.pdfFilesData; // Access the pdfFilesData object
            console.log('Fetched Data:', pdfData);
            const totalKeys = Object.keys(pdfData).length;
            console.log(`Total number of entries: ${totalKeys}`);
            localStorage.setItem('pdfData', JSON.stringify(pdfData));
            populateCards();
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Clear local storage (optional function to clear when needed)
function clearLocalStorageData() {
    localStorage.removeItem('pdfData');
    console.log('Local storage cleared');
}


function imageLoadOnCategory() {
    const cards = document.querySelectorAll('.card');
    const imagePaths = {
        html: '../Assets/images/html-css.jpg',
        javascript: '../Assets/images/javascript.jpeg',
        react: '../Assets/images/react.png',
        dsa: '../Assets/images/dsa.jpeg',
        sql: '../Assets/images/sql.png',
        python: '../Assets/images/python.png',
        mongodb: '../Assets/images/mongodb.jpeg',
        git: '../Assets/images/Git&Github.png',
        sysdesign: '../Assets/images/system design.jfif',
        testing: '../Assets/images/testing.png',
        Nodejs: '../Assets/images/node-js.webp',
        angular:'../Assets/images/angularjs.png',
        docker:'../Assets/images/docker.png'

        // Add other categories and their corresponding image paths here
    };

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const img = card.querySelector('img.lazy-load');

        if (imagePaths[category]) {
            const imagePath = imagePaths[category];
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
document.addEventListener('DOMContentLoaded', function () {
    shuffleCards();
});

//Sort


// Function to create a card element
function createCard(id, { title, description, category }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.setAttribute('data-category', category);
    imageLoadOnCategory();
    card.innerHTML = `
       <div class="card-image-wrapper">
        <img src="" data-src="../Assets/images/${category}.jpg" class="lazy-load" alt="${title}">
        </div>
        <div class="content">
            <h2 class="card-h2">${title}</h2>
            <p class="card-p">${description}</p>
            <div class="card-btn-container">
            <button class="view-btn"> <i class="fa-regular fa-eye"></i> View PDF</button>
            <button class="Download-pdf-btn">Download <i class="fa-solid fa-download"></i></button>
            </div>  
              <div class="like-container">
              <button>
              <i class="fa fa-heart like-btn" aria-hidden="true"></i></button>
        </div>
        </div>
    `;
    return card;
}

// Function to populate cards
function populateCards() {
    if (!pdfData || typeof pdfData !== 'object') {
        console.error('pdfData is undefined, null, or not an object!');
        return;
    }
    const cardContainer = document.getElementById('cardContainer');
    if (!cardContainer) {
        console.error('Card container not found!');
        return;
    }
    cardContainer.innerHTML = '';
    Object.entries(pdfData).forEach(([id, data]) => {
        const card = createCard(id, data);
        const viewButton = card.querySelector('.view-btn');
        const downloadButton = card.querySelector('.Download-pdf-btn')
        if (viewButton) {
            viewButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                openPDF(id);
            });
        }
        if(downloadButton){
            downloadButton.addEventListener('click', (event) =>{
                event.stopPropagation();
                downloadPDfUrl(id);
            })
        }
        cardContainer.appendChild(card);
    });
    console.log('Cards populated successfully.');
    shuffleCards();
    lazyLoadInstance();
    filterCards();
}



document.addEventListener('DOMContentLoaded', function () {
    const mainFilterOptions = document.getElementById('mainFilterOptions');
    const filterOptions = document.getElementById('filterOptions');
    const resetButton = document.getElementById('resetButton');
    const cards = document.querySelectorAll('.card');

    const subcategories = {
        frontend: [
            { value: 'html', text: 'HTML & CSS' },
            { value: 'javascript', text: 'JavaScript' },
            { value: 'react', text: 'React JS' },
            { value: 'angular', text: 'Angular' }
        ],
        backend: [
            { value: 'Nodejs', text: 'Node.js' },
            { value: 'java', text: 'Java' },
            { value: 'python', text: 'Python' }
        ],
        database: [
            { value: 'sql', text: 'SQL' },
            { value: 'mongodb', text: 'MongoDB' },
            { value: 'firebase', text: 'Firebase' }
        ],
        devops: [
            { value: 'docker', text: 'Docker' },
            { value: 'kubernetes', text: 'Kubernetes' },
            { value: 'jenkins', text: 'Jenkins' }
        ],
        other: [
            { value: 'dsa', text: 'DSA' },
            { value: 'git', text: 'Git' },
            { value: 'bash', text: 'Bash' },
            { value: 'sysdesign', text: 'System Design' },
            { value: 'testing', text: 'Testing' },
        ]
    };

    // Event listener for main category filter
    mainFilterOptions.addEventListener('change', function () {
        const selectedCategory = this.value;
        cards.forEach(card => {
            if (selectedCategory === 'select' || card.getAttribute('data-category') === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
       
        filterOptions.innerHTML = '<option value="all">Select Technology</option>';
        if (subcategories[selectedCategory]) {
            subcategories[selectedCategory].forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory.value;
                option.text = subcategory.text;
                filterOptions.appendChild(option);
            });

            filterOptions.style.display = 'inline-block';
            resetButton.style.display = 'inline-block'; // Show the reset button
            console.error(selectedCategory);
            updateUrl('category', selectedCategory);
            return;
        } else {
            filterOptions.style.display = 'none';
            resetButton.style.display = 'none'; // Hide the reset button
        }
        filterCards();
    });
    function updateUrl(selectedCategory, selectedSubcategory) {
        const baseUrl = window.location.origin + window.location.pathname;
        const encodedCategory = encodeURIComponent(selectedCategory);
        const encodedSubcategory = encodeURIComponent(selectedSubcategory);
        const newUrl = `${baseUrl}?category=${encodedCategory}&subcategory=${encodedSubcategory}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        console.log(newUrl);
        return newUrl;
    }
    
    
  
    filterOptions.addEventListener('change', function () {
        const selectedSubcategory = this.value;
        console.log(selectedSubcategory);

        cards.forEach(card => {
            if (selectedSubcategory === 'all' || card.getAttribute('data-subcategory') === selectedSubcategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        resultsCategory(selectedSubcategory);
        function resultsCategory(selectedSubcategory) {
            console.log(selectedSubcategory + ' selected');
            const resultsCategoryElement = document.querySelector('.resultsCategory');
            if (resultsCategoryElement) {
                resultsCategoryElement.innerHTML = selectedSubcategory;
            } else {
                console.error('Element with class "resultsCategory" not found!');
            }
        }
        updateUrl('subcategory', selectedSubcategory);
    });
    resetButton.addEventListener('click', function () {
        mainFilterOptions.value = 'select';
        filterOptions.innerHTML = '<option value="all">Select Technology</option>';
        filterOptions.style.display = 'none';
        resetButton.style.display = 'none';
        cards.forEach(card => {
            card.style.display = 'block'; // Ensure all cards are displayed
        });
    });
    resetButton.addEventListener('click', function () {
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.pushState({ path: baseUrl }, '', baseUrl);
        location.reload(true); 
        clearLocalStorageData();
    });
});
// //sort
// document.addEventListener('DOMContentLoaded', function () {
//     const sortOptions = document.getElementById('sortOptions');
//     const cardContainer = document.getElementById('cardContainer');

//     // Function to sort cards
//     sortOptions.addEventListener('change', function () {
//         const sortBy = this.value;
//         let sortedData;

//         switch (sortBy) {
//             case 'titleAsc':
//                 sortedData = Object.entries(pdfData).sort((a, b) =>
//                     a[1].title.localeCompare(b[1].title)
//                 );
//                 break;
//             case 'titleDesc':
//                 sortedData = Object.entries(pdfData).sort((a, b) =>
//                     b[1].title.localeCompare(a[1].title)
//                 );
//                 break;
//             case 'categoryAsc':
//                 sortedData = Object.entries(pdfData).sort((a, b) =>
//                     a[1].category.localeCompare(b[1].category)
//                 );
//                 break;
//             case 'categoryDesc':
//                 sortedData = Object.entries(pdfData).sort((a, b) =>
//                     b[1].category.localeCompare(a[1].category)
//                 );
//                 break;
//             default:
//                 // Default sorting logic (e.g., original order)
//                 sortedData = Object.entries(pdfData);
//                 break;
//         }

//         // Repopulate cards with sorted data
//         cardContainer.innerHTML = ''; // Clear the existing cards
//         sortedData.forEach(([id, data]) => {
//             const card = createCard(id, data);
//             cardContainer.appendChild(card);
//         });
//         lazyLoadInstance();
//         filterCards();
//         imageLoadOnCategory();
//         console.log('Cards sorted by:', sortBy);

//     });
// }
document.addEventListener('DOMContentLoaded', function () {
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);

    // Get all card elements
    const cards = document.querySelectorAll('.card');

    // Convert NodeList to an array and randomly select 15 cards
    const cardsArray = Array.from(cards);
    const randomCards = getRandomCards(cardsArray, 15); // Get 15 random cards

    // Add the 'liked' class to 15 random cards
    randomCards.forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.classList.add('liked');  // Mark the card as liked
        }
    });

    // Initialize like buttons with event delegation
    cards.forEach(card => {
        const likeButton = card.querySelector('button');

        // Check if the button exists
        if (!likeButton) {
            console.log('Like button not found!');
            return;
        }

        // Handle click event using event delegation
        likeButton.addEventListener('click', function (event) {
            const likeBtn = card.querySelector('.like-btn');  // The heart icon button

            console.log('Like button clicked!');

            // If already liked, unlike the card
            if (likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
                console.log('Card unliked');
            } else {
                // Like the card
                likeBtn.classList.add('liked');
                console.log('Card liked');
                // Show thank-you notification
                showNotification('Thank you for liking!');
            }
        });
    });

    // Function to show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000); // Hide after 2 seconds
    }

    // Function to get random cards
    function getRandomCards(cardsArray, count) {
        let result = [];
        let shuffled = cardsArray.sort(() => 0.5 - Math.random()); // Shuffle the cards
        result = shuffled.slice(0, count); // Get the first 'count' cards (15 in this case)
        return result;
    }
});



// Function to set the PDF URL in the iframe and show the overlay
function openPDF(fileId) {
    const pdfUrl = pdfData[fileId]?.url;
    const iframe = document.getElementById('pdfIframe');
    const overlay = document.getElementById('pdfOverlay');
    const bodyElement = document.body;


    if (pdfUrl && iframe && overlay) {
        console.log('Setting iframe src to:', pdfUrl);
        iframe.src = pdfUrl;
        overlay.style.display = 'flex'; // Show the overlay
        bodyElement.style.overflow = 'hidden'; // Disable body scrolling
        console.log(pdfUrl);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('pdf', fileId);  // You could use `pdfUrl` instead of `fileId`
        const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        console.log("URL updated:", newUrl);
    } else {
        console.error('No PDF URL found for ID:', fileId);
        showToast('Sorry, File is not available');
    }

}

function downloadPDfUrl(fileId) {
    if (!pdfData[fileId]) {
        console.error('Invalid fileId or pdfData not defined.');
        return;
    }
    const downloadPdfUrl = pdfData[fileId].url.replace("/preview", "/edit");
    if (downloadPdfUrl) {
        console.log('Opening modified PDF URL in a new tab:', downloadPdfUrl);
        window.open(downloadPdfUrl, '_blank');
    } else {
        console.error('Failed to modify PDF URL.');
    }
}


// Function to close the PDF overlay
function closePDF() {
    const overlay = document.getElementById('pdfOverlay');
    const iframe = document.getElementById('pdfIframe');
    const bodyElement = document.body;
    if (overlay && iframe) {
        overlay.style.display = 'none';
        iframe.src = ''; // Clear the iframe source
        if (bodyElement) {
            bodyElement.style.overflow = 'visible';
            console.log("close pdf");
        }
    }
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('pdf');
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl)
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

    cardCount.innerHTML = ` Results: ${visibleCardCount}`;

    const noResultsCont = document.querySelector('#results');
    const noResultsMsg = noResultsCont.querySelector('#no-results-message');

    if (visibleCardCount === 0) {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'block';
            noResultsCont.style.display = 'block';

        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
            noResultsCont.style.display = 'none';
        }
    }
}


// Function to implement lazy loading
function lazyLoadInstance() {
    const lazyLoadImages = document.querySelectorAll('.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
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
});

//--results count 
document.addEventListener('DOMContentLoaded', function () {
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

    // Initial count
    filterCards();

});

//filter search and reuslts count
document.addEventListener('DOMContentLoaded', function () {
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
//-filter drop down icon rotate
document.querySelectorAll('.main-filter-options, .filter-options').forEach((dropdown) => {
    dropdown.addEventListener('click', function () {
        this.classList.toggle('open');
    });
});
