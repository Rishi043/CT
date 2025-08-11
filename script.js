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

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    if (admissionPopup) {
        admissionPopup.addEventListener('click', (e) => {
            if (e.target === admissionPopup) {
                closePopup();
            }
        });
    }

    if (enquireBtn) {
        enquireBtn.addEventListener('click', scrollToContact);
    }

    // --- Board Achievers Modal Logic ---
    const achieverCards = document.querySelectorAll(".achiever-card");
    const modal = document.getElementById("achieverModal");
    const modalName = document.getElementById("modalName");
    const modalClass = document.getElementById("modalClass");
    const modalMarks = document.getElementById("modalMarks");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-btn");

    // Function to open modal
    const openModal = (card) => {
        if (modal && modalName && modalClass && modalMarks && modalImage) {
            modal.style.display = "flex";
            modalName.textContent = card.getAttribute("data-name") || "Student Name";
            modalClass.textContent = card.getAttribute("data-class") || "Class";
            modalMarks.textContent = "Marks: " + (card.getAttribute("data-marks") || "N/A");
            
            const cardImage = card.querySelector("img");
            if (cardImage) {
                modalImage.src = cardImage.src;
                modalImage.alt = cardImage.alt || "Student Photo";
            }
        }
    };

    // Function to close modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Add click event to each achiever card
    achieverCards.forEach(card => {
        card.addEventListener("click", () => {
            console.log("Card clicked:", card.getAttribute("data-name")); // Debug log
            openModal(card);
        });
        
        // Add cursor pointer style for better UX
        card.style.cursor = "pointer";
    });

    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.style.display === "flex") {
            closeModal();
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
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
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

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

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // --- Mobile Dropdown Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    if (mobileMenuButton && mobileDropdown) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            mobileDropdown.classList.toggle('active');

            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileDropdown.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        const mobileMenuLinks = mobileDropdown.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileDropdown.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileDropdown.contains(e.target)) {
                mobileDropdown.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // --- Interactive Hover Effects ---
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

    // --- Add Sparkle Effect ---
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

    // Debug: Check if elements exist
    console.log('Achiever cards found:', achieverCards.length);
    console.log('Modal element:', modal);
    console.log('Close button:', closeBtn);

});