// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Language Toggle Functionality
    let currentLang = 'en';
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('.lang-text');
    
    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'th' : 'en';
        langText.textContent = currentLang === 'en' ? 'TH' : 'EN';
        
        // Update all elements with language data attributes
        const elementsWithLang = document.querySelectorAll('[data-en][data-th]');
        elementsWithLang.forEach(element => {
            const newText = element.getAttribute(`data-${currentLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });
        
        // Save language preference
        localStorage.setItem('preferred-language', currentLang);
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage();
    }
    
    langToggle.addEventListener('click', switchLanguage);

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Form validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validatePhone(phone) {
        // Basic phone validation - accepts various formats
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    function showError(inputElement, errorMessage) {
        const errorElement = document.getElementById(inputElement.id + '-error');
        errorElement.textContent = errorMessage;
        inputElement.style.borderColor = '#e74c3c';
    }

    function clearError(inputElement) {
        const errorElement = document.getElementById(inputElement.id + '-error');
        errorElement.textContent = '';
        inputElement.style.borderColor = '#FFC933';
    }

    function clearAllErrors() {
        clearError(nameInput);
        clearError(phoneInput);
        clearError(messageInput);
    }

    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearError(this);
        } else if (validateName(this.value)) {
            clearError(this);
        } else {
            showError(this, 'Name must be at least 2 characters long');
        }
    });

    phoneInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearError(this);
        } else if (validatePhone(this.value)) {
            clearError(this);
        } else {
            showError(this, 'Please enter a valid phone number');
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearError(this);
        } else if (validateMessage(this.value)) {
            clearError(this);
        } else {
            showError(this, 'Message must be at least 10 characters long');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value;
        const phone = phoneInput.value;
        const message = messageInput.value;
        
        let isValid = true;
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate each field
        if (!validateName(name)) {
            showError(nameInput, 'Please enter your full name (at least 2 characters)');
            isValid = false;
        }
        
        if (!validatePhone(phone)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (!validateMessage(message)) {
            showError(messageInput, 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        if (isValid) {
            // Disable submit button and show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                clearAllErrors();
                
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 2000);
        } else {
            // Focus on first invalid field
            const firstInvalidField = contactForm.querySelector('input[style*="border-color: rgb(231, 76, 60)"], textarea[style*="border-color: rgb(231, 76, 60)"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-header">
                    <i class="fas fa-check-circle"></i>
                    <button class="close-btn" aria-label="Close">&times;</button>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your interest in Crispy Roti with Butter. We'll get back to you soon!</p>
                <button class="ok-btn">OK</button>
            </div>
        `;
        
        // Add styles for success message
        successMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.4s ease;
            backdrop-filter: blur(5px);
        `;
        
        const successContent = successMessage.querySelector('.success-content');
        successContent.style.cssText = `
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            max-width: 450px;
            margin: 1rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 3px solid #FF69B4;
            transform: scale(0.9);
            animation: bounceIn 0.6s ease forwards;
        `;
        
        const successHeader = successContent.querySelector('.success-header');
        successHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        `;
        
        const icon = successContent.querySelector('i');
        icon.style.cssText = `
            color: #27ae60;
            font-size: 4rem;
            display: block;
            animation: pulse 2s infinite;
        `;
        
        const closeBtn = successContent.querySelector('.close-btn');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 2rem;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;
        
        const heading = successContent.querySelector('h3');
        heading.style.cssText = `
            color: #4A1A2C;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            font-weight: bold;
        `;
        
        const paragraph = successContent.querySelector('p');
        paragraph.style.cssText = `
            color: #666666;
            line-height: 1.6;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        `;
        
        const okBtn = successContent.querySelector('.ok-btn');
        okBtn.style.cssText = `
            background: linear-gradient(135deg, #FF69B4, #FFD700);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        `;
        
        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.9); }
            }
        `;
        document.head.appendChild(style);
        
        // Add hover effects
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = '#f0f0f0';
            closeBtn.style.color = '#333';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'none';
            closeBtn.style.color = '#999';
        });
        
        okBtn.addEventListener('mouseenter', () => {
            okBtn.style.transform = 'translateY(-2px)';
            okBtn.style.boxShadow = '0 6px 20px rgba(255, 105, 180, 0.4)';
        });
        okBtn.addEventListener('mouseleave', () => {
            okBtn.style.transform = 'translateY(0)';
            okBtn.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.3)';
        });
        
        document.body.appendChild(successMessage);
        
        function closeMessage() {
            successMessage.style.animation = 'fadeOut 0.4s ease';
            setTimeout(() => {
                if (document.body.contains(successMessage)) {
                    document.body.removeChild(successMessage);
                }
                if (document.head.contains(style)) {
                    document.head.removeChild(style);
                }
            }, 400);
        }
        
        // Close button functionality
        closeBtn.addEventListener('click', closeMessage);
        okBtn.addEventListener('click', closeMessage);
        
        // Close on backdrop click
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                closeMessage();
            }
        });
        
        // Auto close after 5 seconds
        setTimeout(closeMessage, 5000);
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add scroll-based styling to navbar
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 176, 0, 0.95), rgba(255, 201, 51, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--secondary-gold))';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu-card, .about-content, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Add loading state to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Let the smooth scroll happen first
            setTimeout(() => {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px)';
                }, 150);
            }, 100);
        });
    }

    // Add parallax effect to hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add hover effects to menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utility function to debounce scroll events
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

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(function() {
    // Any heavy scroll-based calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);
