// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // --- HOME PAGE SCRIPTS ---

    // Tab logic for Dark Features Section (Home Page)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContentsRight = document.querySelectorAll('.tab-content-right');
    const tabContentsLeft = document.querySelectorAll('.tab-content-left');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active', 'bg-white', 'text-gray-900');
                b.classList.add('hover:border-gray-400');
            });
            btn.classList.add('active', 'bg-white', 'text-gray-900');
            btn.classList.remove('hover:border-gray-400');

            const targetId = btn.getAttribute('data-target');

            tabContentsRight.forEach(content => {
                content.classList.add('hidden', 'opacity-0');
                content.classList.remove('active');
            });

            const targetRight = document.getElementById(targetId + '-right');
            if (targetRight) {
                targetRight.classList.remove('hidden');
                setTimeout(() => {
                    targetRight.classList.remove('opacity-0');
                    targetRight.classList.add('active');
                }, 50);
            }

            tabContentsLeft.forEach(content => {
                content.classList.add('hidden', 'opacity-0');
                content.classList.remove('active');
            });

            const targetLeft = document.getElementById(targetId + '-left');
            if (targetLeft) {
                targetLeft.classList.remove('hidden');
                setTimeout(() => {
                    targetLeft.classList.remove('opacity-0');
                    targetLeft.classList.add('active');
                }, 50);
            }
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // Testimonials Slider Logic
    const slides = document.querySelectorAll('.testimonial-slide');
    const btnNext = document.getElementById('test-next');
    const btnPrev = document.getElementById('test-prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('hidden');
                setTimeout(() => slide.style.opacity = '1', 10);
            } else {
                slide.style.opacity = '0';
                setTimeout(() => slide.classList.add('hidden'), 300);
            }
        });
    }

    if(btnNext && btnPrev && slides.length > 0) {
        btnNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        btnPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // --- ABOUT PAGE SCRIPTS ---

    // Tab logic for Light Features Section (About Page)
    const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
    const aboutTabInfos = document.querySelectorAll('.about-tab-info');
    const aboutTabMocks = document.querySelectorAll('.about-tab-mock');

    if (aboutTabBtns.length > 0) {
        aboutTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active state from all buttons
                aboutTabBtns.forEach(b => {
                    b.classList.remove('active', 'bg-gray-900', 'text-white');
                    b.classList.add('text-gray-600', 'hover:border-gray-400', 'hover:text-gray-900');
                });
                // Add active state to clicked
                btn.classList.add('active', 'bg-gray-900', 'text-white');
                btn.classList.remove('text-gray-600', 'hover:border-gray-400', 'hover:text-gray-900');

                const targetId = btn.getAttribute('data-target');

                // Hide all infos (left)
                aboutTabInfos.forEach(info => {
                    info.classList.add('hidden', 'opacity-0');
                    info.classList.remove('active');
                });
                // Show target info
                const targetInfo = document.getElementById(targetId + '-info');
                if(targetInfo) {
                    targetInfo.classList.remove('hidden');
                    setTimeout(() => {
                        targetInfo.classList.remove('opacity-0');
                        targetInfo.classList.add('active');
                    }, 50);
                }

                // Hide all mocks (right)
                aboutTabMocks.forEach(mock => {
                    mock.classList.add('hidden', 'opacity-0');
                    mock.classList.remove('active');
                });
                // Show target mock
                const targetMock = document.getElementById(targetId + '-mock');
                if(targetMock) {
                    targetMock.classList.remove('hidden');
                    setTimeout(() => {
                        targetMock.classList.remove('opacity-0');
                        targetMock.classList.add('active');
                    }, 50);
                }
            });
        });
    }

    // --- NEW: Counters Scroll Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    if (counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const decimals = +counter.getAttribute('data-decimals') || 0;
                    
                    let currentCount = 0;
                    const updateCount = () => {
                        // Calculate increment
                        const inc = target / speed;
                        currentCount += inc;

                        if (currentCount < target) {
                            // Add inc to current and output in counter
                            counter.innerText = currentCount.toFixed(decimals);
                            // Call function every ms
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target.toFixed(decimals);
                        }
                    };

                    updateCount();
                    observer.unobserve(counter); // Only animate once
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // --- NEW: Leadership Card Click ---
    const leaderCards = document.querySelectorAll('.leadership-card');
    leaderCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent default just in case it triggers links immediately
            if (e.target.closest('a')) return; 
            
            const overlay = card.querySelector('.social-overlay');
            if (overlay.classList.contains('opacity-0')) {
                // Hide others first
                document.querySelectorAll('.social-overlay').forEach(ov => ov.classList.add('opacity-0'));
                
                // Show this one
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            } else {
                overlay.classList.add('opacity-0');
                overlay.classList.remove('opacity-100');
            }
        });
    });

});

// --- NEW ARCHITECTURE: GLOBAL INIT ---
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
    });
}

// --- 1. MOBILE NAVIGATION (Marketing Pages) ---
const mmBtn = document.getElementById('mobile-menu-btn');
const mmMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

if (mmBtn && mmMenu) {
    mmMenu.classList.remove('hidden'); 
    mmMenu.style.display = 'none';

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mmMenu.style.display = 'flex';
            // Force reflow
            void mmMenu.offsetWidth;
            mmMenu.classList.remove('opacity-0', 'pointer-events-none');
            mmMenu.classList.add('opacity-100', 'pointer-events-auto');
            mmBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            document.body.style.overflow = 'hidden'; // lock scroll
        } else {
            mmMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mmMenu.classList.add('opacity-0', 'pointer-events-none');
            mmBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = ''; // unlock scroll
            
            setTimeout(() => {
                if (!isMenuOpen) mmMenu.style.display = 'none';
            }, 300);
        }
    };

    mmBtn.removeEventListener('click', toggleMenu);
    mmBtn.addEventListener('click', toggleMenu);

    const mobileLinks = mmMenu.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
}

// --- 2. LOGIN VALIDATION ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const errorAlert = document.getElementById('error-alert');
        const errorMessage = document.getElementById('error-message');
        
        const hideError = () => { if(errorAlert) errorAlert.classList.add('hidden'); }
        const showError = (msg) => { 
            if(errorAlert && errorMessage) {
                errorMessage.textContent = msg;
                errorAlert.classList.remove('hidden');
            } else {
                alert(msg);
            }
        }

        hideError();

        const roleEl = document.getElementById('role');
        const emailEl = document.getElementById('email');
        const passwordEl = document.getElementById('password');

        const role = roleEl ? roleEl.value : 'user';
        const email = emailEl ? emailEl.value.trim() : '';
        const password = passwordEl ? passwordEl.value.trim() : '';
        
        if (email) {
            const namePart = email.split('@')[0];
            const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
            localStorage.setItem('stackly_username', capitalizedName);
        }

        if (!email) {
            showError('Please enter your email address.');
            return;
        }

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(String(email).toLowerCase())) {
            showError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            showError('Please enter your password.');
            return;
        }

        if (role === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    });
}

// --- 3. SIGNUP VALIDATION ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const hideErr = (id) => { const el = document.getElementById(id); if(el){ el.textContent = ''; el.classList.add('hidden'); } }
        const showErr = (id, msg) => { const el = document.getElementById(id); if(el){ el.textContent = msg; el.classList.remove('hidden'); } }

        ['err-fullname', 'err-email', 'err-phone', 'err-password', 'err-confirm', 'err-terms'].forEach(hideErr);

        const fullname = document.getElementById('fullname')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const password = document.getElementById('password')?.value;
        const confirm = document.getElementById('confirm-password')?.value;
        const terms = document.getElementById('terms')?.checked;

        let isValid = true;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullname) { showErr('err-fullname', 'Full name is required.'); isValid = false; }
        if (!email) { showErr('err-email', 'Email address is required.'); isValid = false; } 
        else if (!re.test(String(email).toLowerCase())) { showErr('err-email', 'Please enter a valid email address.'); isValid = false; }
        if (!phone) { showErr('err-phone', 'Phone number is required.'); isValid = false; }
        if (!password) { showErr('err-password', 'Password is required.'); isValid = false; } 
        else if (password.length < 8) { showErr('err-password', 'Password must be at least 8 characters.'); isValid = false; }
        if (password !== confirm) { showErr('err-confirm', 'Passwords do not match.'); isValid = false; }
        if (!terms) { showErr('err-terms', 'You must agree to the terms and privacy policy.'); isValid = false; }

        if (isValid) {
            window.location.href = 'login.html';
        }
    });
}

// --- 4. CONTACT FORM VALIDATION ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Thank you! Your message has been sent successfully.");
        contactForm.reset();
    });
}

// --- 5. DROPDOWNS (Notifications & Profile) ---
const createDropdown = (buttonSelector, contentHtml) => {
    const btn = document.querySelector(buttonSelector);
    if (!btn) return;
    
    btn.parentElement.style.position = 'relative';
    
    const dropdown = document.createElement('div');
    dropdown.className = 'absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 hidden z-50';
    dropdown.innerHTML = contentHtml;
    btn.parentElement.appendChild(dropdown);
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== btn) {
            dropdown.classList.add('hidden');
        }
    });
};

createDropdown('#profile-dropdown-btn', `
    <a href="login.html" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Logout</a>
`);

createDropdown('.fa-bell', `
    <div class="px-4 py-2 font-bold text-sm border-b border-gray-100">Notifications</div>
    <a href="#" class="block px-4 py-3 text-xs text-gray-700 hover:bg-gray-50 border-b border-gray-50">
        <span class="font-semibold block">New Login</span>
        <span class="text-gray-500">From a new device in NY.</span>
    </a>
    <a href="#" class="block px-4 py-2 text-xs text-brandGreen font-semibold text-center hover:bg-gray-50">View All</a>
`);


// --- NEW: DYNAMIC USERNAME & SEARCH HANDLER ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Enter -> 404
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"], input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (input.value.trim() !== '') {
                    window.location.href = '404.html';
                }
            }
        });
    });

    // 2. Set Dynamic Name
    const storedName = localStorage.getItem('stackly_username');
    if (storedName) {
        document.querySelectorAll('.dynamic-fullname').forEach(el => {
            el.textContent = storedName;
        });
        document.querySelectorAll('.dynamic-firstname').forEach(el => {
            el.textContent = storedName.split(' ')[0];
        });
        document.querySelectorAll('.dynamic-fullname-upper').forEach(el => {
            el.textContent = storedName.toUpperCase();
        });
    }
});
