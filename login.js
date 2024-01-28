function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    // Reset any previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';

    // Check if password is at least 8 characters long
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        return false;
    }

    // If all validations pass, form submission proceeds
    return true;
}
function isStrongPassword(password) {
    // Define the regular expression for a strong password
    var strongPasswordPattern = /^(?=.*[@$!%*?&\d])[A-Za-z\d@$!%*?&]{8,}$/;

    // Test the password against the pattern
    return strongPasswordPattern.test(password);
}

function togglePassword() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.querySelector(".eye-icon");

    // Toggle the type attribute
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = "🔒";
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = "👁️";
    }
}


