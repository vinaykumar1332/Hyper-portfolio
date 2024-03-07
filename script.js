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
    sectionId = current.getAttribute("id");

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
  var preloaderGifs = [
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
    "Assets/preloader16.gif",
     "Assets/Preloader.gif",
      // Add more preloader GIFs as needed
  ];

  // Randomly select a preloader GIF
  var randomIndex = Math.floor(Math.random() * preloaderGifs.length);
  var selectedPreloader = preloaderGifs[randomIndex];

  // Set the preloader image source
  var preloaderImage = document.querySelector(".preloader-container img");
  preloaderImage.src = selectedPreloader;

  // Get the effective network connection type
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  // Default delay in milliseconds (1 second)
  var delay = 1000;

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
  var preloader = document.getElementById("preloader");
  preloader.style.display = "none";
}
//--- skill-button automatic click function --//
function clickButtonsWithInfiniteLoop() {
  var skillButtons = document.querySelectorAll('.skills-name');
  var delay = 1000; // 
  var currentIndex = 0;

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
    var section = document.querySelector('.qualification-section');
    var observer = new IntersectionObserver(function(entries, observer) {
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
      var sections = document.querySelectorAll('.animated-section.other-class, .about-container, .services-container, .skills-name');

      var observer = new IntersectionObserver(function(entries, observer) {
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

      var lastScrollTop = 0;

      window.addEventListener('scroll', function() {
        var st = window.scrollY || document.documentElement.scrollTop;
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

//---refresh the page
document.addEventListener('DOMContentLoaded', function () {
  const themeButton = document.getElementById('theme-button');

  themeButton.addEventListener('click', function () {
      // Check if the flag is set in local storage
      const hasRefreshed = localStorage.getItem('hasRefreshed');

      if (!hasRefreshed) {
          // Your code to refresh the page goes here
          location.reload();

          // Set the flag in local storage to indicate that the page has been refreshed
          localStorage.setItem('hasRefreshed', true);
      }
  });
});