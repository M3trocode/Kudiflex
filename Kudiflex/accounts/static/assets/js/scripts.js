
// Adding fade-in class to Navbar
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector('.navbar');
    navbar.classList.add('fade-in');
});

// Fade in animation for Navbar
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('fade-in');
    } else {
        navbar.classList.remove('fade-in');
    }
});

// Country detection and flag display
function getCountry(response) {
    const countryCode = response.country_code.toLowerCase();
    const flagContainer = document.getElementById('flag-container');
    flagContainer.innerHTML = `<img src="https://flagcdn.com/24x18/${countryCode}.png" alt="${response.country_name} flag">`;
}

// Function to detect when the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', function () {
    const testimonialBox = document.getElementById('testimonialBox');
  
    if (isInViewport(testimonialBox)) {
      testimonialBox.classList.add('in-view');
    }
  });
// Toggle password visibility
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = passwordField.nextElementSibling;

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

  const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        item.addEventListener('click', onClick)
        }

        document.getElementById('signupForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Collect form data
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic password match validation
            if (password.length >= 8 && password === confirmPassword) {
                try {
                    // Send a POST request to the /register API
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, email, password })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        // Display success message
                        alert(data.message || 'Registration successful! Please check your email for confirmation.');
                        // Redirect to the PIN setup page
                        window.location.href = '/set-pin.html';  // Replace with the actual URL for the PIN setup page
                    } else {
                        alert(data.message || 'Registration failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                }
            } else {
                alert('Passwords do not match or are less than 8 characters.');
            }
        });
        

      document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
        
        // Simulate a success message after form submission
        alert(`Password reset instructions have been sent to ${email}. Please check your inbox.`);
    
        // Clear the form
        this.reset();
    });

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Login successful');
                // Redirect to the user's dashboard or home page
                window.location.href = '/dashboard';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    