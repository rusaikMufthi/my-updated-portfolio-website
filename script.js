document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    // Show welcome screen for 7 seconds
    setTimeout(function() {
        // Fade out welcome screen
        welcomeScreen.classList.add('fade-out');

        // Show main content after fade out
        setTimeout(function() {
            mainContent.classList.add('show');
            initNavigation();
            initScrollAnimations();
            initSkillsAnimation();
            initProjectsAnimation();
            initAboutAnimation();
            initContactAnimation();
            initAboutTyping();
            initGitHubLinks(); // Add this line
        }, 400);
    }, 7000); // 7 seconds
});

// Navigation functionality
function initNavigation() {
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scroll to sections
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href');
const targetSection = document.querySelector(targetId);

if (targetSection) {
targetSection.scrollIntoView({
behavior: 'smooth',
block: 'start'
});

// Update active link
navLinks.forEach(l => l.classList.remove('active'));
this.classList.add('active');
}
});
});

// Highlight active section on scroll
window.addEventListener('scroll', function() {
let current = '';
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;
if (window.pageYOffset >= sectionTop - 100) {
current = section.getAttribute('id');
}
});

navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === '#' + current) {
link.classList.add('active');
}
});
});

// Initialize scroll animations
initScrollAnimations();
}

// Scroll-triggered animations
function initScrollAnimations() {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animate');
}
});
}, observerOptions);

// Observe the about section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
observer.observe(aboutSection);
}
}

// Scroll animations for timeline items
function initScrollAnimations() {
const timelineItems = document.querySelectorAll('.timeline-item');

// Function to check if element is in viewport
function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200 &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}

// Function to add animation class to visible items
function animateOnScroll() {
timelineItems.forEach((item, index) => {
if (isInViewport(item)) {
setTimeout(() => {
item.classList.add('animate');
}, index * 200); // Stagger animation
}
});
}

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Check on load
animateOnScroll();
}

// Skills section animation
function initSkillsAnimation() {
const skillCategories = document.querySelectorAll('.skill-category');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Set initial width to 0 and store target progress
skillProgressBars.forEach(bar => {
const progress = bar.getAttribute('data-progress');
bar.style.setProperty('--progress', progress + '%');
bar.style.width = '0%';
});

// Function to check if element is in viewport
function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}

// Function to animate skill bars
function animateSkills() {
skillCategories.forEach(category => {
if (isInViewport(category) && !category.classList.contains('in-view')) {
category.classList.add('in-view');

// Animate each progress bar in this category
const progressBars = category.querySelectorAll('.skill-progress');
progressBars.forEach((bar, index) => {
setTimeout(() => {
const progress = bar.getAttribute('data-progress');
bar.style.width = progress + '%';
}, index * 150); // Stagger animation
});
}
});
}

// Check on scroll
window.addEventListener('scroll', animateSkills);

// Check on load
animateSkills();
}

// Projects section animation
function initProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate project cards
    function animateProjects() {
        projectCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                setTimeout(() => {
                    card.classList.add('animated');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * 150); // Stagger animation
            }
        });
    }
    
    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a pulse effect on click
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
    
    // Check on scroll
    window.addEventListener('scroll', animateProjects);
    
    // Check on load
    animateProjects();
}

// About section animation (fix visibility)
function initAboutAnimation() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    observer.observe(aboutSection);
}

// GitHub link functionality
function initGitHubLinks() {
    const githubLinks = document.querySelectorAll('.github-link');
    
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering project card click
            // You can add analytics or other tracking here
            console.log('GitHub link clicked:', this.href);
        });
    });
}

// Typing effect for About roles
function initAboutTyping() {
    const el = document.querySelector('.typed-roles');
    if (!el) return;
    const roles = [
        'Software Engineer',
        'Web Developer',
        'UI/UX Designer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90; // ms per char
    const deletingSpeed = 50;
    const holdDelay = 1000; // pause when full word typed

    function tick() {
        const current = roles[roleIndex];
        if (isDeleting) {
            charIndex--;
            el.textContent = current.substring(0, charIndex);
            if (charIndex <= 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(tick, deletingSpeed);
        } else {
            charIndex++;
            el.textContent = current.substring(0, charIndex);
            if (charIndex === current.length) {
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(tick, deletingSpeed);
                }, holdDelay);
            } else {
                setTimeout(tick, typingSpeed);
            }
        }
    }

    tick();
}

// Contact section animation and form handling
function initContactAnimation() {
    const contactSection = document.querySelector('#contact');
    const form = document.getElementById('contact-form');

    if (contactSection) {
        function handleInView() {
            const rect = contactSection.getBoundingClientRect();
            const inView = rect.top < (window.innerHeight - 100) && rect.bottom > 100;
            if (inView) {
                contactSection.classList.add('in-view');
            }
        }
        window.addEventListener('scroll', handleInView);
        handleInView();
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const message = (document.getElementById('message') || {}).value || '';

            if (!name.trim() || !email.trim() || !message.trim()) {
                alert('Please fill out all fields.');
                return;
            }

            // Basic email format check
            const emailOk = /.+@.+\..+/.test(email);
            if (!emailOk) {
                alert('Please enter a valid email address.');
                return;
            }

            // Compose mailto link
            const to = 'rusaick.mufthi@example.com';
            const subject = encodeURIComponent('Portfolio Contact from ' + name);
            const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
            window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
        });
    }
}
