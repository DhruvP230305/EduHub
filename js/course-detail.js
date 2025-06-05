document.addEventListener('DOMContentLoaded', function() {
  // Handle progress bar functionality
  const progressFill = document.querySelector('.progress-fill');
  const progressPercentage = document.getElementById('progress-percentage');
  
  // In a real app, this would be fetched from the server/database
  // For demo purposes, we'll start with 25% and allow the user to increase it
  let currentProgress = 25;
  
  // Update progress when a lesson is clicked (only for demo purposes)
  const lessons = document.querySelectorAll('.lesson:not(.locked)');
  lessons.forEach(lesson => {
    lesson.addEventListener('click', function() {
      if (!this.classList.contains('completed') && !this.classList.contains('current')) {
        // Mark current lesson as completed
        document.querySelector('.lesson.current')?.classList.remove('current');
        document.querySelector('.lesson.current')?.classList.add('completed');
        
        // Make this the current lesson
        this.classList.add('current');
        
        // Update progress
        currentProgress += Math.floor(100 / lessons.length);
        if (currentProgress > 100) currentProgress = 100;
        
        updateProgress(currentProgress);
      }
    });
  });
  
  // Function to update progress bar
  function updateProgress(percentage) {
    if (progressFill && progressPercentage) {
      progressFill.style.width = `${percentage}%`;
      progressPercentage.textContent = `${percentage}%`;
      
      // Save progress (would use localStorage or API in a real app)
      // localStorage.setItem('courseProgress', percentage);
    }
  }
  
  // Check URL for any parameters (like direct linking to a specific tab)
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  
  if (tabParam) {
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    if (tabBtn) {
      // Trigger click on the tab button
      tabBtn.click();
    }
  }
  
  // Handle form submission in the reviews tab (if it exists)
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real app, you would send this to the server
      alert('Thank you for your review!');
      
      // Reset form
      this.reset();
    });
  }
});