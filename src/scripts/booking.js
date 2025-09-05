document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferredDate').min = today;
    document.getElementById('alternateDate').min = today;

    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Collect form data
        const formData = new FormData(this);
        const bookingData = Object.fromEntries(formData.entries());

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success message
            showMessage('success', 'Your booking request has been submitted successfully! I\'ll get back to you within 24 hours to confirm availability.');
            
            // Reset form
            this.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth' });

        }, 2000);
    });

    // Form validation
    const requiredFields = bookingForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();

        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel') {
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        // Date validation
        if (field.type === 'date') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError(field, 'Please select a future date');
                return false;
            }
        }

        clearFieldError(field);
        return true;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = '#dc3545';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function clearError(e) {
        if (e.target.value.trim()) {
            clearFieldError(e.target);
        }
    }

    function showMessage(type, message) {
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = message;
        formMessage.style.display = 'block';
    }

    // Service option interaction
    const serviceOptions = document.querySelectorAll('.service-option');
    const serviceSelect = document.getElementById('serviceType');

    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update select value based on the service title
            const serviceTitle = this.querySelector('h3').textContent;
            let serviceValue = '';
            
            switch(serviceTitle) {
                case 'Portrait Photography':
                    serviceValue = 'portrait';
                    break;
                case 'Event Photography':
                    serviceValue = 'event';
                    break;
                case 'Commercial Photography':
                    serviceValue = 'commercial';
                    break;
                case 'Lifestyle Photography':
                    serviceValue = 'lifestyle';
                    break;
            }
            
            serviceSelect.value = serviceValue;
            clearFieldError(serviceSelect);
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Add CSS for active service option
const style = document.createElement('style');
style.textContent = `
    .service-option.active {
        border-color: var(--secondary-color);
        background-color: #fff5f5;
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);