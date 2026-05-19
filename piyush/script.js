// ===========================
// SCROLL TO TOP FUNCTIONALITY
// ===========================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// SMOOTH SCROLL TO SECTION
// ===========================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

const navbar = document.querySelector('.header-nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// ACTIVE NAV LINK
// ===========================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// COUNTER ANIMATION
// ===========================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const speed = 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, speed);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const achievementSection = document.querySelector('.achievements-section');
if (achievementSection) {
    observer.observe(achievementSection);
}

// ===========================
// FORM SUBMISSION
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            showNotification('Message sent successfully!', 'success');

            // Reset form
            contactForm.reset();

            // Log form data (in production, you would send this to a server)
            console.log({
                name,
                email,
                subject,
                message,
                timestamp: new Date()
            });
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not already in CSS
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 10px;
                font-weight: 600;
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }

            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }

            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }

            .notification-info {
                background: linear-gradient(135deg, #1e40af, #1e3a8a);
                color: white;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .notification.remove {
                animation: slideOutRight 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.classList.add('remove');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.getAttribute('data-animation');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe elements that should animate on scroll
document.querySelectorAll('.service-card, .why-choose-card, .achievement-card').forEach(el => {
    animationObserver.observe(el);
});

// ===========================
// NEWSLETTER SUBSCRIPTION
// ===========================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Thank you for subscribing!', 'success');
            form.reset();
        } else {
            showNotification('Please enter a valid email', 'error');
        }
    });
});

// ===========================
// SERVICE CARD CLICK HANDLERS
// ===========================

const serviceButtons = document.querySelectorAll('.service-btn');

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.closest('.service-card').querySelector('h4').textContent;
        showNotification(`Interested in ${service}? Contact us for more details!`, 'info');
    });
});

// ===========================
// NAVBAR COLLAPSE ON LINK CLICK
// ===========================

const navbarCollapse = document.querySelector('.navbar-collapse');
const navItems = document.querySelectorAll('.nav-link');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();
    });
});

// ===========================
// LAZY LOAD IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// PARALLAX EFFECT (Optional)
// ===========================

function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const scrollPos = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const distance = scrollPos - elementOffset;
        const speed = 0.5;

        if (distance < 500 && distance > -500) {
            element.style.transform = `translateY(${distance * speed}px)`;
        }
    });
}

window.addEventListener('scroll', parallaxEffect);

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// Trigger animation
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// ===========================
// RESPONSIVE MOBILE MENU
// ===========================

const hamburgerMenu = document.querySelector('.navbar-toggler');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function () {
        this.classList.toggle('active');
    });
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// DYNAMIC HOVER EFFECTS
// ===========================

const interactiveElements = document.querySelectorAll('.service-card, .why-choose-card, .about-features .feature-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// RESIZE HANDLER
// ===========================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize events
        console.log('Window resized');
    }, 250);
});

// ===========================
// ACCESSIBILITY IMPROVEMENTS
// ===========================

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        document.querySelectorAll('.notification').forEach(notif => {
            notif.remove();
        });
    }

    // Scroll to top with home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to bottom with end key
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce function for scroll events
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

// Apply debouncing to scroll events if needed
const debouncedScroll = debounce(() => {
    // Handle scroll logic here
}, 100);

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website initialized successfully');

    // Initialize Bootstrap components
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
    });
});

// ===========================
// CUSTOM ERROR HANDLING
// ===========================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // You can send error logs to a server here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});

// ===========================
// ANALYTICS & TRACKING
// ===========================

// Track section views
function trackSectionView(sectionId) {
    console.log(`Viewed section: ${sectionId}`);
    // Send to analytics service here
}

// Track button clicks
const buttons = document.querySelectorAll('button, a[href^="#"]');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('href') || button.getAttribute('data-target');
        if (target) {
            trackSectionView(target);
        }
    });
});

// ===========================
// COOKIE CONSENT (Optional)
// ===========================

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Show cookie banner
        console.log('Cookie consent not given');
        // You can implement a cookie banner here
    }
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCookieConsent);
} else {
    checkCookieConsent();
}

// ===========================
// DYNAMIC SCROLL PROGRESS
// ===========================

const createScrollProgress = () => {
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #1e40af, #7c3aed, #f97316);
        width: 0%;
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===========================
// CONSOLE LOG
// ===========================

console.log('%c Business Solutions Website', 'font-size: 24px; color: #1e40af; font-weight: bold;');
console.log('%c Loaded successfully! 🚀', 'font-size: 14px; color: #7c3aed;');
