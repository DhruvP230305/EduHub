document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // Validate form
      let isValid = true;
      
      if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
      } else {
        removeError('name');
      }
      
      if (email === '') {
        showError('email', 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
      } else {
        removeError('email');
      }
      
      if (subject === '' || subject === null) {
        showError('subject', 'Please select a subject');
        isValid = false;
      } else {
        removeError('subject');
      }
      
      if (message === '') {
        showError('message', 'Please enter your message');
        isValid = false;
      } else {
        removeError('message');
      }
      
      if (isValid) {
        // In a real app, you would send this to the server
        // For demo purposes, we'll show a success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
      }
    });
  }
  
  // Helper functions
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest('.form-group');
    
    // Remove any existing error message
    removeError(inputId);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Add error message to form group
    formGroup.appendChild(errorMessage);
  }
  
  function removeError(inputId) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest('.form-group');
    
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove error message if it exists
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      formGroup.removeChild(errorMessage);
    }
  }
  
  function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div class="success-icon"></div>
      <div class="success-content">
        <h3>Message Sent!</h3>
        <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
      </div>
    `;
    
    // Add success styles
    const style = document.createElement('style');
    style.textContent = `
      .success-message {
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #F0FDF4;
        border: 1px solid #86EFAC;
        border-radius: var(--radius-md);
        padding: 1rem;
        margin-bottom: 1rem;
        animation: fadeIn 0.5s ease;
      }
      
      .success-icon {
        width: 40px;
        height: 40px;
        background-color: #22C55E;
        border-radius: 50%;
        position: relative;
      }
      
      .success-icon:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
      }
      
      .success-content h3 {
        font-size: 1rem;
        margin-bottom: 0.25rem;
        color: #166534;
      }
      
      .success-content p {
        font-size: 0.875rem;
        color: #166534;
        margin-bottom: 0;
      }
      
      .error-message {
        color: #EF4444;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease;
      }
      
      .form-group input.error,
      .form-group select.error,
      .form-group textarea.error {
        border-color: #EF4444;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Insert the success message at the top of the form
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      if (contactForm.contains(successMessage)) {
        contactForm.removeChild(successMessage);
      }
    }, 5000);
  }
});