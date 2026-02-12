// JavaScript for LP interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Antigravity LP Initialized');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Scroll to the success message
            window.scrollTo({
                top: document.getElementById('contact').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
});
