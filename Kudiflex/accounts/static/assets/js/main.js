// Smoothly expand the currency dropdown on hover
document.getElementById("currencyDropdown").addEventListener("click", function() {
  this.classList.toggle("expanded");
});

// Add scrolling animation for exchange rate section
window.addEventListener("scroll", function() {
  const exchangeCards = document.querySelectorAll(".exchange-card");
  exchangeCards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    if (cardPosition < screenPosition) {
      card.classList.add("animate-fade-in");
    }
  });
});
