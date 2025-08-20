// Handle payment logic
function makePayment() {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    const amount = document.getElementById("amount").value;
    const paymentStatus = document.getElementById("paymentStatus");
  
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      paymentStatus.innerHTML = "<p class='text-danger'>Please fill in all fields.</p>";
      return;
    }
  
    // Simulate payment processing
    paymentStatus.innerHTML = "<p class='text-info'>Processing payment...</p>";
  
    setTimeout(() => {
      // Simulate successful payment
      paymentStatus.innerHTML = `<p class='text-success'>Payment of ₦${amount} was successful!</p>`;
    }, 2000);
  }
  