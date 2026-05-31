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

// Google Sheets API Configuration
const SHEET_CONFIG = {
    spreadsheetId: '1SedmOoJlN0RDqUjh_nZcn5lqsQB5hvw_K-_SEs7togo',
    clientEmail: 'dhawanwebsite@dhawan-asso.iam.gserviceaccount.com',
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkEWwaCznqImEh
V3BT+h5E5plWbKhOhJj5j6WalnLBJYjP3/lz+iu9T+MakGuuwU15/2znkRMAp4pA
lZi4Zld3Gf1MJkHCJrcHNFAOyf2jH5EovSZyNztQHWMzg5GDyxpEDHF8nw2b6/ap
UX+EIFn8M0UdQx0D9N+CeCdUBVeJrOzNfOyP4pDtg6KHpKQ4k8jbN94+2znM6uEn
AmK+K+jtLygx2q9mWmnUUYuMDfVXIUPLbgPTQj9wEeLmc6QgLkfBSXf96RKBvTAi
Vdp+r9DZoDlV4XS6mrJfXYoray7YpDCOXO7F+5fq3cWnh0oTxzYqzkFWAW/qxyHm
BgcUyEQzAgMBAAECggEAN9MBwD7Pnt3BxNF2k+xHvlPkGqbwAX9WeZup0lachyGZ
Unm37AFUPp7e/Bvlt9ln3jnNuWEAYTmgbec4xo1z9z9tkyp1N3Vq01W2Y8HQvl8w
SfdKDJTEZrcJGO8MZRaHQl4lgyyvOb1o+SWUyMUlOQ3M128NgVohbsgpQYprxZj4
l+dGR5udLbN789oIiSFDGKmw9mlATQyx5/ywKiVaxExvME0TwlixtaEpYu41o1if
SlisHo0pPBKW8Yc4zsRijn2R5Z2tBAXQHWhAxhu1aLQOFxAwVGDJZPC5Uglt4+R+
DjspKtGZuut5Kh6B7G2eFyTLabtDt4bRf9MXOCbUCQKBgQDS6TWcgfDYm4hiKJnp
whHiqBkMIAIGLIQ9akaqFcmbjVO465Qm07dNqjK0jtW7vQMeb0fzs22PDrdBWDgI
3i6TcswWajZW6Z1rE+JUWEOBVnSP5bsnsXZqOjuZqiDyovKBAAOf95A5UEVlHgIX
cSNNkw/gzOF0XoxaUfDLxy2bdwKBgQDHJJTZSrAZ0bFMkizsgPrUmegBqM4gXt8I
zWJp/xPYvPu8F6x9WgW8p+l3sJfQsydD94Yi9gQmsaZGWr3bxwTvhgqqSo/WOHjP
RXvYXjwlB8k7Wg7pNSrfx8vMrXsM6DV7CWSCEPZMWwyaYTpkNUirG1gUtqXuFW+6
A0ZSMTCUJQKBgDiBTmGt1m7RzIovwnyEB/Kngn5jHOe2iX9Ct8fdqnPIO0PxqXF1
i0h9brQ9CDoR+4Ht4mMCEToggSw6jFij3eqW+OKQdhp24DvNyfc65msCVJwwuiF6
Q/VVwJ38nHMlAL9a153F35fbT5w1m+3X29NusPRTL5vTsNqJ1W9i328lAoGAOLHf
dqVe0VrzoRsUkxh9UL2oYaCPXoPj93uRgx/NpKzY9km/H8jbTUR4oUyzTAVVLnJv
y9BCikmVTv5Sgxl7/D0rGCQ2IwTc0BW2FnltohU/YxhWmmo6lI8rJFBXcetCHo8k
ACuYE1Dwm5sGprTMxXn5b5w4TTnpHwoDoS7D58kCgYEAoqhzg4Oz/mEgH/ZCWPZb
4vrlN/gk8hQ5hJui+MhVO+E2ufKc/FNgjhKUYuOzlACkwu0fCTaE+m+HNPtNHecS
JshHAtwAzwgF1e6fDLDtAw173VgtCgYGoHFXJtGAJqADy4OxVIaIB+ORC3F6h3y3
CTZ909S1lvSjMbMkKQbQdmQ=
-----END PRIVATE KEY-----`
};

async function getAccessToken() {
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
        iss: SHEET_CONFIG.clientEmail,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now
    };

    const privateKey = await jose.importPKCS8(SHEET_CONFIG.privateKey, 'RS256');
    const jwt = await new jose.SignJWT(claim)
        .setProtectedHeader(header)
        .sign(privateKey);

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt
    });
    const tokenData = await tokenRes.json();
    return tokenData.access_token;
}

async function appendToSheet(data) {
    try {
        const accessToken = await getAccessToken();
        const range = 'Sheet1!A:I';
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_CONFIG.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    values: [[new Date().toLocaleString(), ...data]]
                })
            }
        );
        const result = await response.json();
        if (result.error) throw new Error(result.error.message);
        return true;
    } catch (error) {
        console.error('Sheet append error:', error);
        throw error;
    }
}

function handleFormSubmit(form, formType, successMsg) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(this);
        const value = (key) => formData.get(key) || '';

        const values = [
            value('from_name'),
            value('from_email'),
            value('phone'),
            value('service'),
            value('location'),
            value('purpose'),
            value('message'),
            formType
        ];

        try {
            await appendToSheet(values);
            alert(successMsg || 'Thank you! We\'ll get back to you soon.');
            this.reset();
        } catch (err) {
            alert('Failed to send. Please try again.');
            console.error(err);
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    handleFormSubmit(contactForm, 'Contact Form', 'Thank you! We\'ll get back to you soon.');
}

const scheduleForm = document.getElementById('scheduleForm');
if (scheduleForm) {
    handleFormSubmit(scheduleForm, 'Schedule Call', 'Thank you! Our team will contact you shortly to schedule your meeting.');
}

document.querySelectorAll('.footer-form').forEach(form => {
    handleFormSubmit(form, 'Footer Form', 'Thank you! We\'ll get back to you soon.');
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
