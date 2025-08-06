// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Admission Alert Popup Logic ---
    const admissionPopup = document.getElementById('admissionPopup');
    const closePopupBtn = document.querySelector('.popup-overlay .close-popup');
    const enquireBtn = document.querySelector('.popup-overlay .enquire-btn');
    const contactSection = document.getElementById('contact');

    const showPopup = () => {
        admissionPopup.classList.add('active');
    };

    const closePopup = () => {
        admissionPopup.classList.remove('active');
    };

    const scrollToContact = (e) => {
        e.preventDefault();
        closePopup();
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    setTimeout(showPopup, 2000);

    closePopupBtn.addEventListener('click', closePopup);

    admissionPopup.addEventListener('click', (e) => {
        if (e.target === admissionPopup) {
            closePopup();
        }
    });

    enquireBtn.addEventListener('click', scrollToContact);

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Fade-in Animation on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form Data:', data);
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset();
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // --- Mobile Dropdown Toggle (New Added Part) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    if (mobileMenuButton && mobileDropdown) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            mobileDropdown.classList.toggle('active');

            const icon = mobileMenuButton.querySelector('i');
            if (mobileDropdown.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        const mobileMenuLinks = mobileDropdown.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileDropdown.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileDropdown.contains(e.target)) {
                mobileDropdown.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }

    // --- Interactive Hover Effects (for cards) ---
    document.querySelectorAll('.course-card, .feature-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Placeholder for advanced hover effects if needed
        });
        card.addEventListener('mouseleave', function() {
            // Placeholder for advanced hover effects if needed
        });
    });

    // --- Animate Numbers for Social Proof ---
    function animateNumbers() {
        const numbers = document.querySelectorAll('.proof-item span');
        numbers.forEach(number => {
            const text = number.textContent;
            if (text.includes('1000+')) {
                let count = 0;
                const target = 1000;
                const increment = target / 100;

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        number.textContent = '1000+ Students';
                        clearInterval(timer);
                    } else {
                        number.textContent = Math.floor(count) + '+ Students';
                    }
                }, 20);
            }
        });
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateNumbers, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        heroObserver.observe(heroSection);
    }

    // --- Add Sparkle Effect to Elements Randomly ---
    function addSparkles() {
        const sparkleElements = document.querySelectorAll('.course-icon, .feature-icon');
        
        sparkleElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.7) {
                    element.style.animation = 'pulse-glow 1s ease-in-out';
                    setTimeout(() => {
                        element.style.animation = 'pulse-glow 3s ease-in-out infinite';
                    }, 1000);
                }
            }, 3000);
        });
    }

    setTimeout(addSparkles, 2000);

    // --- Typing Effect in Hero Section ---
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }

});
