/* about.js */

document.addEventListener('DOMContentLoaded', () => {
    // Optional: Personal dynamic greeting in the console
    console.log("Jai's Portfolio: About Page Loaded Successfully.");
    
    // Smooth scrolling for any internal links added later
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});