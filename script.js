// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
  
    // Preloader
    const preloader = document.getElementById("preloader");
    if (preloader) {
      window.addEventListener("load", function () {
        preloader.classList.add("fade-out");
        setTimeout(function () {
          preloader.style.display = "none";
        }, 1000);
      });
    }
  
    // Set current year in footer
    document.getElementById("current-year").textContent =
      new Date().getFullYear();
  
    // Initialize AOS Animation Library
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  
    // Set animation delay for nav items
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    navItems.forEach((item, index) => {
      item.style.setProperty('--item-count', index);
    });
  
    // Typed.js for dynamic text animation
    const typed = new Typed(".dynamic-text", {
      strings: [
        "Frontend Developer",
        "UI/UX Designer",
        "Web Designer",
        "Freelancer",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });
  
    // Navbar scroll behavior
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
  
      // Add box shadow to header on scroll
      if (scrollPosition > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
  
      // Update active nav link based on scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
  
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
  
      // Update scroll progress bar
      const scrollProgress = document.querySelector(".scroll-progress");
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / totalHeight) * 100;
      scrollProgress.style.width = progress + "%";
  
      // Show/hide back to top button
      const backToTop = document.querySelector(".back-to-top");
      if (scrollPosition > 300) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    });
  
    // Smooth scrolling for navigation links and improved mobile menu handling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
  
          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          const navbarToggler = document.querySelector(".navbar-toggler");
          if (navbarCollapse.classList.contains("show")) {
            // Use Bootstrap's collapse method to properly close the menu
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false
            });
            bsCollapse.hide();
            // Reset aria attributes and toggle button appearance
            navbarToggler.setAttribute('aria-expanded', 'false');
            document.body.classList.remove("navbar-open");
            document.body.style.overflow = "";
          }
        }
      });
    });
  
    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper(
      ".testimonial-slider .swiper-container",
      {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      }
    );
  
    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
  
        // Add active class to clicked button
        this.classList.add("active");
  
        // Get filter value
        const filterValue = this.getAttribute("data-filter");
  
        // Filter projects
        projectItems.forEach((item) => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 200);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 500);
          }
        });
      });
    });
  
   // Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const htmlElement = document.documentElement;

// Set initial theme to dark if no saved preference exists
const savedTheme = localStorage.getItem("theme") || "dark";
htmlElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", function () {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const themeIcon = themeToggle.querySelector("i");
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"; // Sun icon for dark mode (to switch to light)
  } else {
    themeIcon.className = "fas fa-moon"; // Moon icon for light mode (to switch to dark)
  }
}

    // Contact form submission with EmailJS
    const contactForm = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status");
  
    if (contactForm) {
      // Initialize EmailJS with your user ID
      emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual EmailJS user ID
  
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Show sending message
        statusMessage.innerHTML =
          '<div class="alert alert-info">Sending message...</div>';
  
        // Send the form data using EmailJS
        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
          function () {
            // Success message
            statusMessage.innerHTML =
              '<div class="alert alert-success">Message sent successfully!</div>';
            contactForm.reset();
  
            // Clear success message after 5 seconds
            setTimeout(function () {
              statusMessage.innerHTML = "";
            }, 5000);
          },
          function (error) {
            // Error message
            statusMessage.innerHTML =
              '<div class="alert alert-danger">Failed to send message. Please try again later.</div>';
            console.error("EmailJS error:", error);
          }
        );
      });
    }
  
    // GSAP animations for hero section
    gsap.from(".hero-content", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.5,
    });
  
    gsap.from(".hero-image", {
      duration: 1,
      x: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.8,
    });
  
    gsap.from(".hero-shape", {
      duration: 1.5,
      scale: 0,
      opacity: 0,
      ease: "elastic.out(1, 0.3)",
      delay: 1,
      stagger: 0.2,
    });
  
    // Scroll animation for skills section
    const skillCards = document.querySelectorAll(".skill-card");
  
    gsap.from(skillCards, {
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
    });
  
    // Initialize counter animation for statistics
    const counterElements = document.querySelectorAll(".counter");
  
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 16)); // 60fps
  
      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current > target) current = target;
        counter.textContent = current;
  
        if (current < target) {
          requestAnimationFrame(updateCounter);
        }
      };
  
      // Start counter animation when element is in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
  
      observer.observe(counter);
    });
  
    // Improved mobile menu toggle animation
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
  
    if (navbarToggler) {
      navbarToggler.addEventListener("click", function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle navbar-open class on body
        document.body.classList.toggle("navbar-open");
        
        // Prevent body scrolling when menu is open
        if (!isExpanded) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });
    }
  
    // Close navbar when clicking outside
    document.addEventListener("click", function (e) {
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show") &&
        !e.target.closest(".navbar") &&
        !e.target.closest(".navbar-toggler")
      ) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.classList.remove("navbar-open");
        document.body.style.overflow = "";
      }
    });
  
    // Listen for escape key to close the navbar
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.classList.remove("navbar-open");
        document.body.style.overflow = "";
      }
    });
  
    // Parallax effect for hero section
    document.addEventListener("mousemove", function (e) {
      const heroShapes = document.querySelectorAll(".hero-shape");
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
  
      heroShapes.forEach((shape, index) => {
        const factor = (index + 1) * 10;
        gsap.to(shape, {
          duration: 0.5,
          x: mouseX * factor,
          y: mouseY * factor,
          ease: "power1.out",
        });
      });
    });
  });
  

  ///
  // Run this in browser console to identify overflowing elements
var all = document.getElementsByTagName("*");
var max = 0;
var offender;
for (var i = 0; i < all.length; i++) {
    var w = all[i].offsetWidth;
    if (w > max) {
        max = w;
        offender = all[i];
    }
}
console.log('Maximum width element: ', max, offender);

// Add this to your existing JavaScript (inside the DOMContentLoaded event handler)
// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });
}