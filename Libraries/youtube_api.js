// Array of categories with their search queries and display labels
const categories = [
    { label: "Technology", query: "technology" },
    { label: "React", query: "react tutorial" },
    { label: "Artificial Intelligence", query: "AI tutorial" },
    { label: "FreeCodeCamp", query: "freeCodeCamp" },
    { label: "Programming Courses", query: "programming courses" },
];

// Function to load YouTube videos for a given category
async function loadYouTubeVideosForCategory(categoryObj) {
  try {
    const { query, label } = categoryObj;
    // Call the local API route (it should be accessible as /api/youtube in your Next.js app)
    const response = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    renderYouTubeCarousel(data.items, label);
  } catch (err) {
    console.error(`Error loading ${categoryObj.label}:`, err);
  }
}

// Function to render a carousel for a given set of videos and category label
function renderYouTubeCarousel(videos, label) {
  const section = document.createElement("section");
  section.classList.add("video-category");

  // Category heading
  const heading = document.createElement("h2");
  heading.textContent = label;
  section.appendChild(heading);

  // Create Swiper container
  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper-container");

  // Swiper wrapper
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  swiperContainer.appendChild(swiperWrapper);

  // Create slides for each video
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

  // Add pagination and navigation elements
  const pagination = document.createElement("div");
  pagination.classList.add("swiper-pagination");
  const nextButton = document.createElement("div");
  nextButton.classList.add("swiper-button-next");
  const prevButton = document.createElement("div");
  prevButton.classList.add("swiper-button-prev");
  swiperContainer.appendChild(pagination);
  swiperContainer.appendChild(nextButton);
  swiperContainer.appendChild(prevButton);

  // Append the carousel section to the main container
  document.getElementById("video-categories").appendChild(section);
  section.appendChild(swiperContainer);

  // Initialize Swiper on this container
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

// Load all categories once the DOM is ready
function loadAllCategories() {
  categories.forEach(category => {
    loadYouTubeVideosForCategory(category);
  });
}

// Run the function when DOM is ready
window.addEventListener("DOMContentLoaded", loadAllCategories);
