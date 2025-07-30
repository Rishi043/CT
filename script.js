// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Admission Alert Popup Logic ---
    const admissionPopup = document.getElementById('admissionPopup');
    const closePopupBtn = document.querySelector('.popup-overlay .close-popup');
    const enquireBtn = document.querySelector('.popup-overlay .enquire-btn');
    const contactSection = document.getElementById('contact');

    // Function to show the popup
    const showPopup = () => {
        admissionPopup.classList.add('active');
    };

    // Function to close the popup
    const closePopup = () => {
        admissionPopup.classList.remove('active');
    };

    // Function to scroll to the contact section and close the popup
    const scrollToContact = (e) => {
        e.preventDefault(); // Prevent default button behavior (e.g., form submission if it was a submit button)
        closePopup();
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Show popup after 2 seconds on page load
    setTimeout(showPopup, 2000);

    // Event listener to close popup when close button is clicked
    closePopupBtn.addEventListener('click', closePopup);

    // Event listener to close popup when clicking outside the content area
    admissionPopup.addEventListener('click', (e) => {
        if (e.target === admissionPopup) { // Check if the click was directly on the overlay
            closePopup();
        }
    });

    // Event listener for the "Enquire Now" button in the popup
    enquireBtn.addEventListener('click', scrollToContact);


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Check if the mobile menu is open and close it
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll effect
                    block: 'start' // Align the top of the element with the top of the viewport
                });
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // If scrolled more than 100px
            header.style.background = 'rgba(255, 255, 255, 0.98)'; // More opaque background
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)'; // Add shadow
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)'; // Original background
            header.style.boxShadow = 'none'; // Remove shadow
        }
    });

    // --- Fade-in Animation on Scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Shrink the viewport bottom by 50px
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Observe all elements with the 'fade-in' class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission and page reload
            
            // Get form data (for demonstration purposes)
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form Data:', data); // Log data to console

            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
            // Example:
            /*
            fetch('/submit-form-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                alert('Thank you for your inquiry! We will contact you soon.');
                this.reset(); // Reset form fields on success
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
            });
            */
            
            // For now, just show an alert and reset the form
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset(); // Reset form
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggle 'active' class on nav menu
        mobileMenuToggle.classList.toggle('active'); // Toggle 'active' class on hamburger icon for animation
    });

    // --- Interactive Hover Effects (for cards) ---
    // These are already handled by CSS transitions, but adding JS listeners
    // allows for more complex effects if needed in the future.
    document.querySelectorAll('.course-card, .feature-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // CSS transitions handle the visual effect, no direct JS style manipulation needed here
            // this.style.transition = 'all 0.3s ease'; // Already in CSS
        });
        
        card.addEventListener('mouseleave', function() {
            // this.style.transition = 'all 0.3s ease'; // Already in CSS
        });
    });

    // --- Animate Numbers for Social Proof ---
    function animateNumbers() {
        const numbers = document.querySelectorAll('.proof-item span');
        numbers.forEach(number => {
            const text = number.textContent;
            // Only animate the '1000+ Students' item
            if (text.includes('1000+')) {
                let count = 0;
                const target = 1000;
                const increment = target / 100; // Divide by 100 steps for animation
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        number.textContent = '1000+ Students';
                        clearInterval(timer); // Stop animation when target is reached
                    } else {
                        number.textContent = Math.floor(count) + '+ Students';
                    }
                }, 20); // Update every 20ms
            }
        });
    }

    // Trigger number animation when hero section is visible using Intersection Observer
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateNumbers, 1000); // Start animation after 1 second delay
                    heroObserver.unobserve(entry.target); // Stop observing once animation is triggered
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of hero section is visible
        heroObserver.observe(heroSection);
    }

    // --- Add Sparkle Effect to Elements Randomly ---
    function addSparkles() {
        const sparkleElements = document.querySelectorAll('.course-icon, .feature-icon');
        
        sparkleElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.7) { // Randomly trigger sparkle
                    element.style.animation = 'pulse-glow 1s ease-in-out'; // Short burst animation
                    setTimeout(() => {
                        element.style.animation = 'pulse-glow 3s ease-in-out infinite'; // Resume infinite animation
                    }, 1000);
                }
            }, 3000); // Check every 3 seconds
        });
    }

    // Initialize sparkle effects after a delay
    setTimeout(addSparkles, 2000);

    // --- Add Typing Effect to Hero Text ---
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = ''; // Clear existing text
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    // Initialize typing effect after page load
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent; // Store original text
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100); // Start typing effect
        }, 1000);
    }
});
