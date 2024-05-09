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

// // ---dots
// // JavaScript code to animate the dots
// let dots = document.getElementById("please-wait");
// let animationInterval;

// function animateDots() {
//   animationInterval = setInterval(function () {
//     switch (dots.innerHTML) {
//       case ".":
//         dots.innerHTML = "..";
//         break;
//       case "..":
//         dots.innerHTML = "...";
//         break;
//       case "...":
//         dots.innerHTML = ".";
//         break;
//       default:
//         dots.innerHTML = ".";
//         break;
//     }
//   }, 450);
// }

// // Start the animation when the page loads
// document.addEventListener('DOMContentLoaded', function() {
//   animateDots();
// });

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      var script = document.querySelector('script[src="Libraries/swiper-bundle.min.js"]');
      if (script) {
          script.remove();
          console.log("Script removed successfully.");
      } else {
          console.log("Script not found.");
      }
  }, 6000); // Wait for 6 seconds before executing
});

setTimeout(function() {
  var script = document.querySelector('script[src="Libraries/swiper-bundle.min.js"]');
  if (script) {
      script.outerHTML = "<!--" + script.outerHTML + "-->";
      console.log("Script commented out successfully.");
  } else {
      console.log("Script not found.");
  }
},10); // Wait for 3 seconds before commenting out


  // Function to hide all preloaders
  function hideAllPreloaders() {
    document.querySelectorAll('.loader').forEach(function(preloader) {
      preloader.style.display = 'none';
    });
  }

  // Function to show a random preloader
  function showRandomPreloader() {
    hideAllPreloaders();
    const preloaders = document.querySelectorAll('.loader');
    const randomIndex = Math.floor(Math.random() * preloaders.length);
    preloaders[randomIndex].style.display = 'block';
  }

  // Function to remove the preloader and show the content
  function removePreloader() {
    document.getElementById('preloader').style.display = 'none';
  }

  // Function to check network speed
  function checkNetwork() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.effectiveType === '2g') {
      document.getElementById('network-message').style.display = 'block';
      document.getElementById('please-wait').style.display = 'none'; // Hide "Please wait" message
    } else {
      document.getElementById('please-wait').innerHTML = "<span>We are setting up..</span>"; // Change text to "We are setting up"
      showRandomPreloader(); // Show a random preloader
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
