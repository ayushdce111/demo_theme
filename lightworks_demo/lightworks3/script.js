// ====================================
// Initialize AOS (Animate On Scroll)
// ====================================

document.addEventListener('DOMContentLoaded', function () {
    const AOS = window.AOS; // Declare AOS variable
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
    });
});

// ====================================
// Dark Mode Toggle
// ====================================

$(document).ready(function () {
    const themeToggle = $('#themeToggle');
    const htmlElement = $('html')[0];
    const body = $('body');

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Toggle theme on button click
    themeToggle.on('click', function () {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');

        if (currentTheme === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        body.addClass('dark-mode');
        themeToggle.html('<i class="fas fa-sun"></i> Light');
        localStorage.setItem('theme', 'dark');

        // Update favicon if needed
        updateThemeColors();
    }

    function disableDarkMode() {
        htmlElement.setAttribute('data-bs-theme', 'light');
        body.removeClass('dark-mode');
        themeToggle.html('<i class="fas fa-moon"></i> Dark');
        localStorage.setItem('theme', 'light');

        // Update favicon if needed
        updateThemeColors();
    }

    function updateThemeColors() {
        const metaThemeColor = $('meta[name="theme-color"]');
        const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';

        if (metaThemeColor.length) {
            metaThemeColor.attr('content', isDark ? '#1e1e1e' : '#ffffff');
        }
    }
});

// ====================================
// Smooth Scrolling Navigation
// ====================================

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = $(this).attr('href');
        const $target = $(target);

        if ($target.length) {
            $('html, body').stop().animate(
                {
                    scrollTop: $target.offset().top - 80,
                },
                800
            );
        }
    });

    // Close navbar on link click (mobile)
    $('.navbar-collapse a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
});

// ====================================
// Navbar Background on Scroll
// ====================================

$(window).on('scroll', function () {
    const navbar = $('.navbar');
    if ($(this).scrollTop() > 50) {
        navbar.addClass('scrolled');
        navbar.css({
            'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)',
        });
    } else {
        navbar.removeClass('scrolled');
        navbar.css({
            'box-shadow': 'none',
        });
    }
});

// ====================================
// Counter Animation for Statistics
// ====================================

$(document).ready(function () {
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;

        $('.stat-number').each(function () {
            const $this = $(this);
            const targetNumber = parseInt($this.text());

            if (!isNaN(targetNumber)) {
                $({ count: 0 }).animate(
                    { count: targetNumber },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.count) + '%');
                        },
                        complete: function () {
                            $this.text(targetNumber + '%');
                        },
                    }
                );
            }
        });

        hasAnimated = true;
    }

    // Trigger animation when stats section comes into view
    $(window).on('scroll', function () {
        const statsSection = $('#stats');
        if (
            statsSection.length &&
            statsSection.offset().top - $(window).scrollTop() < $(window).height()
        ) {
            animateCounters();
        }
    });

    // Trigger on initial load if already in view
    if (
        $('#stats').length &&
        $('#stats').offset().top < $(window).scrollTop() + $(window).height()
    ) {
        animateCounters();
    }
});

// ====================================
// Form Submission Handler
// ====================================

$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();

        const email = $(this).find('input[type="email"]').val();

        if (email) {
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(email)) {
                // Show success message
                const btn = $(this).find('button[type="submit"]');
                const originalText = btn.text();

                btn.text('Subscribed! ✓')
                    .prop('disabled', true)
                    .css('background-color', 'rgba(255, 255, 255, 0.3)');

                $(this).find('input[type="email"]').val('');

                // Reset after 3 seconds
                setTimeout(function () {
                    btn.text(originalText).prop('disabled', false).css('background-color', '');
                }, 3000);

                console.log('[v0] Email subscribed:', email);
            } else {
                alert('Please enter a valid email address.');
            }
        } else {
            alert('Please enter your email address.');
        }
    });
});

// ====================================
// Scroll to Top Button
// ====================================

$(document).ready(function () {
    // Create scroll-to-top button
    const scrollTopBtn = $('<button>')
        .attr('id', 'scrollTopBtn')
        .html('<i class="fas fa-arrow-up"></i>')
        .css({
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '45px',
            height: '45px',
            'background-color': '#4CAF50',
            color: 'white',
            border: 'none',
            'border-radius': '50%',
            cursor: 'pointer',
            display: 'none',
            'z-index': '999',
            'font-size': '18px',
            transition: 'all 0.3s ease',
            'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
        });

    $('body').append(scrollTopBtn);

    // Show/hide button on scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            scrollTopBtn.fadeIn();
        } else {
            scrollTopBtn.fadeOut();
        }
    });

    // Scroll to top on click
    scrollTopBtn.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Hover effects
    scrollTopBtn.on('mouseenter', function () {
        $(this).css({
            'background-color': '#45a049',
            transform: 'scale(1.1)',
        });
    });

    scrollTopBtn.on('mouseleave', function () {
        $(this).css({
            'background-color': '#4CAF50',
            transform: 'scale(1)',
        });
    });

    // Dark mode support for scroll button
    const updateScrollBtnTheme = function () {
        const isDark = $('html')[0].getAttribute('data-bs-theme') === 'dark';
        scrollTopBtn.css({
            'box-shadow': isDark
                ? '0 4px 8px rgba(255, 255, 255, 0.1)'
                : '0 4px 8px rgba(0, 0, 0, 0.2)',
        });
    };

    updateScrollBtnTheme();

    // Update theme on toggle
    $('#themeToggle').on('click', function () {
        setTimeout(updateScrollBtnTheme, 100);
    });
});

// ====================================
// Lazy Loading Images
// ====================================

$(document).ready(function () {
    // Add lazy loading to images
    $('img').each(function () {
        if (!$(this).attr('loading')) {
            $(this).attr('loading', 'lazy');
        }
    });
});

// ====================================
// Active Link Highlighting
// ====================================

$(document).ready(function () {
    const updateActiveLink = function () {
        const scrollPos = $(window).scrollTop() + 100;

        $('a[href^="#"]').removeClass('active');

        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).height();
            const sectionId = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    };

    $(window).on('scroll', updateActiveLink);
});

// ====================================
// Button Ripple Effect
// ====================================

$(document).ready(function () {
    $(document).on('click', '.btn', function (e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;

        // Create ripple element
        const ripple = $('<span>')
            .css({
                position: 'absolute',
                left: x,
                top: y,
                width: '0',
                height: '0',
                'border-radius': '50%',
                'background-color': 'rgba(255, 255, 255, 0.6)',
                transform: 'translate(-50%, -50%)',
                'pointer-events': 'none',
            })
            .appendTo($(this));

        // Animate ripple
        ripple.animate(
            {
                width: '200px',
                height: '200px',
                opacity: 0,
            },
            600,
            function () {
                ripple.remove();
            }
        );
    });
});

// ====================================
// Tooltip and Popover Initialization
// ====================================

$(document).ready(function () {
    const bootstrap = window.bootstrap; // Declare bootstrap variable

    // Initialize Bootstrap tooltips
    $('[data-bs-toggle="tooltip"]').each(function () {
        new bootstrap.Tooltip(this);
    });

    // Initialize Bootstrap popovers
    $('[data-bs-toggle="popover"]').each(function () {
        new bootstrap.Popover(this);
    });
});

// ====================================
// Parallax Scroll Effect (Optional)
// ====================================

$(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();

    // Apply parallax to hero section
    $('.hero-section').css({
        'background-position': '0 ' + scrollPos * 0.5 + 'px',
    });
});

// ====================================
// Mobile Menu Close on Outside Click
// ====================================

$(document).on('click', function (e) {
    const navbar = $('.navbar-collapse');
    const toggle = $('.navbar-toggler');

    if (!navbar.has(e.target).length && !toggle.has(e.target).length) {
        navbar.collapse('hide');
    }
});

// ====================================
// Console Logging for Debugging
// ====================================

console.log('[v0] LightWorks Website loaded successfully!');
console.log('[v0] Dark mode toggle available');
console.log('[v0] AOS animations initialized');
console.log('[v0] Responsive design active');
