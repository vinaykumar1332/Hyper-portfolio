async function loadYouTubeVideos(category = '28') {
    try {
      const response = await fetch(`/api/youtube?category=${category}`);
      const data = await response.json();
  
      console.log("YouTube data:", data); // Debug
  
      const carousel = document.getElementById('video-carousel');
      data.items.forEach(video => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
          <h3>${video.snippet.title}</h3>
        `;
        carousel.appendChild(slide);
      });
    } catch (err) {
      console.error('YouTube API error:', err);
    }
  }
  
  loadYouTubeVideos(); // Trigger it
  