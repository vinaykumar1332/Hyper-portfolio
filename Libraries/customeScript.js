// Event listener for right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Prevent default right-click behavior
    showNotification(); // Show notification
});

// Event listener for copy action
document.addEventListener('copy', function(e) {
    e.preventDefault(); // Prevent default copy behavior
    showNotification(); // Show notification
});

// Function to show notification
function showNotification() {
    const notification = document.getElementById('notification-toast-rtc');
    notification.style.display = 'block'; // Show notification

    // Hide notification after 5 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 5000); // Adjusted timeout to 5 seconds
}



// -------------------------------------
// -----------form_notification-------------
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    simulateFormSubmission();
});

function simulateFormSubmission() {
    // Simulate form submission delay (1.5 seconds)
    setTimeout(function() {
        showNotificationForm();
    }, 500);
}

function showNotificationForm() {
    const notification = document.getElementById('notificationForm');
    notification.style.display = 'block'; // Display the notification
}

const feedbackInput = document.querySelectorAll('input feedback-input')
function closeNotification() {
    const notification = document.getElementById('notificationForm');
    notification.style.display = 'none'; // Hide the notification
    setTimeout(function() { 
        feedbackInput.Value='';
    }, 500);
}
window.scrollTo(0, 0);