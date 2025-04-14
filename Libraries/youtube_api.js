// Categories for YouTube search
const categories = [
    { label: "Technology", query: "technology" },
    { label: "React", query: "react tutorial" },
    { label: "Artificial Intelligence", query: "AI tutorial" },
    { label: "FreeCodeCamp", query: "freeCodeCamp" },
    { label: "Programming Courses", query: "programming courses" },
  ];
  
  // Dynamic base URL (for local & production)
  const isLocal = window.location.hostname === "localhost";
  const baseURL = isLocal
    ? "https://hyper-portfolio.vercel.app"
    : ""; // Relative on production
  
  // Load videos for one category
  async function loadYouTubeVideosForCategory(categoryObj) {
    const { query, label } = categoryObj;
  
    // Create section container early
    const section = document.createElement("section");
    section.classList.add("video-category");
  
    // Heading
    const heading = document.createElement("h2");
    heading.textContent = label;
    section.appendChild(heading);
  
    // Loading message
    const loading = document.createElement("p");
    loading.textContent = "Loading videos...";
    loading.classList.add("loading-text");
    section.appendChild(loading);
  
    document.getElementById("video-categories").appendChild(section);
  
    try {
      const response = await fetch(`${baseURL}/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      // Remove loading text
      loading.remove();
  
      // Render carousel
      renderYouTubeCarousel(data.items, section);
    } catch (err) {
      console.error(`Error loading ${label}:`, err);
      loading.textContent = "Failed to load videos. Try again later.";
    }
  }
  
  // Render Swiper carousel inside section
  function renderYouTubeCarousel(videos, section) {
    const swiperContainer = document.createElement("div");
    swiperContainer.classList.add("swiper-container");
  
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");
  
    videos.forEach(video => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
  
      const videoId = video.id.videoId || video.id;
  
      slide.innerHTML = `
        <div class="video-card">
          <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
          <h3>${video.snippet.title}</h3>
          <p>${video.snippet.description.substring(0, 100)}...</p>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Watch Video</a>
        </div>
      `;
  
      swiperWrapper.appendChild(slide);
    });
  
    // Pagination & nav buttons
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
  
    const nextButton = document.createElement("div");
    nextButton.classList.add("swiper-button-next");
  
    const prevButton = document.createElement("div");
    prevButton.classList.add("swiper-button-prev");
  
    // Combine everything
    swiperContainer.appendChild(swiperWrapper);
    swiperContainer.appendChild(pagination);
    swiperContainer.appendChild(nextButton);
    swiperContainer.appendChild(prevButton);
    section.appendChild(swiperContainer);
  
    // Initialize Swiper
    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: pagination,
        clickable: true,
      },
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }
  
  // Load all categories
  function loadAllCategories() {
    categories.forEach(loadYouTubeVideosForCategory);
  }
  
  // Init on DOM load
  window.addEventListener("DOMContentLoaded", loadAllCategories);
  