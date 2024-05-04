let notificationTriggered = false; // Flag to track if the notification has been triggered
let contextMenuListenerActive = true; // Flag to track if the context menu event listener is active

// Add event listener for contextmenu event
document.addEventListener('contextmenu', function(e) {
  e.preventDefault(); // Prevent default context menu
  
  if (contextMenuListenerActive) {
    showNotification(); // Trigger notification on right-click
  }
});

function showNotification() {
  const notification = document.getElementById('notification-toast-rtc');
  if (!notification) return; // Null checker
  
  if (!notificationTriggered) {
    console.log("right click or copy")
    notificationTriggered = true; // Set flag to true after the first trigger
    return; // Exit early without showing the notification on initial trigger
  }
  
  notification.style.display = 'block';
  console.log("test1");

  // Block scrolling
  document.body.style.overflow = 'hidden';

  // Disable context menu listener while notification is displayed
  contextMenuListenerActive = false;

  setTimeout(function() {
    notification.style.display = 'none';
    // Allow scrolling after notification timeout
    document.body.style.overflow = '';

    // Re-enable context menu listener after notification timeout
    contextMenuListenerActive = true;
  }, 3000); // Show notification for 3 seconds
}