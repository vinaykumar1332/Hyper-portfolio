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
    // ---HMTL & CSS---
    'html-css-1':'https://drive.google.com/file/d/1rTauQMkzfm02S3uxyL2_mKDVOrJY2a0d/preview',
    'html-css-2': 'https://drive.google.com/file/d/1sUWeS6hQYb7MTdEFOIWCorBI4rPUIUx_/preview',

    // -- JAVASCRIPT
    'js-1': 'https://drive.google.com/file/d/1rm3G7o2OkW24EffE5yuccc-EEhOmV2Dq/preview',
    'js-2': '',

    // --React JS
    'react-js-1' :'https://drive.google.com/file/d/1ridMuJU1P127v3x8IH0vKNq3sAlhOeOM/preview',
    'react-js-2' :'https://drive.google.com/file/d/1rkM7RIHmB4JHOKOtc3w7FqeKi65-sJQB/preview',
    'react-js-3' :'https://drive.google.com/file/d/1r_Hvmprj-MmhbfOalF31yU34ylXDrk-6/preview',
    'react-js-4' :'https://drive.google.com/file/d/1re6roCDU8rWqdfLCnOtLMxFMntozojlW/preview',


    //--DSA--
    'dsa-1': 'https://drive.google.com/file/d/1rxTjrfVdLTXHNUc6Gc5wpghQVvOXNlxy/preview',
    'dsa-2': 'https://drive.google.com/file/d/1ryvTI0qiEG_UEt-OLjBbvMZPzClbZqmz/preview',
}
