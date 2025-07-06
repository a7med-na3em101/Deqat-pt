document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function () {
        loader.classList.add('fade-out');
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('#backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Services Tab System
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Animate Stats Counting
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 16ms per frame

            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    stat.textContent = target;
                }
            };

            // Start animation when stats are in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    increment();
                    observer.unobserve(stat);
                }
            });

            observer.observe(stat);
        });
    }

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animated Headline
    if (document.querySelector('.animated-headline')) {
        // Wrap each letter in a span
        const textWrapper = document.querySelector('.animated-headline .letters');
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false })
                .add({
                    targets: '.animated-headline .letter',
                    translateY: ["1.1em", 0],
                    translateZ: 0,
                    duration: 750,
                    delay: (el, i) => 50 * i
                });
        }
    }

    // Form Floating Labels
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            // Check if input has value on page load
            if (input.value) {
                group.querySelector('label').style.top = '-10px';
                group.querySelector('label').style.left = '10px';
                group.querySelector('label').style.fontSize = '0.8rem';
                group.querySelector('label').style.color = '#003366';
                group.querySelector('label').style.zIndex = '2';
            }

            input.addEventListener('focus', function () {
                group.querySelector('label').style.top = '-10px';
                group.querySelector('label').style.left = '10px';
                group.querySelector('label').style.fontSize = '0.8rem';
                group.querySelector('label').style.color = '#003366';
                group.querySelector('label').style.zIndex = '2';
            });

            input.addEventListener('blur', function () {
                if (!this.value) {
                    group.querySelector('label').style.top = '15px';
                    group.querySelector('label').style.left = '15px';
                    group.querySelector('label').style.fontSize = '1rem';
                    group.querySelector('label').style.color = '#777777';
                    group.querySelector('label').style.zIndex = '0';
                }
            });
        }
    });

    // Simple form submission handling
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your enquiry. We will contact you soon!');
            this.reset();

            // Reset labels
            this.querySelectorAll('.form-group').forEach(group => {
                const label = group.querySelector('label');
                label.style.top = '15px';
                label.style.left = '15px';
                label.style.fontSize = '1rem';
                label.style.color = '#777777';
                label.style.zIndex = '0';
            });
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: i * 0.1
        });
    });

    // Animate benefit cards
    gsap.utils.toArray('.benefit-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: i * 0.1
        });
    });

    // Animate process steps
    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: i * 0.2
        });
    });

    // Simple testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (testimonialSlides.length > 1) {
        let currentSlide = 0;

        function showSlide(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }

        // Show first slide initially
        showSlide(0);

        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Simple certificate slider
    const certificateSlides = document.querySelectorAll('.certificate-slide');
    if (certificateSlides.length > 1) {
        let currentCertSlide = 0;

        function showCertSlide(index) {
            certificateSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextCertSlide() {
            currentCertSlide = (currentCertSlide + 1) % certificateSlides.length;
            showCertSlide(currentCertSlide);
        }

        // Show first slide initially
        showCertSlide(0);

        // Auto-advance slides every 3 seconds
        setInterval(nextCertSlide, 3000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // تحديد اللغة الافتراضية
    let currentLang = 'ar'; // العربية كلغة افتراضية
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // وظيفة تبديل اللغة
    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // تحديث جميع العناصر ذات سمة البيانات
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (element.dataset[lang]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset[lang];
                } else {
                    element.textContent = element.dataset[lang];
                }
            }
        });

        // تحديث الزر النشط
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // تخزين التفضيل في localStorage
        localStorage.setItem('preferredLang', lang);
    }

    // استعادة اللغة المفضلة إذا كانت مخزنة
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        switchLanguage(savedLang);
    }

    // إضافة مستمعين لأزرار تبديل اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            switchLanguage(this.dataset.lang);
        });
    });

    // التبديل التلقائي للغة عند تحميل الصفحة
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ar')) {
        switchLanguage('ar');
    }
});
// Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Show current slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next/previous controls
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Go to specific slide
    function goToSlide(n) {
        showSlide(n);
        resetInterval();
    }

    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 1000); // Change every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Initialize
    showSlide(0);
    startInterval();

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
});

// نظام تبديل اللغة
document.addEventListener('DOMContentLoaded', function () {
    const langSwitcher = document.querySelector('.lang-switcher');
    const langButtons = langSwitcher.querySelectorAll('a');

    // تحديد اللغة الافتراضية
    let currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // وظيفة تبديل اللغة
    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // تحديث النصوص
        document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.placeholder = el.getAttribute(`data-${lang}`);
            } else {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });

        // تحديث الأزرار النشطة
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
        });

        // حفظ التفضيل
        localStorage.setItem('language', lang);
    }

    // أحداث النقر على أزرار اللغة
    langButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.textContent.trim().toLowerCase();
            switchLanguage(lang);
        });
    });

    // تطبيق اللغة المحددة
    switchLanguage(currentLang);
});

document.getElementById('enquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // جمع بيانات النموذج
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // إنشاء نص الرسالة
    let whatsappMessage = `New Enquiry from Website:\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Email:* ${email}\n`;
    if (phone) whatsappMessage += `*Phone:* ${phone}\n`;
    whatsappMessage += `*Service Interested In:* ${service}\n`;
    whatsappMessage += `*Message:* ${message}`;

    // ترميز الرسالة لرابط URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // رقم الواتساب المستهدف
    const whatsappNumber = '+966535935824';

    // إنشاء رابط واتساب
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // فتح الرابط في نافذة جديدة
    window.open(whatsappUrl, '_blank');

    // إظهار رسالة تأكيد (اختياري)
    alert('You will be redirected to WhatsApp to send your message.');
});
    document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const loader = document.querySelector(".loader");
    if (loader) {
        window.addEventListener("load", function () {
            setTimeout(() => {
                loader.classList.add("fade-out");
                document.body.classList.remove("no-scroll");
                document.documentElement.classList.remove("no-scroll");
                document.body.style.overflow = "auto";
            }, 1000);
        });
  }

    // Mobile Menu Toggle - هذا هو الجزء المعدل
    const mobileMenuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener("click", function (e) {
            e.stopPropagation();
            this.classList.toggle("active");
            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                body.classList.add("no-scroll");
            } else {
                body.classList.remove("no-scroll");
            }
        });

       // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuButton.classList.remove("active");
            navMenu.classList.remove("active");
            body.classList.remove("no-scroll");
        });
  });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && e.target !== mobileMenuButton) {
        mobileMenuButton.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("no-scroll");
    }
  });
}

    // Sticky Navigation
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
  }

    // Back to Top Button
    const backToTop = document.querySelector("#backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.classList.add("active");
            } else {
                backToTop.classList.remove("active");
            }
        });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            // Skip for language switcher
            if (
                this.classList.contains("lang-switcher") ||
                this.parentElement.classList.contains("lang-switcher")
            ) {
                return;
            }

            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
  });

    // Services Tab System
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                tabContents.forEach((content) =>
                    content.classList.remove("active")
                );

                // Add active class to clicked button and corresponding content
                button.classList.add("active");
                const tabId = button.getAttribute("data-tab");
                const targetTab = document.getElementById(tabId);
                if (targetTab) {
                    targetTab.classList.add("active");
                }
            });
        });
  }

    // Animate Stats Counting
    const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
        statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-count"));
            const duration = 2000;
            const step = target / (duration / 16);

            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    stat.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    increment();
                    observer.unobserve(stat);
                }
            });

            observer.observe(stat);
        });
  }

    // Initialize Particles.js
    if (
    document.getElementById("particles-js") &&
    typeof particlesJS === "function"
    ) {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                    polygon: {
                        nb_sides: 5,
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab",
                    },
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4,
                    },
                    remove: {
                        particles_nb: 2,
                    },
                },
            },
            retina_detect: true,
        });
  }
    });
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener("click", function (e) {
            e.stopPropagation();
            this.classList.toggle("active");
            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                body.classList.add("no-scroll");
            } else {
                body.classList.remove("no-scroll");
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuButton.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && e.target !== mobileMenuButton) {
                mobileMenuButton.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            }
        });
    }

});
    
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("menu-open");
            }
        });
    });

    // إغلاق القائمة عند تغيير حجم النافذة
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
        }
    });
});