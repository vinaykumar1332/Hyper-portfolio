function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var icon = document.querySelector('.dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function showContent(section) {
    // Hide all content boxes
    const contentBoxes = document.querySelectorAll('.content-box');
    if(contentBoxes && contentBoxes.length > 0){
        contentBoxes.forEach(box => {
            box.style.display = 'none';
            
        });
    }

    // Show the selected content box
    const selectedBox = document.getElementById(section);
    if (selectedBox) {
        selectedBox.style.display = 'block';
    }
 
}
  document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".show-more-btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const content = this.previousElementSibling;
            const chevron = this.querySelector(".chevron");

            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
                this.innerHTML = 'Show Less <span class="chevron">&#x25B2;</span>';
                chevron.classList.add("rotate");
            } else {
                content.style.display = "none";
                this.innerHTML = 'Show More <span class="chevron">&#x25BC;</span>';
                chevron.classList.remove("rotate");
            }
        });
    });
});





  document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.tech-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
});
const dataApi = '../Json/pdfData.json';
let pdfData;

// Fetch data from JSONBin API
if (localStorage.getItem('pdfData')) {
    pdfData = JSON.parse(localStorage.getItem('pdfData'));
    const totalKeys = Object.keys(pdfData).length;
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
            localStorage.setItem('pdfData', JSON.stringify(pdfData));
            populateCards();
        })
        .catch(error => console.error('Error fetching data:', error));
}
function clearStorage() {
    localStorage.removeItem('pdfData');
    sessionStorage.removeItem('cookieConsent'); 
    console.log('Local and session storage cleared.');
}


// Function to shuffle cards
function shuffleCards() {
    const cardContainer = document.getElementById('cardContainer');
    const cards = Array.from(cardContainer.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach(card => cardContainer.appendChild(card));
}
document.addEventListener('DOMContentLoaded', function () {
    shuffleCards();
});
// Function to create a card element
function createCard(id, { title, description, category }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.setAttribute('data-category', category);
    card.innerHTML = `
       <div class="card-image-wrapper">
        <img src="" data-src="../Assets/images/${category}.jpg" class="lazy-load" alt="${title}"  width="600" height="400" style="aspect-ratio: 3 / 2;">
        </div>
        <div class="content">
            <h2 class="card-h2">${title}</h2>
            <p class="card-p">${description}</p>
            <div class="card-btn-container">
            <button class="view-btn"> <i class="fa-regular fa-eye"></i> Preview</button>
            <button class="Download-pdf-btn">Download <i class="fa-solid fa-download"></i></button>
            </div>  
              <div class="like-container">
              <button role="button" aria-label="Like button">
              <i class="fa fa-heart like-btn" aria-hidden="true"></i></button>
        </div>
        </div>
    `;
    return card;

}

// Function to populate cards
function populateCards() {
    if (!pdfData || typeof pdfData !== 'object') {
      
        return;
    }
    const cardContainer = document.getElementById('cardContainer');
    if (!cardContainer) {
  
        return;
    }
    cardContainer.innerHTML = '';
    Object.entries(pdfData).forEach(([id, data]) => {
        const card = createCard(id, data);
        const viewButton = card.querySelector('.view-btn');
        const downloadButton = card.querySelector('.Download-pdf-btn');
        if (viewButton) {
            viewButton.addEventListener('click', (event) => {
                event.stopPropagation();
                openPDF(id);
            });
        }
        if (downloadButton) {
            downloadButton.addEventListener('click', (event) => {
                event.stopPropagation();
                downloadPDfUrl(id);
            });
        }
        cardContainer.appendChild(card);
    });

    shuffleCards();
    lazyLoadInstance();
    imageLoadOnCategory();  // Call once after all cards are populated
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
            { value: 'ai', text: 'AI' },
            
        ],
        Artificial_Intelligence: [
            { value: 'ai', text: 'AI' },
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
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.pushState({ path: baseUrl }, '', baseUrl);
        location.reload(true); // Reload the page
        clearStorage();
        clearLocalStorageData(); // Clear the local storage data
        window.checkLikedCards('likedCards', 'liked');
    });

});
//images load
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
        angular: '../Assets/images/angularjs.png',
        docker: '../Assets/images/docker.png',
        java:"../Assets/images/java.jpeg",
        ai:"../Assets/images/AI.webp"
    };

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const img = card.querySelector('img.lazy-load');

        if (imagePaths[category]) {
            const imagePath = imagePaths[category];
            img.setAttribute('data-src', imagePath);
        } else {
        }
    });
};


// Function to set the PDF URL in the iframe and show the overlay
function openPDF(fileId) {
    const pdfUrl = pdfData[fileId]?.url;
    const iframe = document.getElementById('pdfIframe');
    const overlay = document.getElementById('pdfOverlay');
    const bodyElement = document.body;
    const scrollToTopContainer = document.querySelector('.scroll-top-container');

    if (pdfUrl && iframe && overlay) {
        console.log('Setting iframe src to:', pdfUrl);
        iframe.src = pdfUrl;
        overlay.style.display = 'flex'; // Show the overlay
        bodyElement.style.overflow = 'hidden'; // Disable body scrolling
        scrollToTopContainer.style.display = 'none'; // Hide the scroll to top button
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
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        const isConfirmed = confirm("Please log in to download the PDF. Do you want to log in?");
        if (isConfirmed) {
            showLoginOverlay(); 
        }
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

document.addEventListener('DOMContentLoaded', updateNavbar);
// Function to close the PDF overlay
function closePDF() {
    const overlay = document.getElementById('pdfOverlay');
    const iframe = document.getElementById('pdfIframe');
    const bodyElement = document.body;
    const scrollToTopContainer = document.querySelector('.scroll-top-container');
    if (overlay && iframe) {
        overlay.style.display = 'none';
        scrollToTopContainer.style.display = 'block';
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
    const sortOptions = document.querySelector('.sort-container-main');
    const noResultsCont = document.querySelector('#results');
    const noResultsMsg = noResultsCont.querySelector('#no-results-message');
    const searchTxtDrop = document.querySelectorAll('.search-text-drop')

    if (visibleCardCount === 0) {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'block';
            noResultsCont.style.display = 'block';
            sortOptions.style.display = "none";
            searchTxtDrop.style.display="none";

        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
            noResultsCont.style.display = 'none';
            sortOptions.style.display = "none";
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
//likes 
document.addEventListener('DOMContentLoaded', () => {
    const maxLikes = 10; // Maximum number of likes allowed
    const likedCards = new Set(JSON.parse(localStorage.getItem('likedCards')) || []); // Load from localStorage

    // Function to update the like state in the UI
    const updateLikeState = () => {
        document.querySelectorAll('.card').forEach((card) => {
            const cardId = card.getAttribute('data-id'); // Use data-id as the unique identifier
            const likeBtn = card.querySelector('.like-btn'); // Like button inside the card

            if (likedCards.has(cardId)) {
                likeBtn.classList.add('liked'); // Add liked class
            } else {
                likeBtn.classList.remove('liked'); // Remove liked class
            }
        });
    };

    // Function to handle the like action
    const handleLike = (button) => {
        const card = button.closest('.card'); // Find the parent card
        const cardId = card.getAttribute('data-id'); // Get the card's unique ID

        if (likedCards.has(cardId)) {
            likedCards.delete(cardId); // Remove the card ID from the set
        } else {
            if (likedCards.size >= maxLikes) {
                showToast("You can have reached the maximum number of likes");
                return;
            }
            likedCards.add(cardId); // Add the card ID to the set
        }
        localStorage.setItem('likedCards', JSON.stringify([...likedCards]));
        updateLikeState();
    };
    window.addEventListener('load', function () {
        const checkLikedCards = (storageKey, targetClass) => {
            const storedLikedCards = JSON.parse(localStorage.getItem(storageKey)) || [];
            document.querySelectorAll('[data-id]').forEach((element) => {
                const dataId = element.getAttribute('data-id');
                if (storedLikedCards.includes(dataId)) {
                    element.classList.add(targetClass);
                    console("likes add");
                } else {

                }
            });
        };
        updateLikeState();
        window.checkLikedCards = checkLikedCards;
    })

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-btn')) {
            handleLike(e.target);
        }
    });

});

//scroll to top
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if(scrollToTopBtn){
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });
    // Scroll to the top smoothly when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function updateNavbar() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const loginNavLink = document.querySelector('.nav-link[href="#"]');
    
        if (isLoggedIn) {
            const username = localStorage.getItem("username");
            loginNavLink.textContent =  `Hello 👤, ${username} ` ;  
            loginNavLink.classList.add('active');
        } else {
            loginNavLink.textContent = 'Login';
            loginNavLink.classList.remove('active');
        }
    }


    function showLoginOverlay() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
        if (isLoggedIn) {
            // User is already logged in, ask for logout confirmation
            const isConfirmed = confirm("You are already logged in. Do you want to logout?");
            if (isConfirmed) {
                // Clear local storage and show a logout notification
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
                showNotification("You have successfully logged out.", "success");

                updateNavbar();
            }
            return; // Exit the function
        }
    
        // If the user is not logged in, show the login overlay
        if (!document.getElementById('loginOverlayParent')) {
            const parentDiv = document.createElement('div');
            parentDiv.id = 'loginOverlayParent';
            parentDiv.className = 'overlay-parent';
            parentDiv.innerHTML = `
                <div id="loginOverlayParent" class="overlay-parent visible">
                    <div class="overlay-container">
                        <div class="overlay">
                            <button class="close-btn" onclick="closeLoginOverlay()">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
                            </button>
                            <div class="overlay-content">
                                <form id="loginForm" class="login-form" onsubmit="validateLogin(event)">
                                    <h2>Login</h2>
                                    <div class="input-group">
                                        <i class="fa fa-user input-icon"></i>
                                        <input type="text" id="username" placeholder="Username or Email" required="">
                                    </div>
                                    <div class="input-group">
                                        <i class="fa fa-lock input-icon"></i>
                                        <input type="password" id="password" placeholder="Password" required="">
                                    </div>
                                    <p id="loginErrorMessage" class="error-msg hidden"></p>
                                    <button type="submit" class="btn-primary">Login</button>
                                </form>
                                <div class="admin-msg">
                                    <h4>
                                        Please contact admin for download access 
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                        <a href="https://vinaykumar1332.github.io/Hyper-portfolio/#contact"> Click here</a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(parentDiv);
            setTimeout(() => parentDiv.classList.add('visible'), 10);
        }
    }
    

function closeLoginOverlay() {
    const overlay = document.getElementById('loginOverlayParent');
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 500);
}

// Close Login Overlay
function closeLoginOverlay() {
    const parentDiv = document.getElementById('loginOverlayParent');
    if (parentDiv) {
        parentDiv.classList.remove('visible');
        setTimeout(() => parentDiv.remove(), 500);
    }
}

// Open Login Overlay
function openLoginOverlay() {
    const loginOverlayParent = document.getElementById('loginOverlayParent');
    loginOverlayParent.classList.add('active');
}


// Function to validate login
async function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("loginErrorMessage");

    try {
        const response = await fetch("../Json/loginData.json");
        if (!response.ok) throw new Error("Unable to fetch user data.");
        const users = await response.json();
        const user = users.find(user => user.username === usernameInput && user.password === passwordInput);

        if (user) {
            // Successful login
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", user.username);  // Save the username
            updateNavbar(); 
            
            errorMessage.classList.add("hidden");
            showNotification("You have successfully logged in!", "success");
            closeLoginOverlay();
        } else {
            // Invalid login
            showNotification("Invalid username or password. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error fetching or processing user data:", error);
        showNotification("An error occurred. Please try again later.", "error");
    }
}


// Function to show notifications
function showNotification(message, type) {
    const overlayContainer = document.querySelector(".overlay-container"); // Fixed selector
    if (!overlayContainer) {
        console.error("Overlay container not found");
        return;
    }
    const notification = document.createElement("div");
    notification.classList.add("notification--login-overlay", type);
    notification.textContent = message;
    overlayContainer.appendChild(notification);

    if(notification){
        setTimeout(() => {
            notification.classList.add("show");
        }, 100);
        setTimeout(() => {
            notification.classList.remove("show");
            if(notification){
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }
        }, 3000);
    }
}

// cookie consent
document.addEventListener("DOMContentLoaded", () => {
    const userChoice = sessionStorage.getItem("cookieConsent");

    if (!userChoice) {
        const cookiePopupHTML = `
            <div class="cookie-popup" id="cookiePopup">
<p>We use cookies to improve your experience. By using our website, you agree to our cookie policy <i class="fa-solid fa-cookie"></i>.</p>
<div class="button-group">
    <button class="accept" id="acceptCookies"><i class="fa-solid fa-check"></i> Accept</button>
    <button class="reject" id="rejectCookies"><i class="fa-solid fa-x"></i> Decline</button>
</div>
</div>
        `;
        document.body.insertAdjacentHTML("beforeend", cookiePopupHTML);
        document.getElementById("acceptCookies").addEventListener("click", () => {
            handleUserChoice("accepted");
        });

        document.getElementById("rejectCookies").addEventListener("click", () => {
            handleUserChoice("rejected");
        });
        function handleUserChoice(choice) {
            sessionStorage.setItem("cookieConsent", choice);
            hidePopup();
        }
        function hidePopup() {
            const popup = document.getElementById("cookiePopup");
            if (popup) {
                popup.style.display = "none";
            }
        }
    }
});


