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


//--PDF--section
  
  function openPDF(pdf) {
    document.getElementById('pdfIframe').src = pdf;
}
//-lazy load
document.addEventListener("DOMContentLoaded", function() {
    const lazyLoadImages = document.querySelectorAll(".lazy-load");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                console.log(`Loading image: ${image.dataset.src}`);  // Debugging line
                image.src = image.dataset.src;
                image.classList.remove("lazy-load");
                observer.unobserve(image);
            }
        });
    });

    lazyLoadImages.forEach(image => {
        imageObserver.observe(image);
    });
    
});
// ------filter functionality
document.addEventListener("DOMContentLoaded", function() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.addEventListener('change', filterCards);

    function filterCards() {
        const selectedCategory = filterOptions.value;
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});


//--disbale right click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
