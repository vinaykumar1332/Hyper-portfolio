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
        <form>
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" name="loginUsername" aria-label="Username"><br><br>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="loginPassword" aria-label="Password"><br><br>
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
        <form>
            <label for="signUpUsername">Username:</label>
            <input type="text" id="signUpUsername" name="signUpUsername" aria-label="Username"><br><br>
            <label for="signUpEmail">Email:</label>
            <input type="email" id="signUpEmail" name="signUpEmail" aria-label="Email"><br><br>
            <label for="signUpPassword">Password:</label>
            <input type="password" id="signUpPassword" name="signUpPassword" aria-label="Password"><br><br>
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

