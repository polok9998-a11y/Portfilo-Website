// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Contact form handling (Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                submitBtn.textContent = 'Message Sent!';
                setTimeout(function () { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            submitBtn.textContent = 'Error - Try Again';
            setTimeout(function () { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000);
        }
    });
}

// Typing Animation
(function () {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const texts = [
        "Hi !",
        "I'm Polok Chandra Sarker",
        "As a CSE Student",
        "Sylhet Engineering College",
        "I'm a Web Devoleper"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    function type() {
        const currentText = texts[textIndex];

        if (isPaused) return;

        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isPaused = true;
                setTimeout(function () {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, pauseDuration);
                return;
            }

            setTimeout(type, typingSpeed);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 400);
                return;
            }

            setTimeout(type, deletingSpeed);
        }
    }

    setTimeout(type, 500);
})();
