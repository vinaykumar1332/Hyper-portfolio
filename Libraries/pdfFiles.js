// Function to set the PDF URL in the iframe and show the overlay
function openPDF(fileId) {
    const pdfUrl = pdfLinks[fileId];
    const iframe = document.getElementById('pdfIframe');
    const overlay = document.getElementById('pdfOverlay');

    if (pdfUrl && iframe && overlay) {
        console.log('Setting iframe src to:', pdfUrl);
        iframe.src = pdfUrl;
        overlay.style.display = 'flex'; // Show the overlay
    } else {
        console.error('No PDF URL found for ID:', fileId);
    }
}

// Function to close the PDF overlay
function closePDF() {
    const overlay = document.getElementById('pdfOverlay');
    const iframe = document.getElementById('pdfIframe');

    if (overlay && iframe) {
        overlay.style.display = 'none'; // Hide the overlay
        iframe.src = ''; // Clear the iframe source
    }
}
// Google Drive PDF links with correct preview URLs
const pdfLinks = {
    'html-css': 'https://drive.google.com/file/d/1Lu-GPDG-LVOHEELfC8UHRa0HnE2Z7RFv/preview',
    'react': 'https://drive.google.com/file/d/REACT_FILE_ID/preview',
    'angular': 'https://drive.google.com/file/d/ANGULAR_FILE_ID/preview',
    // Add more links as needed
};

const iframe = document.getElementById('myIframe');
const iframeContentWindow = iframe.contentWindow;

// Assuming you've identified the pop-out button's class or ID
const popoutButton = iframeContentWindow.document.querySelector('.popout-button');
if (popoutButton) {
    popoutButton.style.display = 'none'; // Or remove it entirely
}

