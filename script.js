// White Rose Beauty Parlour - JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initMobileNavigation();
    initGallery();
    initParticleEffects();
    initSmoothScrolling();

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 40px rgba(255, 105, 180, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 30px rgba(255, 105, 180, 0.1)';
        });
    });

    // Initialize Rose Petal Animation
    initRosePetals();

    // Contact Item Click Functionality
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const icon = item.querySelector('.contact-icon i');

            if (icon.classList.contains('fa-phone')) {
                const phoneNumber = item.querySelector('p').textContent.trim();
                if (phoneNumber && confirm(`Call ${phoneNumber}?`)) {
                    window.location.href = `tel:${phoneNumber}`;
                }
            } else if (icon.classList.contains('fa-instagram')) {
                const instagramHandle = item.querySelector('p').textContent.replace('@', '');
                window.open(`https://instagram.com/${instagramHandle}`, '_blank');
            }
        });

        // Add cursor pointer for clickable items
        const phoneIcon = item.querySelector('.contact-icon i.fa-phone');
        const instagramIcon = item.querySelector('.contact-icon i.fa-instagram');

        if (phoneIcon || instagramIcon) {
            item.style.cursor = 'pointer';
        }
    });
});

// Rose Petal Animation System
function initRosePetals() {
    console.log('Initializing rose petals...');
    const petalContainer = document.getElementById('falling-petals');
    if (!petalContainer) {
        console.log('Petal container not found!');
        return;
    }

    console.log('Petal container found, starting animation...');
    let petalCount = 0;
    const maxPetals = 5; // Start with fewer for testing

    function createPetal() {
        if (petalCount >= maxPetals) return;

        const petal = document.createElement('div');
        petal.className = 'rose-petal';

        // Random horizontal position
        const startX = Math.random() * window.innerWidth;

        petal.style.cssText = `
            left: ${startX}px;
            animation-delay: 0s;
            transform: scale(1);
            z-index: 9999;
            background: red;
        `;

        petalContainer.appendChild(petal);
        console.log('Created petal at position:', startX);
        petalCount++;

        // Remove after 3 seconds for testing
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
                petalCount--;
                console.log('Removed petal');
            }
        }, 3000);
    }

    // Create first petal immediately for testing
    setTimeout(createPetal, 1000);

    // Create more petals
    setInterval(() => {
        if (petalCount < maxPetals) {
            createPetal();
        }
    }, 2000);
}
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Gallery Functionality
function initGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.gallery-btn-prev');
    const nextBtn = document.querySelector('.gallery-btn-next');
    
    if (!galleryTrack || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const items = document.querySelectorAll('.gallery-item');
    const itemWidth = 320; // 300px width + 20px gap
    const visibleItems = Math.floor(galleryTrack.parentElement.offsetWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);

    function updateGallery() {
        const offset = currentIndex * itemWidth;
        galleryTrack.scrollLeft = offset;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateGallery();
    });

    // Auto-scroll gallery
    setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateGallery();
    }, 4000);

    // Update on window resize
    window.addEventListener('resize', () => {
        const newVisibleItems = Math.floor(galleryTrack.parentElement.offsetWidth / itemWidth);
        const newMaxIndex = Math.max(0, items.length - newVisibleItems);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
            updateGallery();
        }
    });
}

// Enhanced Particle Effects
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 105, 180, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            pointer-events: none;
            animation: particleFloat ${animationDuration}s ease-in-out ${animationDelay}s infinite;
        `;
        
        hero.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (animationDuration + animationDelay) * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Add particle animation CSS if not already added
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0px) translateX(0px) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(-20px) translateX(10px) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(-100px) translateX(-10px) scale(1);
                }
                100% {
                    transform: translateY(-120px) translateX(20px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Section Function (for Discover More button)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(255, 105, 180, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(255, 105, 180, 0.05)';
        }
    }
});


// Loading Animation
window.addEventListener('load', () => {
    // Add a subtle loading animation
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    // Add any scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Preload images for better performance
function preloadImages() {
    // Since we're using icons, this is mainly for future image additions
    const images = [];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();
