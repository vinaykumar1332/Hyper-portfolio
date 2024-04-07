
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
          setTimeout(function() {
            window.location.href = 'ip_blocking.html'; // Redirect to the specified page
            setTimeout(function() {
                history.replaceState()
                window.history.replaceState({}, document.title, window.location.pathname); // Clear browser history
            }, 50); // Execute after redirect to ensure it's not blocked by browser security
        }, 3000); // Redirect after 3 seconds
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
    }, 500);
}

function showNotification() {
    var notification = document.getElementById('notificationForm');
    notification.style.display = 'block'; // Display the notification
}

const feedbackInput = document.querySelectorAll('input feedback-input')
function closeNotification() {
    var notification = document.getElementById('notificationForm');
    notification.style.display = 'none'; // Hide the notification
    setTimeout(function() { 
        feedbackInput.Value='';
    }, 500);
}
window.scrollTo(0, 0);
