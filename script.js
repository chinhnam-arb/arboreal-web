/**
 * Arboreal Landing Page - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(1px, -1px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            }
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            });
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.step, .commitment-card, .about-vision').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Stagger animation for steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Stagger animation for commitment cards
    document.querySelectorAll('.commitment-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(26, 58, 47, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero gradient (subtle)
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Interactive example animation
    const exampleItems = document.querySelectorAll('.example-item');
    exampleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    
    const exampleBox = document.querySelector('.example-box');
    if (exampleBox) {
        const exampleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    exampleItems.forEach(item => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    });
                    exampleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        exampleObserver.observe(exampleBox);
    }
    
    // Counter animation for stats (if we add real numbers later)
    const animateValue = (element, start, end, duration) => {
        const startTimestamp = performance.now();
        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            element.textContent = Math.floor(easeOutQuad * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Add hover effect to tree leaves
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach(leaf => {
        leaf.style.transition = 'transform 0.3s ease';
        leaf.addEventListener('mouseenter', () => {
            leaf.style.transform = 'scale(1.2)';
        });
        leaf.addEventListener('mouseleave', () => {
            leaf.style.transform = 'scale(1)';
        });
    });
    
    console.log('🌳 Arboreal - Making giving effortless');
});


