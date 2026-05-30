emailjs.init('cqH8PJ6TPI7rw_QP5');

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        if (Math.random() > 0.5) {
            particle.style.setProperty('--particle-color', '#00B2FF');
            particle.style.background = '#00B2FF';
        }
        particlesContainer.appendChild(particle);
    }
}

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function updateActiveNav() {
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => item.classList.remove('active'));

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentNav = document.querySelector(`.nav-link[href="${currentPath}"]`);
    if (currentNav) currentNav.classList.add('active');
}

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/property-consultancy/' || window.location.pathname === '/property-consultancy') {
        updateActiveNav();
    }
});

updateActiveNav();

const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        btn.textContent = 'Sending...';
        emailjs.sendForm('Portifoliowb', 'template_d95m32q', this)
            .then(() => {
                alert('Thank you! We\'ll get back to you soon.');
                this.reset();
                btn.textContent = 'Send Message';
            }, () => {
                alert('Failed to send. Please try again.');
                btn.textContent = 'Send Message';
            });
    });
}

const scheduleForm = document.getElementById('scheduleForm');
if (scheduleForm) {
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        btn.textContent = 'Sending...';
        emailjs.sendForm('Portifoliowb', 'template_d95m32q', this)
            .then(() => {
                alert('Thank you! Our team will contact you shortly to schedule your meeting.');
                this.reset();
                btn.textContent = 'Submit';
            }, () => {
                alert('Failed to send. Please try again.');
                btn.textContent = 'Submit';
            });
    });
}

document.querySelectorAll('.footer-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        btn.textContent = 'Sending...';
        emailjs.sendForm('Portifoliowb', 'template_d95m32q', this)
            .then(() => {
                alert('Thank you! We\'ll get back to you soon.');
                this.reset();
                btn.textContent = 'Send Message';
            }, () => {
                alert('Failed to send. Please try again.');
                btn.textContent = 'Send Message';
            });
    });
});

createParticles();

const textSets = document.querySelectorAll('.text-set');
if (textSets.length > 0) {
    let currentIndex = 0;
    let isAnimating = false;

    function wrapTextInSpans(element) {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char, i) => 
            `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    function animateTextIn(textSet) {
        const glitchText = textSet.querySelector('.glitch-text');
        const subtitle = textSet.querySelector('.subtitle');
        if (glitchText) {
            wrapTextInSpans(glitchText);
            glitchText.setAttribute('data-text', glitchText.textContent);
        }
        if (subtitle) {
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }
    }

    function animateTextOut(textSet) {
        const chars = textSet.querySelectorAll('.char');
        const subtitle = textSet.querySelector('.subtitle');
        chars.forEach((char, i) => {
            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('out');
        });
        if (subtitle) subtitle.classList.remove('visible');
    }

    function rotateText() {
        if (isAnimating) return;
        isAnimating = true;
        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];
        animateTextOut(currentSet);
        setTimeout(() => {
            currentSet.classList.remove('active');
            nextSet.classList.add('active');
            animateTextIn(nextSet);
            currentIndex = nextIndex;
            isAnimating = false;
        }, 600);
    }

    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);
    setTimeout(() => {
        setInterval(rotateText, 5000);
    }, 4000);

    setInterval(() => {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            if (Math.random() > 0.95) {
                text.style.animation = 'none';
                setTimeout(() => {
                    text.style.animation = '';
                }, 200);
            }
        });
    }, 3000);
}

/* Contact Widget */
const widgetBtn = document.getElementById('contactWidgetBtn');
const widgetPopup = document.getElementById('contactWidgetPopup');
const widgetOverlay = document.getElementById('contactWidgetOverlay');

if (widgetBtn && widgetPopup && widgetOverlay) {
    widgetBtn.addEventListener('click', () => {
        widgetPopup.classList.toggle('active');
        widgetOverlay.classList.toggle('active');
    });

    widgetOverlay.addEventListener('click', () => {
        widgetPopup.classList.remove('active');
        widgetOverlay.classList.remove('active');
    });
}
