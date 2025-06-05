// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navLinks?.contains(event.target);
    const isClickOnToggle = mobileMenuToggle?.contains(event.target);
    
    if (navLinks?.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
      navLinks.classList.remove('active');
      mobileMenuToggle?.classList.remove('active');
    }
  });

  // Initialize tabs if they exist
  initializeTabs();
  
  // Initialize accordions if they exist
  initializeAccordions();
});

// Tabs Functionality
function initializeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
}

// Accordion Functionality
function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        
        // Toggle the open class
        accordionItem.classList.toggle('open');
        
        // Close other open accordions (optional)
        // document.querySelectorAll('.accordion-item').forEach(item => {
        //   if (item !== accordionItem) {
        //     item.classList.remove('open');
        //   }
        // });
      });
    });
    
    // Open the first accordion by default
    document.querySelector('.accordion-item')?.classList.add('open');
  }
}