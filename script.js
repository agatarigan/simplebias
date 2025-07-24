// SimpleBias Pro - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. SMOOTH SCROLLING FOR NAVIGATION
    // ========================================
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 2. HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // ========================================
    // 3. PRICING CARD INTERACTIONS
    // ========================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const priceOptions = card.querySelectorAll('.price-option');
        const pricingButton = card.querySelector('.btn-pricing');
        
        // Add click interaction to price options
        priceOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from siblings
                priceOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update button text with selected plan
                const duration = this.querySelector('.duration').textContent;
                const price = this.querySelector('.price').textContent;
                pricingButton.textContent = `Pilih ${duration} - ${price}`;
            });
        });
    });

    // ========================================
    // 4. INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.feature-card, .user-card, .pricing-card, .feature-item, .point');
    animateElements.forEach(el => observer.observe(el));

    // ========================================
    // 5. CTA BUTTON INTERACTIONS
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-pricing');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show modal or redirect (customize as needed)
            if (this.textContent.includes('Berlangganan') || this.textContent.includes('Pilih')) {
                showSubscriptionModal();
            } else if (this.textContent.includes('Pelajari')) {
                // Scroll to features section
                document.querySelector('#fitur').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 6. MOBILE MENU TOGGLE
    // ========================================
    function createMobileMenu() {
        const nav = document.querySelector('nav .container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.cursor = 'pointer';
        hamburger.style.color = '#000';
        
        nav.appendChild(hamburger);
        
        // Toggle menu
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            this.innerHTML = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Show/hide hamburger based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navMenu.style.display = navMenu.classList.contains('mobile-open') ? 'flex' : 'none';
            } else {
                hamburger.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('mobile-open');
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
    
    createMobileMenu();

    // ========================================
    // 7. FORM VALIDATION (if forms exist)
    // ========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc2626';
                    input.style.backgroundColor = '#fef2f2';
                } else {
                    input.style.borderColor = '#d1d5db';
                    input.style.backgroundColor = '#ffffff';
                }
            });
            
            if (isValid) {
                showSuccessMessage('Form berhasil dikirim!');
            } else {
                showErrorMessage('Mohon lengkapi semua field yang wajib diisi.');
            }
        });
    });

    // ========================================
    // 8. UTILITY FUNCTIONS
    // ========================================
    
    // Show subscription modal
    function showSubscriptionModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        `;
        
        modalContent.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #000;">Mulai Berlangganan</h3>
            <p style="margin-bottom: 1.5rem; color: #4b5563;">Silakan hubungi kami untuk informasi lebih lanjut tentang paket berlangganan.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn-primary" onclick="window.open('https://wa.me/6281234567890', '_blank')">WhatsApp</button>
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Tutup</button>
            </div>
        `;
        
        modal.className = 'modal-overlay';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking overlay
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Show success message
    function showSuccessMessage(message) {
        showNotification(message, 'success');
    }
    
    // Show error message
    function showErrorMessage(message) {
        showNotification(message, 'error');
    }
    
    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #059669;' : 'background: #dc2626;'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ========================================
    // 9. PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Lazy load images (if any)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        // Additional scroll optimizations can go here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);

    console.log('SimpleBias Pro JavaScript loaded successfully! 🚀');
});

// ========================================
// 10. ADDITIONAL CSS FOR ANIMATIONS
// ========================================
const additionalCSS = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-top: none;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .price-option.active {
        background-color: #f0fdf4 !important;
        border-color: #059669 !important;
        transform: scale(1.02);
    }
    
    .price-option.active .price {
        color: #059669 !important;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
