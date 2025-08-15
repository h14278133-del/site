// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 60, 114, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature-item, .contact-item, .about-text, .stats');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Call button functionality
function call() {
    if (confirm('هل تريد الاتصال بنا الآن؟')) {
        window.location.href = 'tel:+971561309910';
    }
}

// Scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    const headerOffset = 80;
    const elementPosition = servicesSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !phone || !service) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Phone number validation (UAE format)
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+971/, '');
    
    if (!phoneRegex.test(cleanPhone)) {
        alert('يرجى إدخال رقم هاتف صحيح (مثال: 0561309910)');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `
*طلب خدمة جديد*

الاسم: ${name}
الهاتف: ${phone}
نوع الخدمة: ${getServiceName(service)}
التفاصيل: ${message || 'لا توجد تفاصيل إضافية'}

مرسل من موقع شركة نقل مركبات
    `.trim();
    
    const whatsappURL = `https://wa.me/971561309910?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
    
    // Reset form
    this.reset();
});

// Get service name in Arabic
function getServiceName(serviceValue) {
    const services = {
        'tow': 'خدمة الونش',
        'transport': 'نقل المركبات',
        'emergency': 'إنقاذ طوارئ',
        'maintenance': 'صيانة طارئة'
    };
    return services[serviceValue] || serviceValue;
}

// Emergency call functionality
document.addEventListener('DOMContentLoaded', function() {
    const emergencyPhone = document.querySelector('.emergency-phone');
    if (emergencyPhone) {
        emergencyPhone.addEventListener('click', function(e) {
            if (confirm('اتصال طوارئ - هل تريد الاتصال الآن؟')) {
                // Allow the default action (tel: link)
                return true;
            } else {
                e.preventDefault();
            }
        });
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavItem);

// Add smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 40);
    });
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add click event to service cards for more interactivity
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const serviceDescription = this.querySelector('p').textContent;
        
        if (confirm(`هل تريد طلب خدمة "${serviceName}"؟`)) {
            // Pre-fill contact form with selected service
            const serviceSelect = document.getElementById('service');
            const messageTextarea = document.getElementById('message');
            
            // Map service names to select values
            const serviceMapping = {
                'نقل المركبات': 'transport',
                'خدمة الونش': 'tow',
                'إنقاذ طوارئ': 'emergency',
                'إزالة الحوادث': 'emergency',
                'بطارية وإطارات': 'maintenance',
                'توصيل وقود': 'maintenance'
            };
            
            if (serviceSelect && serviceMapping[serviceName]) {
                serviceSelect.value = serviceMapping[serviceName];
            }
            
            if (messageTextarea) {
                messageTextarea.value = `أحتاج إلى خدمة ${serviceName}. ${serviceDescription}`;
            }
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on service cards
    if (e.key === 'Enter' && e.target.classList.contains('service-card')) {
        e.target.click();
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, .service-card');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #ffd700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Performance optimization: Lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy load function when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

console.log('🚛 شركة نقل مركبات - الموقع جاهز!');
console.log('📱 للاتصال: +971561309910');
console.log('💬 واتساب متاح للتواصل السريع');
