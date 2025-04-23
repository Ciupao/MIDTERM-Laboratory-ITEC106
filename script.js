// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '☀️ <span>Light Mode</span>';
} else {
  darkModeToggle.innerHTML = '🌙 <span>Dark Mode</span>';
}

// Toggle dark/light mode
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.innerHTML = '☀️ <span>Light Mode</span>';
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.innerHTML = '🌙 <span>Dark Mode</span>';
  }
});

const createMobileNav = () => {
  const navbar = document.querySelector('.navbar');
  const navBar = document.querySelector('.nav-bar');
  
  const menuBtn = document.createElement('button');
  menuBtn.classList.add('menu-btn');
  menuBtn.innerHTML = '☰';
  menuBtn.style.display = 'none';
  
  navBar.insertBefore(menuBtn, darkModeToggle);
  
  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.textContent = navbar.classList.contains('active') ? '✕' : '☰';
  });
  
 
  const handleMobileNav = () => {
    if (window.innerWidth <= 576) {
      menuBtn.style.display = 'block';
    } else {
      menuBtn.style.display = 'none';
      navbar.classList.remove('active');
    }
  };
  
  handleMobileNav();
  window.addEventListener('resize', handleMobileNav);
};

document.addEventListener('DOMContentLoaded', createMobileNav);

// Project Filtering
const initProjectFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.projectCon');
  
  if (!filterBtns.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projectItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'flex';
        } else {
          const categories = item.getAttribute('data-category').split(' ');
          if (categories.includes(filter)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
};

function openFullscreen(img) {
  const viewer = document.getElementById('image-viewer');
  const fullImg = document.getElementById('full-image');
  const title = document.getElementById('image-title');
  const description = document.getElementById('image-description');
  const sourceLink = document.getElementById('source-link');

  const project = img.closest('.projectCon');
  const projectTitle = project.querySelector('h1')?.innerText || '';
  const projectDesc = project.querySelector('p')?.innerText || 'No description available.';
  const githubAnchor = project.querySelector('.github-link');
  const githubURL = githubAnchor ? githubAnchor.href : 'https://github.com/';

  fullImg.src = img.src;
  title.innerText = projectTitle;
  description.innerText = projectDesc;
  sourceLink.href = githubURL;

  viewer.style.display = 'flex';
}

document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('image-viewer').style.display = 'none';
});

document.getElementById('image-viewer').addEventListener('click', function(e) {
  if (e.target.id === 'image-viewer') {
    this.style.display = 'none';
  }
});

const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-level-bar');
  
  if (!skillBars.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.1 });
  
  skillBars.forEach(bar => {
    bar.style.width = '0';
    observer.observe(bar);
  });
};

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.projectCon, .subRow, .rowCol, .skill-item, .github-stat-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.classList.contains('projectCon') ? 'translateY(0)' : 
                                      entry.target.classList.contains('skill-item') ? 'translateY(0)' : 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = element.classList.contains('projectCon') ? 'translateY(20px)' : 
                             element.classList.contains('skill-item') ? 'translateY(20px)' : 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
};

// Breadcrumbs
const initBackToTop = () => {
  const backToTopBtn = document.createElement('div');
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.innerHTML = '↑';
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Loading of DOM
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animateOnScroll();
    animateSkillBars();
    initProjectFilters();
    initBackToTop();
    initFormValidation();
  }, 500);
});
