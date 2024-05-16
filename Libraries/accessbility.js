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
  
// Function to remove the preloader after a minimum duration
function removePreloader() {
  // Set the minimum duration in milliseconds (1.5 seconds = 1500 milliseconds)
  var minDuration = 1000;

  // Get the current timestamp
  var startTime = new Date().getTime();

  // Hide the preloader after the minimum duration
  setTimeout(function() {
      var currentTime = new Date().getTime();
      var elapsedTime = currentTime - startTime;

      // Check if the elapsed time is greater than or equal to the minimum duration
      if (elapsedTime >= minDuration) {
          document.getElementById('preloader').style.display = 'none';
      } else {
          // If the minimum duration hasn't passed yet, wait for the remaining time
          setTimeout(function() {
              document.getElementById('preloader').style.display = 'none';
          }, minDuration - elapsedTime);
      }
  }, minDuration);
}

// Function to hide all preloaders
function hideAllPreloaders() {
  document.querySelectorAll('.loader').forEach(function(preloader) {
      preloader.style.display = 'none';
  });
}

// Function to check network speed
function checkNetwork() {
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.effectiveType === '2g') {
      document.getElementById('network-message').style.display = 'block';
      document.getElementById('please-wait').style.display = 'none'; // Hide "Please wait" message
  } else {
      document.getElementById('please-wait').innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Waiting for network..</span>'; // Change text to "We are setting up"
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


function convertFaqHeadingsToButtons() {
  console.log("Running convertFaqHeadingsToButtons");

  // Select all h2 elements with class 'faq-heading-parent'
  const faqHeadings = document.querySelectorAll('h2.faq-heading-parent');

  if (faqHeadings.length === 0) {
    console.log("No FAQ headings found");
  } else {
    console.log(`Found ${faqHeadings.length} FAQ headings`);
  }

  faqHeadings.forEach(function(faqHeading, index) {
    // Find the parent div with class 'faq-header-section'
    const faqHeaderSection = faqHeading.closest('.faq-header-section');

    if (faqHeaderSection) {
      // Find the child div with class 'faq-button' within each h2
      const faqButtonDiv = faqHeading.querySelector('div.faq-button');

      if (faqButtonDiv) {
        console.log("Found a FAQ button element");

        // Create a new button element
        const newButton = document.createElement('button');
        newButton.classList.add('faq-button'); // Add class for styling

        // Transfer the inner HTML and attributes from the div to the button
        newButton.innerHTML = faqButtonDiv.innerHTML;
        for (let attr of faqButtonDiv.attributes) {
          newButton.setAttribute(attr.name, attr.value);
        }

        // Replace the div with the new button element
        faqButtonDiv.replaceWith(newButton);

        // Start indexing from 1 (common for IDs)
        const newIndex = index + 1;
        const panelId = `accordion-panel-${newIndex}`;
        faqHeading.setAttribute('id', `accordion-heading-${newIndex}`);
        faqHeading.setAttribute('role', 'heading'); // Set role for accessibility
        newButton.setAttribute('aria-controls', panelId); // Link button to panel

        // Find the corresponding panel and set its ID
        const panel = faqHeaderSection.nextElementSibling;
        if (panel && panel.classList.contains('faq-content')) {
          panel.setAttribute('id', panelId);

          // Check if the panel is visible (modify based on your visibility class)
          const isVisible = !panel.hasAttribute('hidden');

          // Add click event to toggle panel visibility
          newButton.addEventListener('click', function() {
            if (panel.hasAttribute('hidden')) {
              panel.removeAttribute('hidden');
              panel.setAttribute('aria-hidden', 'false'); // Announce visibility change
            } else {
              panel.setAttribute('hidden', 'true');
              panel.setAttribute('aria-hidden', 'true'); // Announce visibility change
            }
          });

          // Announce visibility in the initial state
          panel.setAttribute('aria-hidden', isVisible.toString());
        } else {
          console.log("No corresponding FAQ content found");
        }
      } else {
        console.log("No FAQ button element found within FAQ heading");
      }
    } else {
      console.log("No FAQ header section found");
    }
  });
}

// Initial transformation
convertFaqHeadingsToButtons();

// Set up a MutationObserver to watch for new elements being added
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      console.log("DOM mutation observed, running convertFaqHeadingsToButtons");
      convertFaqHeadingsToButtons();
    }
  });
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });

console.log("Script loaded and MutationObserver is set up");
