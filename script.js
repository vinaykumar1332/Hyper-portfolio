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

// Use the Intersection Observer API to add a class when the section is in view
document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.qualification-section');
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 }); // Adjust the threshold as needed

  observer.observe(section);
});



// Use the Intersection Observer API to add a class when a section is in view
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.animated-section.other-class, .about-container, .services-container, .skills-name');

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(function (section) {
    observer.observe(section);
  });

  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // Scrolling down
      sections.forEach(function (section) {
        if (!section.classList.contains('visible')) {
          observer.observe(section);
        }
      });
    } else {
      // Scrolling up
      sections.forEach(function (section) {
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
// document.getElementById('contactForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent default form submission
//   simulateFormSubmission();
// });

// function simulateFormSubmission() {
//   // Simulate form submission delay (1.5 seconds)
//   setTimeout(function() {
//       showNotificationForm();
//   }, 500);
// }

// function showNotificationForm() {
//   const notification = document.getElementById('notificationForm');
//   notification.style.display = 'block'; // Display the notification
// }

// const feedbackInput = document.querySelectorAll('input feedback-input')
// function closeNotification() {
//   const notification = document.getElementById('notificationForm');
//   document.getElementById("contactForm").reset();
//   notification.style.display = 'none'; // Hide the notification
//   setTimeout(function() { 
//       feedbackInput.Value='';
//   }, 500);
// }
// window.scrollTo(0, 0);



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
  slides[slideIndex - 1].style.display = "block";
  dots1[slideIndex - 1].classList.add("active");

  // Lazy loading images
  let images = slides[slideIndex - 1].querySelectorAll("img");
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

// --------resume download---------------------
let isDownloading = false;

function startDownload() {
  const progressBar = document.getElementById('progressBar');
  const button = document.getElementById('btn-download').querySelector('.button');
  const buttonText = button.querySelector('.button-text');
  const buttonIcon = button.querySelector('.button-icon');

  if (!isDownloading) {
    progressBar.style.display = 'block';
    progressBar.style.width = '0%';

    buttonText.textContent = 'Downloading...';
    buttonIcon.classList.add('fa-spinner', 'spin-button');

    let progressCV = 0;
    const interval = setInterval(function () {
      progressCV += 2.5;
      progressBar.style.width = Math.min(progressCV, 100) + '%';
      progressBar.style.backgroundColor = button.style.backgroundColor;

      if (progressCV >= 100) {
        clearInterval(interval);
        isDownloading = true;
        downloadFile(progressBar, button);
      }
    }, 100);

    progressBar.addEventListener('click', function () {
      if (!isDownloading) {
        clearInterval(interval);
        progressBar.style.width = '0%';
      }
    });
  }
}

function downloadFile(progressBar, button) {
  const link = document.createElement('a');
  link.href = '#';
  link.download = 'NO-FILE.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  progressBar.style.width = '0%';

  button.querySelector('.button-text').textContent = 'Downloaded';
  button.querySelector('.button-icon').className = 'fa-solid fa-check button-icon';

  isDownloading = false;

  // Disable further clicks on the button
  button.onclick = null;
  button.style.cursor = 'not-allowed';
  button.style.pointerEvents = 'none';
}

// -------dynamic update experience
function updateExperience() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const startMonth = 2; // Start month (February)
  const startYear = 2022; // Start year
  const monthsPerYear = 12;

  const totalMonths = (currentYear - startYear) * monthsPerYear + currentMonth - startMonth;
  const years = Math.floor(totalMonths / monthsPerYear);
  const months = totalMonths % monthsPerYear;

  document.getElementById('experienceValue').innerText = years + (months > 0 ? '.' + months : '');
}

// Call the updateExperience function initially
updateExperience();

// Update experience every month
setInterval(updateExperience, 1000 * 60 * 60 * 24 * 30); // Update every 30 days

// -----------form submit data notification

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  showNotificationForm(); // Display notification
  setTimeout(function () {
    document.getElementById('contactForm').submit(); // Submit the form after 2 seconds
  }, 3000);
});

function showNotificationForm() {
  document.getElementById('notification-form-txt').innerText = "Please wait...";
  document.getElementById('notification-form-txt').style.display = 'block';
  setTimeout(function () {
    document.getElementById('notification-form-txt').innerText = "Your data is being processed...";
    setTimeout(function () {
      document.getElementById('notification-form-txt').style.display = 'none';
    }, 1600); // Hide the notification after 1 second
  }, 1400); // Show "Your data is being processed..." after 1 second
}
// --header hide when scroll 
if (window.innerWidth >= 769) { // Only for devices with width 768px or larger
  let lastScrollTop = 0;
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function () {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        header.style.top = "-50px";
      } else {
        header.style.top = "0";
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
  }
}

// ---header scroll for mobile
if (window.innerWidth <= 480) {
  let firstScrollBottom = 0;
  const navMobile = document.getElementById('header');

  if (navMobile) {
    window.addEventListener("scroll", function () {
      let mobCurrentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (mobCurrentScroll < firstScrollBottom) {
        navMobile.style.bottom = "0px";

      } else {
        navMobile.style.bottom = "-40px";

      }
      firstScrollBottom = mobCurrentScroll;
    }, false);
  }
}


function addAccessibilityToButtons(buttonsClass) {
  const buttons = document.getElementsByClassName(buttonsClass);

  function handleClick() {
    console.log('Button clicked');
    // Your code to handle the click event goes here
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleClick);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      console.log('Key pressed');
      event.target.click();
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('keydown', handleKeyPress);
  }
}

// Usage:
addAccessibilityToButtons('nav-btns');
addAccessibilityToButtons('prev');

// -------removing script  file
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var script = document.querySelector('script[src="Libraries/swiper-bundle.min.js"]');
    if (script) {
      script.remove();
      console.log("Script removed successfully.");
    } else {
      console.log("Script not found.");
    }
  }, 6000); // Wait for 6 seconds before executing
});

setTimeout(function () {
  var script = document.querySelector('script[src="Libraries/swiper-bundle.min.js"]');
  if (script) {
    script.outerHTML = "<!--" + script.outerHTML + "-->";
    console.log("Script commented out successfully.");
  } else {
    console.log("Script not found.");
  }
}, 10); // Wait for 3 seconds before commenting out


function removePreloader() {
  // Set the minimum duration in milliseconds (1 second = 1000 milliseconds)
  var minDuration = 1000;

  // Get the current timestamp
  var startTime = new Date().getTime();

  // Hide the preloader after the minimum duration
  setTimeout(function () {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;

    // Check if the elapsed time is greater than or equal to the minimum duration
    if (elapsedTime >= minDuration) {
      var preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    } else {
      // If the minimum duration hasn't passed yet, wait for the remaining time
      setTimeout(function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.style.display = 'none';
        }
      }, minDuration - elapsedTime);
    }
  }, minDuration);
}

// Function to check network speed
function checkNetwork() {
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var networkMessage = document.getElementById('network-message');
  var pleaseWait = document.getElementById('please-wait');
  var slowNetworkMessage = document.getElementById('slow-network');

  if (connection && connection.effectiveType === '2g') {
    if (networkMessage) {
      networkMessage.style.display = 'block';
    }
    if (pleaseWait) {
      pleaseWait.style.display = 'none'; // Hide "Please wait" message
    }
    // Display slow network message after 2 seconds
    setTimeout(function () {
      if (networkMessage && networkMessage.style.display === 'block') {
        if (networkMessage) {
          networkMessage.style.display = 'none';
        }
        if (slowNetworkMessage) {
          slowNetworkMessage.style.display = 'block';
        }
      }
    }, 2000);
  }
}

// Run checkNetwork function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  checkNetwork();
});

// Run removePreloader function when the window is fully loaded
window.addEventListener('load', function () {
  removePreloader();
});
document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  if (tooltip) {
    document.querySelectorAll('#hover-text').forEach(element => {
      element.addEventListener('mouseover', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        if (tooltipText) {
          tooltip.innerText = tooltipText;
          tooltip.style.display = 'block';
        }
      });

      element.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
      });

      element.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
      });
    });
  }

});
document.addEventListener('DOMContentLoaded', () => {
  const footerLink = document.querySelector('.footer-link');
  const chevron = document.querySelector('.fa-circle-chevron-down');
  const sublist = document.querySelector('.services-sub');

  footerLink.addEventListener('click', (event) => {
    event.preventDefault();
    sublist.classList.toggle('show');
    chevron.classList.toggle('rotate');
  });
});

let clickOnce = false;
document.addEventListener('DOMContentLoaded', () => {
  const resetFilterBtn = document.querySelector('.reset-filter-button');
  if (resetFilterBtn) {
    const anchorTag = resetFilterBtn.querySelector('a');
    if (anchorTag) {
      resetFilterBtn.addEventListener('click', (event) => {
        event.preventDefault();
        function resetFilters() {
          const searchButton = document.querySelector('.search-box-button-with-redirect');
          if (searchButton && !clickOnce) {
            searchButton.click();
            clickOnce = true;
          }
          else {
            return;
          }
        }
        resetFilters();
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var popup = document.getElementById("popup");
  var closeButton = document.getElementById("close-button");
  var clickButton = document.getElementById("click-button");
  
  // Retrieve popup status from localStorage
  var popupShown = localStorage.getItem("popupShown") === "true";

  // Function to show the popup
  function showPopup() {
    if (!popupShown) {
      popup.classList.add("show-popup");
      popupShown = true;
      localStorage.setItem("popupShown", "true"); // Save popup state to localStorage
    }
  }

  // Function to hide the popup
  function hidePopup() {
    popup.classList.add("hide-popup");
    setTimeout(() => {
      popup.classList.remove("show-popup");
      popupShown = true; // Keep popup as shown to prevent it from showing again
      localStorage.setItem("popupShown", "true"); // Save state so it doesn't show again
    }, 400); // Match this duration with the CSS transition duration
  }

  // Event listeners
  closeButton.addEventListener("click", hidePopup);
  clickButton.addEventListener("click", showPopup);

  // Improved scroll event listener to prevent duplicate popups
  var scrolledPastTrigger = false;
  window.addEventListener("load", function () {
    window.addEventListener("scroll", function () {
      setTimeout(() => {
        if (window.scrollY > 550 && !scrolledPastTrigger && !popupShown) {
          showPopup();
          scrolledPastTrigger = true; // Set flag to prevent repeated show
        } else if (window.scrollY <= 550) {
          scrolledPastTrigger = false; // Reset flag when user scrolls up again
        }
      }, 3000);
    });
  });
});
// Select all skill elements
const skills = document.querySelectorAll('.skills-name');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
              animatePercentage(entry.target);
            entry.target.classList.add('show-tooltip');
            }, "500");
        } else {
            // Reset tooltip for future scrolling events
            entry.target.classList.remove('show-tooltip');
            entry.target.removeAttribute("data-showing"); // Reset custom attribute for re-triggering
        }
    });
}, { threshold: 0.5 }); // Adjust threshold as needed

// Animate the percentage from 0 to target value
function animatePercentage(element) {
    if (element.getAttribute("data-showing")) return; // Avoid re-triggering if already shown
    element.setAttribute("data-showing", true); // Custom attribute to track animation

    let currentPercentage = 0;
    const targetPercentage = parseInt(element.getAttribute('data-percentage'), 10);
    const increment = targetPercentage / 50; // Adjust speed of counting

    const interval = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage; // Cap at target
            clearInterval(interval);
        }
        element.setAttribute('data-percentage', `${Math.floor(currentPercentage)}%`); // Update tooltip text
    }, 30); // Adjust interval time for smoothness
}

// Observe each skill element
skills.forEach((skill) => {
    observer.observe(skill);
});


