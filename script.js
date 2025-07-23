// === Theme Toggle Functionality ===
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  if (currentTheme === 'light') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme + '-mode');
});

// === FAQ Toggle Functionality ===
function toggleFAQ(element) {
  const faqItem = element.parentElement; // Dapatkan container .faq-item
  const answer = element.nextElementSibling; // Dapatkan elemen .faq-answer
  const icon = element.querySelector('.faq-icon'); // Dapatkan ikon +/- di dalam tombol

  // Toggle class 'active' pada container FAQ
  faqItem.classList.toggle('active');

  // Animasi max-height untuk efek expand/collapse
  if (faqItem.classList.contains('active')) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.textContent = '-'; // Ubah ikon menjadi '-'
  } else {
    answer.style.maxHeight = '0px';
    icon.textContent = '+'; // Ubah ikon menjadi '+'
  }
}

// === Payment Processing Functionality ===
// Fungsi yang diperbarui untuk menangani berbagai paket
function processPayment(planIdentifier = 'bulanan-indicator-community') {
  // Objek yang memetakan identifier ke nama paket
  const planNames = {
    'bulanan-indicator-only-early': 'Paket Bulanan - Early Bird (Indicator Only)',
    'bulanan-indicator-community': 'Paket Bulanan - Standard (Indicator + Community)',
    'bulanan-indicator-only': 'Paket Bulanan - Basic (Indicator Only)',
    'bulanan-indicator-community-early': 'Paket Bulanan - Early Bird + (Indicator + Community)',
    '3bulan-indicator-only': 'Paket 3 Bulan (Indicator Only)',
    '3bulan-indicator-community': 'Paket 3 Bulan (Indicator + Community)',
    '12bulan-indicator-only': 'Paket 12 Bulan (Indicator Only)',
    '12bulan-indicator-community': 'Paket 12 Bulan (Indicator + Community)',
    // Tambahkan identifier lain jika diperlukan, misalnya untuk paket Enterprise
    'enterprise': 'Paket Enterprise'
  };

  // Dapatkan nama paket berdasarkan identifier, fallback ke identifier itu sendiri jika tidak ditemukan
  const selectedPlanName = planNames[planIdentifier] || planIdentifier;

  // Tampilkan alert dengan informasi paket yang dipilih
  // Dalam implementasi nyata, ini akan mengarahkan ke gateway pembayaran
  alert(`Mengarahkan ke gateway pembayaran untuk:\n${selectedPlanName}\n\nCatatan: Ini adalah demo - integrasi gateway pembayaran akan segera hadir.`);
}

// === Smooth Scrolling for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Cegah perilaku default dari link anchor
    e.preventDefault();

    // Dapatkan target elemen berdasarkan href
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Gulir halaman dengan animasi smooth ke target elemen
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Gulir agar elemen berada di bagian atas viewport
      });
    }
  });
});
