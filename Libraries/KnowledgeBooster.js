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


document.addEventListener('DOMContentLoaded', function() {
    // Select the carousel element
    var myCarousel = document.querySelector('#carouselExampleIndicators');
    
    // Initialize the carousel with auto-sliding
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000, // Set the interval for auto-sliding (5000ms = 5 seconds)
        ride: 'carousel' // Enables auto-sliding
    });

    // Optional: You can add custom controls or functionality if needed
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
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