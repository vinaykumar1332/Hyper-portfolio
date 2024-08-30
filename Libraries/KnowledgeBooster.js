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
    
    contentBoxes.forEach(box => {
        box.style.display = 'none';
        
    });

    // Show the selected content box
    const selectedBox = document.getElementById(section);
    if (selectedBox) {
        selectedBox.style.display = 'block';
    }
 
}
document.addEventListener('DOMContentLoaded', function() {
    // Find the button element with the ID "sider-btn-1"
    var button = document.getElementById('sider-btn-1');
  
    // Check if the button element exists
    if (button) {
      // Simulate a click event on the button
      button.click();
    } else {
      console.error('Button with ID "sider-btn-1" not found.');
    }
  });


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


// --- faq's
document.addEventListener('DOMContentLoaded', function() {
    const faqContainer = document.getElementById('faq-container');
    const showMoreBtn = document.getElementById('show-more-btn');
    const preloader = document.getElementById('preloader');  // Get the preloader element
    let currentPage = 1;
    const faqsPerPage = 5;
    let isLoading = false;

    function loadFAQs(page, perPage) {
        if (isLoading) return;

        isLoading = true;
        showMoreBtn.classList.add('loading');
        preloader.style.display = 'block';  // Show the preloader
        
        fetch('faqs.json')  // Replace with your JSON file path
            .then(response => response.json())
            .then(data => {
                const start = (page - 1) * perPage;
                const end = start + perPage;
                const faqs = data.slice(start, end);

                if (faqs.length > 0) {
                    faqs.forEach(faq => {
                        const faqItem = document.createElement('div');
                        faqItem.className = 'faq-item';

                        const faqQuestion = document.createElement('div');
                        faqQuestion.className = 'faq-question';
                        faqQuestion.textContent = faq.question;
                        faqQuestion.innerHTML = `
                        ${faq.question}
                        <span class="chevron">&#9662;</span> `;

                        const faqAnswer = document.createElement('div');
                        faqAnswer.className = 'faq-answer';
                        faqAnswer.textContent = faq.answer;

                        faqQuestion.addEventListener('click', function() {
                            const isVisible = faqAnswer.style.display === 'block';
                            faqAnswer.style.display = isVisible ? 'none' : 'block';
                        });

                        faqItem.appendChild(faqQuestion);
                        faqItem.appendChild(faqAnswer);

                        faqContainer.appendChild(faqItem);
                    });

                    currentPage++;
                } else {
                    showMoreBtn.style.display = 'none';  // Hide the button if no more FAQs
                }
                 
                setTimeout(()=>{
                    
                    preloader.style.display = 'none';  // Hide the preloader
                    isLoading = false;
                    showMoreBtn.classList.remove('loading');
                    },1000);
               
            })
            .catch(error => {
                console.error('Error loading FAQs:', error);
                preloader.style.display = 'none';  // Hide the preloader even if there's an error
                isLoading = false;
                showMoreBtn.classList.remove('loading');
            });
    }

    // Initial load
    loadFAQs(currentPage, faqsPerPage);

    // Show more button click handler
    showMoreBtn.addEventListener('click', function() {
        loadFAQs(currentPage, faqsPerPage);
    });
});

