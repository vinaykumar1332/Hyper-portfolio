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
// document.addEventListener('DOMContentLoaded', function() {
//     const faqContainer = document.getElementById('faq-container');
//     const preloader = document.getElementById('preloader');
//     let currentPage = 1;
//     const faqsPerPage = 5;
//     let isLoading = false;

//     function loadFAQs(page, perPage) {
//         if (isLoading) return;

//         isLoading = true;
//       // Show the preloader
        
//         fetch('faqs.json')  // Replace with your JSON file path
//             .then(response => response.json())
//             .then(data => {
//                 const start = (page - 1) * perPage;
//                 const end = start + perPage;
//                 const faqs = data.slice(start, end);

//                 if (faqs.length > 0) {
//                     faqs.forEach(faq => {
//                         const faqItem = document.createElement('div');
//                         faqItem.className = 'faq-item';

//                         const faqQuestion = document.createElement('button');
//                         faqQuestion.className = 'faq-question';
//                         faqQuestion.setAttribute('aria-expanded', 'false');
//                         faqQuestion.setAttribute('aria-controls', `faq-answer-${faq.id}`);
//                         faqQuestion.innerHTML = `
//                         ${faq.question}
//                         <span class="chevron">&#9662;</span>`;

//                         const faqAnswer = document.createElement('div');
//                         faqAnswer.className = 'faq-answer';
//                         faqAnswer.setAttribute('id', `faq-answer-${faq.id}`);
//                         faqAnswer.setAttribute('role', 'region');
//                         faqAnswer.setAttribute('aria-hidden', 'true');
//                         faqAnswer.textContent = faq.answer;
//                         faqAnswer.style.display = 'none';

//                         faqQuestion.addEventListener('click', function() {
//                             const isVisible = faqAnswer.style.display === 'block';
//                             faqAnswer.style.display = isVisible ? 'none' : 'block';
//                             faqAnswer.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
//                             faqQuestion.setAttribute('aria-expanded', !isVisible);
//                             faqQuestion.querySelector('.chevron').innerHTML = isVisible ? '&#9662;' : '&#9652;';
//                         });

//                         faqItem.appendChild(faqQuestion);
//                         faqItem.appendChild(faqAnswer);

//                         faqContainer.appendChild(faqItem);
//                     });

//                     currentPage++;
//                 } else {
//                     window.removeEventListener('scroll', handleScroll);  // Stop listening to scroll if no more FAQs
//                 }
                 
//                 setTimeout(()=>{
//                     preloader.style.display = 'none';  // Hide the preloader
//                     isLoading = false;
//                 },1000);
               
//             })
//             .catch(error => {
//                 console.error('Error loading FAQs:', error);
//                 preloader.style.display = 'none';  // Hide the preloader even if there's an error
//                 isLoading = false;
//             });
//     }

//     function handleScroll() {
//         const scrollPosition = window.innerHeight + window.scrollY;
//         const threshold = document.body.offsetHeight - 500;

//         if (scrollPosition >= threshold && !isLoading) {
//             loadFAQs(currentPage, faqsPerPage);
//         }
//     }

//     // Initial load
//     loadFAQs(currentPage, faqsPerPage);

//     // Attach scroll event listener
//     window.addEventListener('scroll', handleScroll);
// });


