// Smooth scroll ke atas saat klik tombol CTA
document.addEventListener('DOMContentLoaded', function () {
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
