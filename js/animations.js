document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Unobserve after revealing to improve performance
          if (!entry.target.classList.contains('keep-observing')) {
            revealObserver.unobserve(entry.target);
          }
        } else if (entry.target.classList.contains('keep-observing')) {
          // For elements that should hide when out of view
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
    
    // Initialize Intersection Observer for staggered animations
    const staggerContainers = document.querySelectorAll('.reveal-stagger');
    
    staggerContainers.forEach(container => {
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let delay = 0;
            
            Array.from(entry.target.children).forEach((child, index) => {
              // Add a small incremental delay for each child
              setTimeout(() => {
                child.classList.add('visible');
              }, 100 * index);
            });
            
            staggerObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      staggerObserver.observe(container);
    });
    
    // Mouse parallax effect for section backgrounds
    const parallaxElements = document.querySelectorAll('.section');
    
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Only apply effect if section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const depth = 30; // Effect strength
          const moveX = (mouseX - 0.5) * depth;
          const moveY = (mouseY - 0.5) * depth;
          
          section.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        }
      });
    });
    
    // Graph card hover effect enhancement
    const graphCards = document.querySelectorAll('.graph-card');
    
    graphCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const siblings = Array.from(card.parentElement.children);
        
        siblings.forEach(sibling => {
          if (sibling !== card) {
            sibling.style.opacity = '0.7';
            sibling.style.transform = 'scale(0.98)';
          }
        });
      });
      
      card.addEventListener('mouseleave', () => {
        const siblings = Array.from(card.parentElement.children);
        
        siblings.forEach(sibling => {
          if (sibling !== card) {
            sibling.style.opacity = '1';
            sibling.style.transform = 'scale(1)';
          }
        });
      });
    });
    
    // Animate counter for numeric values
    const animateCounter = (element, targetValue, duration = 2000) => {
      const start = 0;
      const increment = Math.ceil(targetValue / (duration / 16));
      let currentValue = 0;
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          clearInterval(timer);
          element.textContent = targetValue;
        } else {
          element.textContent = currentValue;
        }
      }, 16);
    };
    
    // Find and animate counter elements when they come into view
    const counterElements = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetValue = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, targetValue);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    counterElements.forEach(element => {
      counterObserver.observe(element);
    });
    
    // Tilt effect for team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
      member.addEventListener('mousemove', (e) => {
        const rect = member.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position within element
        const y = e.clientY - rect.top;  // Mouse Y position within element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltAmount = 8; // Max tilt in degrees
        
        member.style.transform = `perspective(1000px) rotateX(${-deltaY * tiltAmount}deg) rotateY(${deltaX * tiltAmount}deg) translateY(-5px)`;
      });
      
      member.addEventListener('mouseleave', () => {
        member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  });