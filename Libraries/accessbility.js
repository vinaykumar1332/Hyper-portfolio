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

// Get all faq-header-section elements
const faqSections = document.querySelectorAll('.faq-header-section');

// Loop through each faq-header-section
faqSections.forEach((section, index) => {
    // Check if the section has already been processed
    if (!section.classList.contains('accordion-initialized')) {
        // Remove any existing div with class 'faq-heading'
        // Create h2 element
        const h2 = document.createElement('h2');
        h2.setAttribute('id', 'accordion-heading-' + (index + 1));
        h2.setAttribute('role', 'heading');
        h2.setAttribute('aria-level', '2');

        // Create button element
        const button = document.createElement('button');
        button.setAttribute('aria-controls', 'accordion-panel-' + (index + 1));
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('role', 'button');
        button.innerHTML = '<div class="faq-heading field-heading">' + section.textContent.trim() + '</div>';

        // Append button to h2
        h2.appendChild(button);

        // Append h2 to faq-header-section
        section.insertBefore(h2, section.firstChild);

        // Add a class to mark the section as processed
        section.classList.add('accordion-initialized');
    }
});



// Function to initialize accordion for a single FAQ section
function initializeAccordionForFAQ(section, index) {
  const h2 = document.createElement('h2');
  const button = document.createElement('button');

  // Set id and aria-controls attributes with dynamic index
  const panelId = 'accordion-panel-' + index;
  h2.setAttribute('id', 'accordion-heading-' + index);
  button.setAttribute('aria-controls', panelId);

  // Other attributes and content
  h2.setAttribute('role', 'heading');
  h2.setAttribute('aria-level', '2');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('role', 'button');
  button.innerHTML = `
      <div class="faq-heading field-heading">${section.querySelector('.faq-heading').innerHTML.trim()}</div>
      <span class="faq-chevron open">
          ${section.querySelector('.faq-chevron').innerHTML}
      </span>
  `;

  // Append button to h2
  h2.appendChild(button);

  // Replace content of section with h2
  section.innerHTML = '';
  section.appendChild(h2);

  // Assign an event listener to the button to toggle visibility of the corresponding panel
  button.addEventListener('click', function() {
      const panel = document.getElementById(panelId);
      if (panel) {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', String(!isExpanded));
          panel.setAttribute('aria-hidden', String(isExpanded));
      }
  });
}

// Function to initialize accordion for all FAQ sections
function initializeAccordionForAllFAQs() {
  const faqSections = document.querySelectorAll('.faq-header-section');
  faqSections.forEach((section, index) => {
      initializeAccordionForFAQ(section, index + 1);
  });
}

// Initialize accordion for existing FAQs
initializeAccordionForAllFAQs();

// Mutation observer to handle dynamically loaded FAQs
const observer = new MutationObserver(function(mutationsList) {
  mutationsList.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('faq-header-section')) {
                  initializeAccordionForFAQ(node, document.querySelectorAll('.faq-header-section').length);
              }
          });
      }
  });
});

// Observe changes in the parent element containing the FAQs
const parentElement = document.querySelector('.faq-search');
if (parentElement) {
  observer.observe(parentElement, { childList: true });
} else {
  console.error('Parent element not found.');
}
