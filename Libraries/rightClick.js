let notificationTriggered = false; // Flag to track if the notification has been triggered
let contextMenuListenerActive = true; // Flag to track if the context menu event listener is active

// Debounce function
function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

// Initialize debounce function for contextmenu event
const debouncedShowNotificationContextMenu = debounce(showNotification, 1000);

// Add event listener with debounced function for contextmenu event
document.addEventListener('contextmenu', function(e) {
  if (contextMenuListenerActive) {
    e.preventDefault(); 
    debouncedShowNotificationContextMenu(); 
  }
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

  // Disable context menu listener while notification is displayed
  contextMenuListenerActive = false;

  notification.addEventListener('click', function() {
    notification.style.display = 'none';
    // Allow scrolling again when notification is dismissed
    document.body.style.overflow = '';

    // Re-enable context menu listener after notification is dismissed
    contextMenuListenerActive = true;
  });
  
  setTimeout(function() {
    notification.style.display = 'none';
    // Allow scrolling after notification timeout
    document.body.style.overflow = '';

    // Re-enable context menu listener after notification timeout
    contextMenuListenerActive = true;
  }, 5000); 
}
