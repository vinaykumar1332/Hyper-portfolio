// Function to set the PDF URL in the iframe and show the overlay
function openPDF(fileId) {
    const pdfUrl = pdfLinks[fileId];
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
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
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
// Google Drive PDF links with correct preview URLs
const pdfLinks = {
    // ---HMTL & CSS---
    'html-css-1':'https://drive.google.com/file/d/1rTauQMkzfm02S3uxyL2_mKDVOrJY2a0d/preview',
    'html-css-2': 'https://drive.google.com/file/d/1sUWeS6hQYb7MTdEFOIWCorBI4rPUIUx_/preview',
    'html-css-3':'https://drive.google.com/file/d/1syooFeN_3AekujhrjCZXMXzeI9un6ypA/preview',
    'html-css-4' :'https://drive.google.com/file/d/1t6Uhe-5BYHn5_A7mwATp16jLoYfcYrrG/preview',

    // -- JAVASCRIPT
    'js-1': 'https://drive.google.com/file/d/1rm3G7o2OkW24EffE5yuccc-EEhOmV2Dq/preview',
    'js-2': '',

    // --React JS
    'react-js-1' :'https://drive.google.com/file/d/1ridMuJU1P127v3x8IH0vKNq3sAlhOeOM/view',
    'react-js-2' :'https://drive.google.com/file/d/1rkM7RIHmB4JHOKOtc3w7FqeKi65-sJQB/preview',
    'react-js-3' :'https://drive.google.com/file/d/1r_Hvmprj-MmhbfOalF31yU34ylXDrk-6/preview',
    'react-js-4' :'https://drive.google.com/file/d/1re6roCDU8rWqdfLCnOtLMxFMntozojlW/preview',


    //--DSA--
    'dsa-1': 'https://drive.google.com/file/d/1rxTjrfVdLTXHNUc6Gc5wpghQVvOXNlxy/preview',
    'dsa-2': 'https://drive.google.com/file/d/1ryvTI0qiEG_UEt-OLjBbvMZPzClbZqmz/preview',
    'dsa-3': 'https://drive.google.com/file/d/1szo8VtfElXEg783P16Ds9JlrJ8ObZgvV/preview',

    //Mongo-db
    'mongo-db-1' : 'https://drive.google.com/file/d/1sucxZf0txHuKDtbi9apSlkoGjkfRTl39/preview',

    //SQL
    'sql-1':'https://drive.google.com/file/d/1sfxVcTL4bavVSkzFqcns-AXNIApqdCf-/preview',

    //PYTHON

    'python-1':'https://drive.google.com/file/d/1t5USIUD8K5XsBbK3AZSvQIlSvhqa8uAo/preview',
}


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
        cardCount.textContent = ` <i class="fa fa-list-alt" aria-hidden="true"></i> Results : ${count}`;
    }

    // Initial count
    filterCards();
});

//--load more
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const filterOptions = document.querySelector('#filterOptions');
    const cardContainer = document.querySelector('#cardContainer');
    const cardCount = document.querySelector('#cardCount');
    const loadMoreBtn = document.querySelector('#loadMoreBtn');

    let cardsPerPage = 6;
    let currentPage = 1;

    // Function to update the total card count
    function updateCardCount() {
        const totalCards = cardContainer.querySelectorAll('.card:not([hidden])').length;
        cardCount.textContent = `Results: ${totalCards}`;
    }

    // Function to show cards based on the current page and load more functionality
    function showCards() {
        const cards = cardContainer.querySelectorAll('.card:not([hidden])');
        
        cards.forEach((card, index) => {
            if (index < cardsPerPage * currentPage) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        if (cards.length > cardsPerPage * currentPage) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Function to filter cards based on search and filter options
    function filterCards() {
        const searchTerm = searchBar.value.toLowerCase();
        const filterTerm = filterOptions.value;
        
        const cards = cardContainer.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = filterTerm === 'all' || category === filterTerm;

            if (matchesSearch && matchesFilter) {
                card.removeAttribute('hidden');
            } else {
                card.setAttribute('hidden', 'true');
            }
        });

        updateCardCount();
        currentPage = 1; // Reset to first page whenever filter changes
        showCards();
    }

    // Load more cards on button click
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        showCards();
    });

    // Event listeners
    searchBar.addEventListener('input', filterCards);
    filterOptions.addEventListener('change', filterCards);

    // Initial count and display
    filterCards();
});

//images updated based on data-category
document.addEventListener("DOMContentLoaded", function() {
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
            img.setAttribute('data-src', imagePaths[category]);
        }
    });

    // Optional: Initialize lazy loading if you're using a lazy loading library
    // lazyLoadInstance.update();
});


  
  

