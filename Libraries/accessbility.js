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





function createFAQStructure() {
  var faqHeadings = document.querySelectorAll('.faq-heading');

  faqHeadings.forEach(function(heading, index) {
      // Create the outer <h2> element
      var outerH2 = document.createElement('h2');
      outerH2.setAttribute('id', 'accordion-heading-' + (index + 1)); // Set unique id
      outerH2.setAttribute('role', 'heading');
      outerH2.setAttribute('aria-level', '2');

      // Create the <button> element
      var button = document.createElement('button');
      button.setAttribute('aria-controls', 'accordion-panel-' + (index + 1));
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('role', 'button');

      // Append the <button> element to the outer <h2>
      outerH2.appendChild(button);

      // Create the inner <div> with the class "faq-heading field-heading"
      var innerDiv = document.createElement('div');
      innerDiv.setAttribute('class', 'faq-heading field-heading');

      // Clone the content of faq-heading
      var clonedContent = heading.cloneNode(true);

      // Append the cloned content to the inner <div>
      innerDiv.appendChild(clonedContent);

      // Append the inner <div> to the <button>
      button.appendChild(innerDiv);

      // Append the outer <h2> to the document body or any other desired parent element
      document.body.appendChild(outerH2);
  });
}

// Call the function initially
document.addEventListener('DOMContentLoaded', function() {
  createFAQStructure();
});

// -- new working code




//
function wrapFAQsWithH2AndButton() {
  var faqDivs = document.querySelectorAll('.faq-heading:not(.processed)');
  faqDivs.forEach(function(div, index) {
    if (!div.parentNode || div.parentNode.tagName.toLowerCase() === 'h2') return;

    // Mark this div as processed to avoid reprocessing
    div.classList.add('processed');

    var clonedDiv = div.cloneNode(true);
    var h2Faq = document.createElement('h2');
    h2Faq.setAttribute('id', 'accordion-heading-' + (index + 1));
    h2Faq.setAttribute('role', 'heading');

    var buttonFaq = document.createElement('button');
    buttonFaq.setAttribute('aria-controls', 'accordion-panel-' + (index + 1));

    // Append the cloned div inside the button and the button inside the h2
    buttonFaq.appendChild(clonedDiv);
    h2Faq.appendChild(buttonFaq);

    // Replace the original div with the new h2 element
    div.parentNode.replaceChild(h2Faq, div);
  });
}

setTimeout(wrapFAQsWithH2AndButton, 1000); // Delay execution to ensure DOM is loaded

var observerFaq = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      wrapFAQsWithH2AndButton();
    }
  });
});

observerFaq.observe(document.body, { childList: true, subtree: true });

