// Function to add months to the current date
function addMonths(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
}

// Function to update about info
function updateAboutInfo() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const monthsLeftToAdd = 26; // Example: You can change this value
  const newDate = addMonths(monthsLeftToAdd);
  const newYear = newDate.getFullYear();
  const newMonth = newDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

  let totalExperience = newYear - currentYear;
  const monthsExperience = newMonth - currentMonth;

  // If new month is less than current month, it means we have crossed another year
  if (newMonth < currentMonth) {
      totalExperience -= 1; // Subtract 1 from totalExperience because we crossed another year
      totalExperience += (12 + monthsExperience) / 12; // Add the remaining months as a fraction of a year
  } else {
      totalExperience += monthsExperience / 12; // Add the months as a fraction of a year
  }

  const yearsExperienceElement = document.querySelector("#yearsExperiencePlaceholder");
  yearsExperienceElement.innerText = totalExperience.toFixed(1) + "+"; // Update HTML with total experience, rounded to one decimal place
}

// Function to observe changes and update about info
function observeAndRefresh() {
  const observer = new MutationObserver(updateAboutInfo);
  const targetNode = document.querySelector("#aboutInfo");
  const config = { subtree: true, childList: true };
  if (targetNode) { // Check if the targetNode exists
      observer.observe(targetNode, config);
  }
}

// Call updateAboutInfo() immediately
updateAboutInfo();

// Update every 5 seconds and observe changes
setInterval(updateAboutInfo, 5000);

// Start observing changes
observeAndRefresh();


// ------------please wait animation dots ---------------------
// JavaScript code to animate the dots
let dots = document.getElementById("dots");
let animationInterval;

function animateDots() {
    animationInterval = setInterval(function() {
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
window.onload = function() {
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
