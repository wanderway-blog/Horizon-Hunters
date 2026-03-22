// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introDuration = 2300;
const isHomePage = document.body.classList.contains('home-intro-active');
const pageRevealDelay = isHomePage ? (prefersReducedMotion ? 0 : introDuration) : 380;

function revealPage() {
    document.body.classList.add('page-loaded');
}

function createArrivalIntro() {
    if (prefersReducedMotion || !isHomePage || document.querySelector('.arrival-intro')) {
        return;
    }

    const intro = document.createElement('div');
    intro.className = 'arrival-intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = `
        <div class="arrival-intro__panel arrival-intro__panel--left"></div>
        <div class="arrival-intro__panel arrival-intro__panel--right"></div>
        <div class="arrival-intro__content">
            <div class="arrival-intro__brand">
                <img src="icons8-airplane-take-off-100.png" alt="" class="arrival-intro__icon">
                <span>Wander</span>Way
            </div>
            <p class="arrival-intro__subtitle">Arrival Experience</p>
        </div>
    `;

    document.body.prepend(intro);
    document.body.classList.add('intro-playing');

    window.setTimeout(() => {
        intro.classList.add('is-exiting');
    }, 1350);

    window.setTimeout(() => {
        document.body.classList.remove('intro-playing');
        intro.remove();
    }, introDuration);
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) {
        hamburger.classList.remove('active');
    }

    if (navMenu) {
        navMenu.classList.remove('active');
    }
}));

createArrivalIntro();

window.addEventListener('load', () => {
    window.setTimeout(revealPage, pageRevealDelay);
});

window.setTimeout(revealPage, pageRevealDelay);

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

if (carouselTrack) {
    const cardWidth = 350;
    let currentPosition = 0;

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            currentPosition = Math.min(currentPosition + cardWidth, maxScroll);
            carouselTrack.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
            updateDots();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - cardWidth, 0);
            carouselTrack.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
            updateDots();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPosition = index * cardWidth * 3;
            carouselTrack.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
            updateDots();
        });
    });

    function updateDots() {
        const scrollPosition = carouselTrack.scrollLeft;
        const cardIndex = Math.round(scrollPosition / (cardWidth * 3));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === cardIndex);
        });
    }

    carouselTrack.addEventListener('scroll', updateDots);
}

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        alert('Thank you for subscribing! We will send travel tips to: ' + email);
        form.querySelector('input').value = '';
    });
});

// Contact Form
const contactForms = document.querySelectorAll('.contact-form form');
contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const action = form.getAttribute('action') || '';
        const isExternalSubmit = /^https?:\/\//i.test(action);

        if (!isExternalSubmit) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('submitted') === 'true') {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        const successMessage = document.createElement('p');
        successMessage.className = 'form-success-message';
        successMessage.textContent = 'Thank you. Your message was sent successfully.';
        contactForm.prepend(successMessage);
        contactForm.reset();
    }

    const cleanUrl = `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, document.title, cleanUrl);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    }
});

if (navbar) {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
}

// Elegant reveal animations
const revealGroups = [
    '.section-header',
    '.page-subnav',
    '.grid .card',
    '.newsletter-content',
    '.destination-card',
    '.blog-card',
    '.gallery-item',
    '.feature-list li',
    '.topic-grid > *',
    '.story-panel',
    '.story-sidebar',
    '.about-image',
    '.about-content',
    '.about-image-col',
    '.about-text-col',
    '.contact-wrapper',
    '.contact-container'
];

const revealElements = [...new Set(
    revealGroups.flatMap(selector => Array.from(document.querySelectorAll(selector)))
)];

revealElements.forEach((element, index) => {
    element.classList.add('reveal');

    if (
        element.classList.contains('card') ||
        element.classList.contains('destination-card') ||
        element.classList.contains('blog-card') ||
        element.classList.contains('gallery-item')
    ) {
        element.classList.add('reveal-lift');
    }

    const groupParent = element.parentElement;
    const siblingIndex = groupParent ? Array.from(groupParent.children).indexOf(element) : index;
    element.style.setProperty('--reveal-delay', `${Math.max(0, siblingIndex) * 90}ms`);
});

if (prefersReducedMotion) {
    revealElements.forEach(element => element.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('is-visible'));
}

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
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
