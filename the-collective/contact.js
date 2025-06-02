// js/contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous messages
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        clearErrorMessages();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Basic Validation
        if (name === '') {
            displayError('name-error', 'Name is required.');
            isValid = false;
        }

        if (email === '') {
            displayError('email-error', 'Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            displayError('email-error', 'Please enter a valid email address.');
            isValid = false;
        }

        if (subject === '') {
            displayError('subject-error', 'Subject is required.');
            isValid = false;
        }

        if (message === '') {
            displayError('message-error', 'Message is required.');
            isValid = false;
        } else if (message.length < 10) {
            displayError('message-error', 'Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.classList.add('loading');

            // In a real application, you would send this data to a backend server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name, email, subject, message }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         formStatus.textContent = 'Message sent successfully!';
            //         formStatus.classList.remove('loading');
            //         formStatus.classList.add('success');
            //         contactForm.reset(); // Clear form fields
            //     } else {
            //         formStatus.textContent = 'Failed to send message. Please try again.';
            //         formStatus.classList.remove('loading');
            //         formStatus.classList.add('error');
            //     }
            // })
            // .catch(error => {
            //     formStatus.textContent = 'An error occurred. Please try again later.';
            //     formStatus.classList.remove('loading');
            //     formStatus.classList.add('error');
            //     console.error('Form submission error:', error);
            // });

            // For this example, we'll just simulate success after a delay
            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.remove('loading');
                formStatus.classList.add('success');
                contactForm.reset(); // Clear form fields
            }, 1500);

        } else {
            formStatus.textContent = 'Please correct the errors in the form.';
            formStatus.classList.add('error');
        }
    });

    function displayError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.textContent = '';
        });
    }

    function validateEmail(email) {
        // Basic email regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});