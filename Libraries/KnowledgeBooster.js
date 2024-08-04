function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var icon = document.querySelector('.dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}



function loginSignPage() {
    const container = document.getElementById('loginMainContainer');
    container.classList.remove('hidden');
    container.innerHTML = ''; // Clear previous content

    container.innerHTML = `
        <div class="login-signup-form">
            <span class="close-btn" onclick="closeLoginSignPage()"> <i class="fa-regular fa-circle-xmark"></i></span>
            <div id="formContent" class="form-content">
                ${getLoginForm()}
            </div>
        </div>
    `;
}

function closeLoginSignPage() {
    const container = document.getElementById('loginMainContainer');
    container.classList.add('hidden');
    container.innerHTML = '';
}

function getLoginForm() {
    return `
        <div class="form-header" id="login">
  <h2>Login</h2>
</div>
<form id="login-wrap">
  <label for="loginUsername">Username:</label>
  <input type="text" id="loginUsername" name="loginUsername" aria-label="Username" required>
  <br>
  <label for="loginPassword">Password:</label>
  <input type="password" class="password" id="loginPassword" name="loginPassword" aria-label="Password" required>
  <span class="toggle-password"></span>
  <br>
  <br>
  <input type="submit" value="Login">
</form>
<p>Not a member? <a href="#" onclick="showSignUpForm()">Sign up now</a></p>
    `;
}

function getSignUpForm() {
    return `
       <div class="form-header" id="sign-up">
  <h2>Sign Up</h2>
</div>
<form id="signup-wrap">
  <label for="signUpUsername">Username:</label>
  <input type="text" id="signUpUsername" name="signUpUsername" pattern="[A-Za-z0-9]+" title="Only letters and numbers are allowed" aria-label="Username" required>
  <br>
  <label for="signUpEmail">Email:</label>
  <input type="email" id="signUpEmail" name="signUpEmail" aria-label="Email" required>
  <br>
  <label for="signUpPassword">Password:</label>
  <input type="password" class="password" id="signUpPassword" name="signUpPassword" aria-label="Password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$">
 <span class="toggle-password"></span>
  <br>
  <br>
  <input type="submit" value="Sign Up">
</form>
<p>Already a member? <a href="#" onclick="showLoginForm()">Login now</a></p>
    `;
}

function showSignUpForm() {
    const formContent = document.getElementById('formContent');
    formContent.innerHTML = getSignUpForm();
}

function showLoginForm() {
    const formContent = document.getElementById('formContent');
    formContent.innerHTML = getLoginForm();
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.nav-login-btn');
    const loginSection = document.querySelector('.loginSection');
    let clicked = false;
  
    loginBtn.addEventListener('click', () => {
      if (!clicked) {
        loginSection.style.display = 'block';
        clicked = true;
      }
    });
  });
  
  
  function openPDF(pdf) {
    document.getElementById('pdfIframe').src = pdf;
}

document.addEventListener("DOMContentLoaded", function() {
    const lazyLoadImages = document.querySelectorAll(".lazy-load");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                console.log(`Loading image: ${image.dataset.src}`);  // Debugging line
                image.src = image.dataset.src;
                image.classList.remove("lazy-load");
                observer.unobserve(image);
            }
        });
    });

    lazyLoadImages.forEach(image => {
        imageObserver.observe(image);
    });
    
});
// ------filter functionality
document.addEventListener("DOMContentLoaded", function() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.addEventListener('change', filterCards);

    function filterCards() {
        const selectedCategory = filterOptions.value;
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});


//--disbale right click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});