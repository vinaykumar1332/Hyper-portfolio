const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// remove menu mobile
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// qualifi
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });

    tab.classList.add("qualification-active");
  });
});

// services box
const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close");

let box = function (boxClick) {
  boxViews[boxClick].classList.add("active-box");
};

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", () => {
    box(i);
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove("active-box");
    });
  });
});

//scroll section active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
   const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// change bg header
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

//dark light mode------------------
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//swiper
let swiperPortfolio = new Swiper(".portfolio-container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let swiperTestimonial = new Swiper(".testimonial-container", {
  cssMode: true,
  loop: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

//----preloader-----
document.addEventListener("DOMContentLoaded", function () {
  // Array of preloader GIFs in the "Assets" folder
  const preloaderGifs = [
      "Assets/preloader1.gif",
      "Assets/preloader2.gif",
      "Assets/preloader3.gif",
      "Assets/preloader4.gif",
      "Assets/preloader5.gif",
      "Assets/preloader6.gif",
      "Assets/preloader7.gif",
     "Assets/preloader8.gif",
     "Assets/preloader9.gif",
     "Assets/preloader10.gif",
    "Assets/preloader11.gif",
    "Assets/preloader12.gif",
    "Assets/preloader12.gif",
    "Assets/preloader13.gif",
    "Assets/preloader14.gif",
    "Assets/preloader15.gif",
    "Assets/preloader16.gif",
    "Assets/preloader17.gif",
     "Assets/Preloader.gif",
      // Add more preloader GIFs as needed
  ];

  // Randomly select a preloader GIF
  const randomIndex = Math.floor(Math.random() * preloaderGifs.length);
  const selectedPreloader = preloaderGifs[randomIndex];

  // Set the preloader image source
  const preloaderImage = document.querySelector(".preloader-container img");
  preloaderImage.src = selectedPreloader;

  // Get the effective network connection type
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  // Default delay in milliseconds (1 second)
  let delay = 1000;

  // Adjust the delay based on the network speed
  if (connection) {
      switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
              delay = 5000; // 5 seconds for slow connections
              break;
          case '3g':
              delay = 3000; // 3 seconds for 3G connections
              break;
          case '4g':
              delay = 2000; // 2 seconds for 4G connections
              break;
          default:
              // Use the default delay for unknown or faster connections
              break;
      }
  }

  // Simulate the adjusted delay
  setTimeout(function () {
      // Hide the preloader after the adjusted delay
      hidePreloader();
  }, delay);
});

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
}
//--- skill-button automatic click function --//
function clickButtonsWithInfiniteLoop() {
  const skillButtons = document.querySelectorAll('.skills-name');
  const delay = 1000; // 
  let currentIndex = 0;

  function clickButtonWithColorChange() {
    skillButtons[currentIndex].style.backgroundColor = '#713abe';
    setTimeout(function () {
      skillButtons[currentIndex].click();
      skillButtons[currentIndex].style.backgroundColor = ''; // Reset to default
      currentIndex = (currentIndex + 1) % skillButtons.length;
      clickButtonWithColorChange();
    }, delay);
  }
  clickButtonWithColorChange();
}
clickButtonsWithInfiniteLoop();






   // Use the Intersection Observer API to add a class when the section is in view
   document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.qualification-section');
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 }); // Adjust the threshold as needed

    observer.observe(section);
  });

 

    // Use the Intersection Observer API to add a class when a section is in view
    document.addEventListener('DOMContentLoaded', function() {
      const sections = document.querySelectorAll('.animated-section.other-class, .about-container, .services-container, .skills-name');

      const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(function(section) {
        observer.observe(section);
      });

      let lastScrollTop = 0;

      window.addEventListener('scroll', function() {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // Scrolling down
          sections.forEach(function(section) {
            if (!section.classList.contains('visible')) {
              observer.observe(section);
            }
          });
        } else {
          // Scrolling up
          sections.forEach(function(section) {
            if (section.classList.contains('visible')) {
              observer.unobserve(section);
            }
          });
        }
        lastScrollTop = st <= 0 ? 0 : st;
      });
    });


//name text animation js 
/* type js style  */
// type js plugin
document.addEventListener('DOMContentLoaded', function () {
  let typeJsText = document.querySelector(".typeJsText");
  let textArray = typeJsText.dataset.typetext.split("");
  let counter = -1;

  function typeJs() {
    if (counter < typeJsText.dataset.typetext.length) {
      counter++;
      typeJsText.innerHTML += typeJsText.dataset.typetext.charAt(counter);
      textArray = typeJsText.dataset.typetext.split("");
    }
  }

  setTimeout(() => {
    setInterval(() => {
      typeJs();
    }, 140);
  }, 4000); // Adjust the delay (in milliseconds) as needed
});

//-sun-moon
document.addEventListener('DOMContentLoaded', function () {
  const themeButton = document.getElementById('theme-button');
  const body = document.body;

  themeButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('dark-mode');
    console.log("test1");

    // Toggle the moon icon when switching themes
    themeButton.classList.toggle('fa-moon');
    themeButton.classList.toggle('fa-sun');
  });
});

  // Use 'load' event instead of 'DOMContentLoaded' for broader compatibility
  window.addEventListener('load', function () {
    const changeThemeIcon = document.querySelector('.fa-regular.change-theme');

    // Function to check and refresh the page if needed
    function checkAndRefresh() {
        // Check if the 'change-theme' icon has either 'fa-moon' or 'fa-sun'
        const hasMoonOrSunIcon = changeThemeIcon.classList.contains('fa-moon') || changeThemeIcon.classList.contains('fa-sun');

        if (!hasMoonOrSunIcon) {
            // Display custom alert when refreshing
            document.getElementById('custom-alert').style.display = 'block';

            // Refresh the page after a delay (adjust as needed)
            setTimeout(function () {
                location.reload();
            }, 3000); // Refresh after 3 seconds
        }
    }

    // Check and refresh periodically (adjust the interval as needed)
    setInterval(checkAndRefresh, 1000); // Check every second
});

 
// JavaScript code to animate the dots
let dots = document.getElementById("dots");
let animationInterval;

function animateDots() {
  animationInterval = setInterval(function () {
    switch (dots.innerHTML) {
      case ".":
        dots.innerHTML = "..";
        break;
      case "..":
        dots.innerHTML = "...";
        break;
      case "...":
        dots.innerHTML = ".";
        break;
      default:
        dots.innerHTML = ".";
        break;
    }
  }, 450);
}

// Start the animation when the page loads
window.onload = function () {
  animateDots();
};

// --------------------------------------
window.addEventListener('DOMContentLoaded', (event) => {
  // Check if the URL contains a hash
  if (window.location.hash) {
    // Get the element with the ID matching the hash
    const targetElement = document.querySelector(window.location.hash);
    // If the element exists, scroll to it
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});




caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))))

document.addEventListener("DOMContentLoaded", function () {
  const sunIcon = document.getElementById("theme-button");

  // Function to rotate the icon
  function rotateIcon() {
    sunIcon.classList.add("rotate");
    setTimeout(function () {
      sunIcon.style.transform = "rotate(360deg)";
    }, 100);

    setTimeout(function () {
      sunIcon.style.transform = "rotate(720deg)";
    }, 600);
  }

  // Add click event listener to rotate the icon when clicked
  sunIcon.addEventListener("click", rotateIcon);
});


//-------check the theme icon 
document.addEventListener("DOMContentLoaded", function () {
  const targetNode = document.getElementById('theme-button');
  const config = { attributes: true, attributeFilter: ['class'] };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        if (!targetNode.classList.contains('fa-sun') && !targetNode.classList.contains('fa-moon')) {
          targetNode.classList.add('fa-sun');
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  // Set initial aria-pressed attribute
  targetNode.setAttribute('aria-pressed', 'false');

  // Toggle aria-pressed attribute on click
  targetNode.addEventListener('click', function () {
   const isPressed = targetNode.getAttribute('aria-pressed') === 'true';
    targetNode.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
  });
});

// -----------form_notification-------------
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  simulateFormSubmission();
});

function simulateFormSubmission() {
  // Simulate form submission delay (1.5 seconds)
  setTimeout(function() {
      showNotificationForm();
  }, 500);
}

function showNotificationForm() {
  const notification = document.getElementById('notificationForm');
  notification.style.display = 'block'; // Display the notification
}

const feedbackInput = document.querySelectorAll('input feedback-input')
function closeNotification() {
  const notification = document.getElementById('notificationForm');
  document.getElementById("contactForm").reset();
  notification.style.display = 'none'; // Hide the notification
  setTimeout(function() { 
      feedbackInput.Value='';
  }, 500);
}
window.scrollTo(0, 0);



// -----------slide -carousel------
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots1 = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }    
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots1.length; i++) {
        dots1[i].classList.remove("active");
    }
    slides[slideIndex-1].style.display = "block";  
    dots1[slideIndex-1].classList.add("active");
    
    // Lazy loading images
    let images = slides[slideIndex-1].querySelectorAll("img");
    images.forEach(image => {
        if (image.hasAttribute("data-src")) {
            // Create a new MutationObserver
            let observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'src' && image.src !== image.getAttribute("data-src")) {
                        // If the src attribute has been updated and not equal to data-src, remove data-src
                        image.removeAttribute("data-src");
                        observer.disconnect(); // Disconnect the observer once the attribute is changed
                    }
                });
            });
            
            // Configure and start the observer
            observer.observe(image, { attributes: true });
            
            // Set the src attribute to start loading the image
            image.src = image.getAttribute("data-src");
        }
    });
}

// ------auto-right-click
function autoClick() {
  const element = document.getElementById('auto-click');
  element.click();
}
autoClick();
setInterval(autoClick, 6000);


 // --------resume download---------------------
 let isDownloading = false; // Flag to track download status

function startDownload() {
  const progressBar = document.getElementById('progressBar');
  const button = document.getElementById('btn-download').querySelector('.button');

  // Show progress bar
  progressBar.style.display = 'block';

  // Reset progress bar
  progressBar.style.width = '0%';

  // Animate progress
  let progressCV = 0; // Use let instead of const
  const interval = setInterval(function() {
      progressCV += 2.5; // Increment progress by 2.5
      progressBar.style.width = Math.min(progressCV, 100) + '%'; // Corrected progressCV
      progressBar.style.backgroundColor = button.style.backgroundColor; // Match button color

      if (progressCV >= 100) {
          clearInterval(interval);
          // Initiate download after animation completes
          if (!isDownloading) {
              isDownloading = true;
              downloadFile(progressBar);
          }
      }
  }, 100); // Adjust the interval (slower animation)
}

function downloadFile(progressBar) {
  const link = document.createElement('a');
  link.href = '/Assets/Resume1.pdf';
  link.download = 'Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Reset progress bar after download completes
  link.addEventListener('load', function() {
    progressBar.style.width = '0%';
    isDownloading = false;
  });
}
