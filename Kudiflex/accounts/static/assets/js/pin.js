let pin = "";
const maxPinLength = 4;

// Get references to the elements
const pinDisplayDots = document.querySelectorAll('.pin-dot');
const keypadButtons = document.querySelectorAll('.keypad-btn');
const continueButton = document.querySelector('.continue-btn');
const cancelButton = document.querySelector('.cancel-btn');

// Function to update the PIN display
function updatePinDisplay() {
  pinDisplayDots.forEach((dot, index) => {
    if (index < pin.length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Handle keypad button clicks
keypadButtons.forEach(button => {
  button.addEventListener('click', function() {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');

    if (value && pin.length < maxPinLength) {
      pin += value;
    } else if (action === 'backspace' && pin.length > 0) {
      pin = pin.slice(0, -1);
    } else if (action === 'clear') {
      pin = "";
    }

    updatePinDisplay();
  });
});

// Handle the continue button click to submit the PIN
// CSRF token function
function getCSRFToken() {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith("csrftoken=")) {
      return cookie.substring("csrftoken=".length, cookie.length);
    }
  }
  return null;
}

// Handle the continue button click to submit the PIN
continueButton.addEventListener('click', function() {
  if (pin.length === maxPinLength) {
    // Send the PIN to the backend API
    fetch("/set_pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()  // Include CSRF token
      },
      body: JSON.stringify({ pin }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Pin set successfully!") {
          alert("PIN set successfully!");
          window.location.href = 'dashboard.html';  // Redirect to the dashboard or next page
        } else {
          alert(data.message);  // Show error message from backend
        }
        // Clear the PIN after setting
        pin = "";
        updatePinDisplay();
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while setting the PIN.");
      });
  } else {
    alert("Please enter a 4-digit PIN.");
  }
});


// Handle the cancel button click to reset and redirect
cancelButton.addEventListener('click', function() {
  pin = "";
  updatePinDisplay();
  alert('Cancelling... Redirecting to onboarding page.');
  window.location.href = 'onboarding.html';  // Redirect to onboarding page or previous screen
});
