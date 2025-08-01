
        // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        // Header scroll effect
        function handleHeaderScroll() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Mobile menu toggle
        function setupMobileMenu() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }

        // Carousel functionality
        class Carousel {
            constructor(carouselId, dotsId, autoPlay = true) {
                this.carousel = document.getElementById(carouselId);
                this.slides = this.carousel.querySelectorAll('.carousel-slide');
                this.dotsContainer = document.getElementById(dotsId);
                this.currentSlide = 0;
                this.autoPlay = autoPlay;
                this.autoPlayInterval = null;
                
                this.init();
            }
            
            init() {
                this.createDots();
                this.updateCarousel();
                if (this.autoPlay) {
                    this.startAutoPlay();
                }
                
                // Pause auto-play on hover
                this.carousel.parentElement.addEventListener('mouseenter', () => {
                    this.stopAutoPlay();
                });
                
                this.carousel.parentElement.addEventListener('mouseleave', () => {
                    if (this.autoPlay) {
                        this.startAutoPlay();
                    }
                });
            }
            
            createDots() {
                if (!this.dotsContainer) return;
                
                this.dotsContainer.innerHTML = '';
                for (let i = 0; i < this.slides.length; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }
            
            updateCarousel() {
                const translateX = -this.currentSlide * 100;
                this.carousel.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                if (this.dotsContainer) {
                    const dots = this.dotsContainer.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === this.currentSlide);
                    });
                }
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.updateCarousel();
            }
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.updateCarousel();
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.updateCarousel();
            }
            
            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000);
            }
            
            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }
        }

        // Global carousel instances
        let carousels = {};

        // Carousel navigation functions (called by buttons)
        function nextSlide(carouselId) {
            if (carousels[carouselId]) {
                carousels[carouselId].nextSlide();
            }
        }

        function prevSlide(carouselId) {
            if (carousels[carouselId]) {
                carousels[carouselId].prevSlide();
            }
        }

        // Form handling
        function setupContactForm() {
            const form = document.querySelector('.contact-form form');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                // Simulate form submission
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }

        // Smooth scrolling for navigation links
        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Setup scroll animations
            animateOnScroll();
            window.addEventListener('scroll', animateOnScroll);
            window.addEventListener('scroll', handleHeaderScroll);
            
            // Setup mobile menu
            setupMobileMenu();
            
            // Initialize carousels
            carousels.servicesCarousel = new Carousel('servicesCarousel', 'servicesDots', true);
            carousels.workCarousel = new Carousel('workCarousel', 'workDots', true);
            carousels.testimonialsCarousel = new Carousel('testimonialsCarousel', 'testimonialsDots', true);
            
            // Setup contact form
            setupContactForm();
            
            // Setup smooth scrolling
            setupSmoothScrolling();
            
            // Add loading animation
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Add parallax effect to hero section
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });

            // Add hover effects to feature cards
            document.querySelectorAll('.feature-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click animation to CTA buttons
            document.querySelectorAll('.cta-button').forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.4);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });

            // Add CSS animation for ripple effect
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        });

        // Add intersection observer for better performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all animation elements
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                observer.observe(el);
            });
        }
