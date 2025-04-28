// Set up theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.setAttribute('data-theme', 'dark');
      document.getElementById('theme-switch').checked = true;
    }
    
    // Theme toggle event listener
    const themeToggle = document.getElementById('theme-switch');
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Set up progress bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
    
    // Set up navigation active state
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Initialize graph images with lazy loading
    const graphImages = document.querySelectorAll('.graph-image img');
    graphImages.forEach(img => {
      img.loading = 'lazy';
      
      // Add error handling
      img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x225?text=Graph+Image+Not+Found';
      };
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });