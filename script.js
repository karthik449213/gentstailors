// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Updated menu toggle functionality for mobile responsiveness
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Book Service button scrolls to contact section
    const bookServiceBtn = document.getElementById('book-service-btn');
    if (bookServiceBtn) {
        bookServiceBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonial carousel functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentTestimonialSlide = 0;
    
    // Function to show a specific testimonial slide
    function showTestimonialSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        testimonialSlides[index].classList.add('active');
    }
    
    // Previous testimonial button click event
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', function() {
            currentTestimonialSlide--;
            if (currentTestimonialSlide < 0) {
                currentTestimonialSlide = testimonialSlides.length - 1;
            }
            showTestimonialSlide(currentTestimonialSlide);
        });
    }
    
    // Next testimonial button click event
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            currentTestimonialSlide++;
            if (currentTestimonialSlide >= testimonialSlides.length) {
                currentTestimonialSlide = 0;
            }
            showTestimonialSlide(currentTestimonialSlide);
        });
    }
    
    // Gallery carousel functionality
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevGalleryBtn = document.querySelector('.prev-gallery');
    const nextGalleryBtn = document.querySelector('.next-gallery');
    let currentGallerySlide = 0;
    
    // Function to show a specific gallery slide
    function showGallerySlide(index) {
        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        gallerySlides[index].classList.add('active');
    }
    
    // Previous gallery button click event
    if (prevGalleryBtn) {
        prevGalleryBtn.addEventListener('click', function() {
            currentGallerySlide--;
            if (currentGallerySlide < 0) {
                currentGallerySlide = gallerySlides.length - 1;
            }
            showGallerySlide(currentGallerySlide);
        });
    }
    
    // Next gallery button click event
    if (nextGalleryBtn) {
        nextGalleryBtn.addEventListener('click', function() {
            currentGallerySlide++;
            if (currentGallerySlide >= gallerySlides.length) {
                currentGallerySlide = 0;
            }
            showGallerySlide(currentGallerySlide);
        });
    }
    
    // Sticky navigation effect on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Auto-rotate testimonials and gallery slides
    setInterval(function() {
        currentTestimonialSlide++;
        if (currentTestimonialSlide >= testimonialSlides.length) {
            currentTestimonialSlide = 0;
        }
        showTestimonialSlide(currentTestimonialSlide);
    }, 8000); // Change testimonial every 8 seconds
    
    setInterval(function() {
        currentGallerySlide++;
        if (currentGallerySlide >= gallerySlides.length) {
            currentGallerySlide = 0;
        }
        showGallerySlide(currentGallerySlide);
    }, 5000); // Change gallery image every 5 seconds
});