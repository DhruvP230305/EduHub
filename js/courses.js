document.addEventListener('DOMContentLoaded', function() {
  // Sample course data - in a real app, this would come from a database
  const courseData = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
      category: "development",
      lessons: 12,
      duration: "8 Hours",
      price: 49.99,
      level: "beginner",
      instructor: "John Smith",
      popularity: 95
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg",
      category: "marketing",
      lessons: 15,
      duration: "10 Hours",
      price: 59.99,
      level: "intermediate",
      instructor: "Sarah Johnson",
      popularity: 90
    },
    {
      id: 3,
      title: "Business Leadership",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      category: "business",
      lessons: 10,
      duration: "7 Hours",
      price: 69.99,
      level: "advanced",
      instructor: "Michael Chen",
      popularity: 85
    },
    {
      id: 4,
      title: "Graphic Design Essentials",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      category: "design",
      lessons: 14,
      duration: "9 Hours",
      price: 54.99,
      level: "beginner",
      instructor: "Emma Rodriguez",
      popularity: 80
    },
    {
      id: 5,
      title: "Photography Masterclass",
      image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg",
      category: "photography",
      lessons: 20,
      duration: "12 Hours",
      price: 79.99,
      level: "intermediate",
      instructor: "David Wilson",
      popularity: 75
    },
    {
      id: 6,
      title: "Music Production Basics",
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      category: "music",
      lessons: 15,
      duration: "8 Hours",
      price: 49.99,
      level: "beginner",
      instructor: "Lisa Thompson",
      popularity: 70
    },
    {
      id: 7,
      title: "Advanced React Development",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
      category: "development",
      lessons: 18,
      duration: "15 Hours",
      price: 89.99,
      level: "advanced",
      instructor: "John Smith",
      popularity: 88
    },
    {
      id: 8,
      title: "Content Marketing Strategy",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
      category: "marketing",
      lessons: 12,
      duration: "7 Hours",
      price: 59.99,
      level: "intermediate",
      instructor: "Sarah Johnson",
      popularity: 82
    },
    {
      id: 9,
      title: "UI/UX Design Principles",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
      category: "design",
      lessons: 16,
      duration: "11 Hours",
      price: 64.99,
      level: "intermediate",
      instructor: "Emma Rodriguez",
      popularity: 87
    }
  ];

  // Get DOM elements
  const courseGrid = document.getElementById('course-grid');
  const categoryFilter = document.getElementById('category-filter');
  const levelFilter = document.getElementById('level-filter');
  const sortFilter = document.getElementById('sort-filter');
  const searchInput = document.getElementById('search-courses');
  
  // Initialize with all courses
  displayCourses(courseData);
  
  // Add event listeners for filters
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterCourses);
  }
  
  if (levelFilter) {
    levelFilter.addEventListener('change', filterCourses);
  }
  
  if (sortFilter) {
    sortFilter.addEventListener('change', filterCourses);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', filterCourses);
  }
  
  // Parse URL parameters for direct filtering
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam && categoryFilter) {
    categoryFilter.value = categoryParam;
    filterCourses();
  }
  
  // Function to filter and display courses
  function filterCourses() {
    const categoryValue = categoryFilter?.value || 'all';
    const levelValue = levelFilter?.value || 'all';
    const sortValue = sortFilter?.value || 'popular';
    const searchValue = searchInput?.value.toLowerCase() || '';
    
    let filteredCourses = courseData.filter(course => {
      const matchesCategory = categoryValue === 'all' || course.category === categoryValue;
      const matchesLevel = levelValue === 'all' || course.level === levelValue;
      const matchesSearch = course.title.toLowerCase().includes(searchValue) || 
                           course.category.toLowerCase().includes(searchValue) ||
                           course.instructor.toLowerCase().includes(searchValue);
      
      return matchesCategory && matchesLevel && matchesSearch;
    });
    
    // Sort courses
    switch(sortValue) {
      case 'newest':
        // In a real app, you'd sort by date
        // For demo, we'll just reverse the array
        filteredCourses.reverse();
        break;
      case 'price-low':
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredCourses.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        filteredCourses.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    
    displayCourses(filteredCourses);
  }
  
  // Function to display courses in the grid
  function displayCourses(courses) {
    if (!courseGrid) return;
    
    // Clear existing courses
    courseGrid.innerHTML = '';
    
    if (courses.length === 0) {
      courseGrid.innerHTML = `
        <div class="empty-state">
          <h3>No courses found</h3>
          <p>Try adjusting your filters or search criteria to find courses.</p>
          <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }
    
    // Add courses to grid
    courses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'course-card';
      
      courseCard.innerHTML = `
        <div class="course-image">
          <img src="${course.image}" alt="${course.title}">
          <span class="course-category">${capitalizeFirstLetter(course.category)}</span>
        </div>
        <div class="course-content">
          <h3><a href="course-detail.html?id=${course.id}">${course.title}</a></h3>
          <div class="course-meta">
            <span>${course.lessons} Lessons</span>
            <span>${course.duration}</span>
          </div>
          <div class="course-footer">
            <span class="course-price">$${course.price}</span>
            <a href="course-detail.html?id=${course.id}" class="btn btn-sm">View Course</a>
          </div>
        </div>
      `;
      
      courseGrid.appendChild(courseCard);
    });
  }
  
  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Add to window for use in HTML
  window.resetFilters = function() {
    if (categoryFilter) categoryFilter.value = 'all';
    if (levelFilter) levelFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'popular';
    if (searchInput) searchInput.value = '';
    
    filterCourses();
  };
});