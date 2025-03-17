document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);

    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('loaded');
            // Start animations after page load
            initAnimations();
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    const spans = mobileMenu.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Call animation check on scroll
        checkAnimations();
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form Validation and Submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Shake animation for error fields
                    input.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(0)' }
                    ], {
                        duration: 500,
                        easing: 'ease-in-out'
                    });
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                const originalIcon = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
                
                // Simulate form submission
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
                    submitBtn.classList.add('success');
                    
                    // Reset button after some time
                    setTimeout(() => {
                        submitBtn.innerHTML = originalIcon;
                        submitBtn.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });
        
        // Add input event listeners to remove error class when typing
        appointmentForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // Initialize animations
    function initAnimations() {
        // Add animation classes
        document.querySelectorAll('.expertise-card').forEach(card => {
            card.classList.add('fade-in');
        });
        
        // Text reveal animations for hero section
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            let html = '';
            
            for (let i = 0; i < text.length; i++) {
                html += `<span>${text[i]}</span>`;
            }
            
            heroTitle.innerHTML = html;
            heroTitle.classList.add('text-reveal');
            
            setTimeout(() => {
                heroTitle.classList.add('active');
            }, 500);
        }
        
        // Check animations on initial load
        checkAnimations();
    }

    // Check which elements are in viewport to animate
    function checkAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in, .reveal-section');
        
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('appear');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image gallery with lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                // Create image container
                const imgContainer = document.createElement('div');
                imgContainer.className = 'lightbox-content';
                
                // Create close button
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                // Create image element
                const img = document.createElement('img');
                img.src = this.src;
                
                // Append elements
                imgContainer.appendChild(img);
                lightbox.appendChild(closeBtn);
                lightbox.appendChild(imgContainer);
                document.body.appendChild(lightbox);
                
                // Add animation class
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                
                // Close lightbox on click
                lightbox.addEventListener('click', function() {
                    this.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(this);
                    }, 300);
                });
            });
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Floating animation for selected elements
    document.querySelectorAll('.highlight').forEach(element => {
        element.classList.add('float');
    });

    // Add pulse animation to CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('pulse');
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Change icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            });
        });
    }

    // Initialize animations on first load
    checkAnimations();
});
