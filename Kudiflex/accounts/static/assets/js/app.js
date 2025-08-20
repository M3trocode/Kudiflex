// Exit button handler
document.getElementById('exitBtn').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
  });
  
  // Exit button handler
document.getElementById('exitBtn').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
  });
  
  // Swap button interaction
  document.getElementById('swapBtn').addEventListener('click', function() {
    const amountToSwap = document.getElementById('amountToSwap').value;
    const tokenFrom = document.getElementById('tokenFrom').value;
    const tokenTo = document.getElementById('tokenTo').value;
  
    if (amountToSwap && tokenFrom && tokenTo) {
      // Here you can calculate the swapped amount based on rates (dummy example)
      const swapRate = 0.9; // Example swap rate
      const estimatedAmount = amountToSwap * swapRate;
      document.getElementById('amountToReceive').value = estimatedAmount.toFixed(2);
    } else {
      alert('Please enter the amount and select tokens');
    }
  });
  
  // Continue button action
  document.getElementById('continueBtn').addEventListener('click', function() {
    // Perform some action, such as confirming the swap
    alert('Proceeding with swap');
  });

  // Exit button handler
document.getElementById('exitBtn').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
  });
  
  // Copy account details handler
  document.getElementById('copyBtn').addEventListener('click', function() {
    const accountDetails = 'Account No: 1234567890\nAccount Name: John Doe';
    navigator.clipboard.writeText(accountDetails).then(() => {
      alert('Account details copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
  
  // Placeholder JavaScript for card creation functionality
document.querySelector('.create-card-btn').addEventListener('click', function() {
    alert('Virtual Card Created!');
  });
  
  