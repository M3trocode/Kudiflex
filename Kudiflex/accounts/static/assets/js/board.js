// Combined DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
  // Fade-in animation for the main image when the page loads
  const image = document.querySelector('.fade-in');
  if (image) {
    image.style.opacity = 1;
  }

  // Variables and event listeners for navigation buttons
  let currentStep = 1;
  const totalSteps = 3;

  // Show the first step initially
  showStep(currentStep);

  // Next Button Event
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  // Back Button Event
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // Finish Button Event
  const finishBtn = document.querySelector('.finish-btn');
  if (finishBtn) {
    finishBtn.addEventListener('click', function() {
      // Navigate to dashboard or another page
      window.location.href = 'pin.html'; // Modify as needed
    });
  }

  // Function to Show Step
  function showStep(step) {
    document.querySelectorAll('.step').forEach((stepDiv, index) => {
      if (index + 1 === step) {
        stepDiv.classList.add('active');
      } else {
        stepDiv.classList.remove('active');
      }
    });
  }

  // Handle showing the account number input for Other Banks
  const otherBankSelect = document.getElementById('otherBankSelect');
  const otherBankAccountWrapper = document.getElementById('otherBankAccountWrapper');
  const keypadSection = document.getElementById('keypadSection');

  if (otherBankSelect && otherBankAccountWrapper && keypadSection) {
    otherBankSelect.addEventListener('change', function() {
      if (otherBankSelect.value !== "Select a Bank") {
        otherBankAccountWrapper.classList.remove('hidden');
        showKeypad();
      } else {
        otherBankAccountWrapper.classList.add('hidden');
        hideKeypad();
      }
    });
  }

  // Show the keypad when a bank or wallet is selected
  const walletSelect = document.getElementById('walletSelect');
  if (walletSelect) {
    walletSelect.addEventListener('change', function() {
      if (walletSelect.value !== "Select Wallet") {
        showKeypad();
      } else {
        hideKeypad();
      }
    });
  }

  // Function to show the keypad with a smooth transition
  function showKeypad() {
    if (keypadSection) {
      keypadSection.classList.remove('hidden');
      keypadSection.style.transform = 'translateY(0)';
    }
  }

  // Function to hide the keypad
  function hideKeypad() {
    if (keypadSection) {
      keypadSection.classList.add('hidden');
      keypadSection.style.transform = 'translateY(100%)';
    }
  }

  // Handle keypad interaction
  const amountInput = document.querySelector('.amount-input');
  const keypadButtons1 = document.querySelectorAll('.keypad-buttons button');

  if (amountInput && keypadButtons1) {
    keypadButtons1.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === 'Del') {
          amountInput.value = amountInput.value.slice(0, -1);
        } else {
          amountInput.value += value;
        }
      });
    });
  }

  // PIN Overlay Handler
  const continueBtn = document.getElementById('continueBtn');
  const pinOverlay = document.getElementById('pinOverlay');
  const pinInputs = document.querySelectorAll('.pin-boxes input');
  const keypadButtons2 = document.querySelectorAll('.keypad button');

  let currentPinIndex = 0;

  if (continueBtn && pinOverlay) {
    continueBtn.addEventListener('click', () => {
      pinOverlay.classList.remove('hidden');
    });
  }

  // Handle PIN input using the keypad
  if (keypadButtons2 && pinInputs) {
    keypadButtons2.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'Del') {
          if (currentPinIndex > 0) {
            currentPinIndex--;
            pinInputs[currentPinIndex].value = '';
          }
        } else {
          if (currentPinIndex < pinInputs.length) {
            pinInputs[currentPinIndex].value = value;
            currentPinIndex++;
          }
        }
      });
    });
  }

  // Confirm Button Redirects to the Receipt Page
  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      window.location.href = "receipt.html";
    });
  }

  // Display current date on the receipt page
  const dateElement = document.getElementById('date');
  if (dateElement) {
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;
  }
});
