const button = document.getElementById('effectButton');
button.addEventListener('click', () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
});
