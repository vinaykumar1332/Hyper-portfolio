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

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed.');
  
  // Function to check if an element is empty
  function isElementEmpty(element) {
      console.log('Checking if element is empty:', element);
      return element.innerHTML.trim() === '';
  }

  // Function to hide parent divs if their ul elements are empty
  function hideEmptyFooterColumns() {
      // Get the footer element
      const footer = document.getElementById('footer');
      console.log('Footer element:', footer);
      
      if (footer) {
          // Define the specific columns to check
          const columnIds = ['footer-column-1', 'footer-column-2', 'footer-column-3', 'footer-column-4'];

          // Iterate through each column id
          columnIds.forEach(columnId => {
              // Get the column element by id
              const column = document.getElementById(columnId);
              console.log(`Checking column: ${columnId}`, column);
              
              if (column) {
                  // Get the ul element within the column
                  const ul = column.querySelector('ul');
                  console.log('UL element:', ul);
                  
                  // Check if the ul is empty
                  if (ul && isElementEmpty(ul)) {
                      console.log(`UL in ${columnId} is empty. Hiding parent column.`);
                      // Hide the parent div if ul is empty
                      const parentColumn = column.closest('.col-12.col-sm-12.col-md-3');
                      console.log('Parent column to hide:', parentColumn);
                      if (parentColumn) {
                          parentColumn.style.display = 'none';
                          console.log(`Parent column ${parentColumn.id || 'with no ID'} is now hidden.`);
                      } else {
                          console.log('Parent column not found.');
                      }
                  } else {
                      console.log(`UL in ${columnId} is not empty or UL element not found.`);
                  }
              } else {
                  console.log(`Column ${columnId} not found.`);
              }
          });
      } else {
          console.log('Footer element not found.');
      }
  }

  // Run the function
  hideEmptyFooterColumns();
});
