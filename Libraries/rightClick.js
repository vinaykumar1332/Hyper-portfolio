let notificationTriggered = false; // Flag to track if the notification has been triggered

// Debounce function with count
function debounceWithCount(func, delay) {
  let timer;
  let count = 0;
  return function() {
    clearTimeout(timer);
    count++;
    if (count >= 2) {
      func(); // Call the function immediately
      count = 0; // Reset count
    } else {
      timer = setTimeout(function() {
        count = 0; // Reset count if the delay expires
      }, delay);
    }
  };
}

// Initialize debounce functions for contextmenu and copy events
const debouncedShowNotificationContextMenu = debounceWithCount(showNotification, 1000);
const debouncedShowNotificationCopy = debounceWithCount(showNotification, 1000);

// Add event listeners with debounced functions
document.addEventListener('contextmenu', function(e) {
  e.preventDefault(); 
  debouncedShowNotificationContextMenu(); 
});

document.addEventListener('copy', function(e) {
  e.preventDefault(); 
  debouncedShowNotificationCopy(); 
});

function showNotification() {
  const notification = document.getElementById('notification-toast-rtc');
  if (!notification) return; // Null checker
  
  if (!notificationTriggered) {
    notificationTriggered = true; // Set flag to true after the first trigger
    return; // Exit early without showing the notification on initial trigger
  }
  
  notification.style.display = 'block';
  console.log("test1");

  // Block scrolling
  document.body.style.overflow = 'hidden';

  notification.addEventListener('click', function() {
    notification.style.display = 'none';
    // Allow scrolling again when notification is dismissed
    document.body.style.overflow = '';
  });
  
  setTimeout(function() {
    notification.style.display = 'none';
    // Allow scrolling after notification timeout
    document.body.style.overflow = '';
  }, 5000); 
}
