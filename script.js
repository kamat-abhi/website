// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
    // Start automatic slider
    startSlider();
    
    // Add click events to slider dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });
    
    // Slider functions
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function goToSlide(slideIndex) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }

    // Scroll Animations
    // Hide elements initially
    const fadeElements = document.querySelectorAll('.card, .process-step, .highlight-image, .highlight-text, .h-stat');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Show elements when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Animate stats counter if present
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the target number from the content
                    const target = entry.target.textContent;
                    // Reset to zero
                    entry.target.textContent = '0';
                    // Increment to target
                    let count = 0;
                    const updateCount = () => {
                        // Handle special cases like '300+' or '0-100'
                        if (target.includes('+') || target.includes('-')) {
                            entry.target.textContent = target;
                            return;
                        }
                        const increment = target / 20;
                        count += increment;
                        if (count < target) {
                            entry.target.textContent = Math.ceil(count);
                            setTimeout(updateCount, 50);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    updateCount();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 1 });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

