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
    }, 3000);
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
