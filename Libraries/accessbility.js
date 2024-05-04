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

// // ---dots
// // JavaScript code to animate the dots
// let dots = document.getElementById("please-wait");
// let animationInterval;

// function animateDots() {
//   animationInterval = setInterval(function () {
//     switch (dots.innerHTML) {
//       case ".":
//         dots.innerHTML = "..";
//         break;
//       case "..":
//         dots.innerHTML = "...";
//         break;
//       case "...":
//         dots.innerHTML = ".";
//         break;
//       default:
//         dots.innerHTML = ".";
//         break;
//     }
//   }, 450);
// }

// // Start the animation when the page loads
// document.addEventListener('DOMContentLoaded', function() {
//   animateDots();
// });
