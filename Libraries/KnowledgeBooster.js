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

 // Redirect if accessed directly at /KnowledgeBooster
 if (window.location.pathname === '/KnowledgeBooster') {
    window.location.replace('/Pages/KnowledgeBooster.html');
} 
// Change the URL without reloading the page
else if (window.location.pathname === '/Pages/KnowledgeBooster.html') {
    window.history.pushState({}, '', '/KnowledgeBooster');
}

