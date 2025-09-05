document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Form submission:', data);

        formMessage.textContent = 'Thank you for your message! I will get back to you within 24-48 hours.';
        formMessage.className = 'form-message success';

        contactForm.reset();

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
});