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



  //-----------------------------
  // Start the animation when the page loads
  let rightClickCount = 0;
  let consecutiveRightClicks = 0;
  let blockNotificationCount = 0;
  const maxConsecutiveRightClicks = 5; // Define the maximum number of consecutive right-clicks allowed
  const maxBlockNotificationCount = 5; // Define the maximum number of block notifications allowed
  
  // Function to display notification
  function displayNotification(notificationId, message) {
      document.getElementById(notificationId).innerText = message;
      document.getElementById(notificationId).style.display = 'block';
  }
  
  // Event listener for right-click
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      rightClickCount++;
      consecutiveRightClicks++;
  
      if (rightClickCount > 2) {
          displayNotification("notification1", "Right-clicking is disabled on this website. Please respect the site's content.");
          setTimeout(function() {
              document.getElementById('notification1').style.display = 'none';
          }, 3000); // 3000 milliseconds (3 seconds)
      }
  
      if (consecutiveRightClicks >= maxConsecutiveRightClicks && blockNotificationCount < maxBlockNotificationCount) {
          displayNotification("notification2", "Your IP will be blocked if you continue to attempt right-clicking.");
          blockNotificationCount++;
      } else if (blockNotificationCount >= maxBlockNotificationCount) {
          displayNotification("notification3", "Your IP has been blocked and reported to the admin team. Please be cautious.");
          window.alert("Warning");
          window.location.reload();
          // You can implement further actions here, like IP blocking and reporting
      }
  });
  
  // Event listener for resetting right-click count
  document.addEventListener('mousedown', function(e) {
      if (e.button !== 2) { // Check if it's not a right-click
          rightClickCount = 0;
      }
  });

//  ----------------------------------------

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// ------------------------
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    simulateFormSubmission();
});

function simulateFormSubmission() {
    // Simulate form submission delay (1.5 seconds)
    setTimeout(function() {
        showNotification();
    }, 700);
}

function showNotification() {
    var notification = document.getElementById('notificationForm');
    notification.style.display = 'block'; // Display the notification
}

function closeNotification() {
    var notification = document.getElementById('notificationForm');
    notification.style.display = 'none'; // Hide the notification
    setTimeout(function() {
        window.scrollTo(0, 0); // Scroll to the top of the page
        window.location.reload();
    }, 500);
}
