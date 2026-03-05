
// A) VARIABLE DECLARATIONS
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const togglePassword = document.getElementById('toggle-password');
const icon = togglePassword.querySelector('i');



// B). PASSWORD VISIBILITY TOGGLE SCRIPT
// Toggle occurs here based on initial state (set in HTML): - Input type: password (hidden) - Icon class: fa-eye (open eye, meaning "click to see")
// 
togglePassword.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});



// C). REAL TIME FORM VALIDATION SCRIPT
function getEmailError() {
    // Trim() the email to remove leading/trailing spaces, which can cause false validation errors.
    const value = emailInput.value.trim();
    if (!value) return "Field can't be empty";
    // Regular expression to validate email format. This regex checks for a basic structure of an email address (username@domain)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return "";
}


function getPasswordError() {
    // Value is a built in property that exist specifically on form elements.
    const value = passwordInput.value;
    if (!value) return "Field can't be empty";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
}

function displayError(errorSpan, message) {
    errorSpan.textContent = message;
    errorSpan.style.display = message ? 'block' : 'none';
}

function changeBorderColor(input, hasError) {
    input.classList.toggle('input-error', hasError);
}


function validateField (input, errorspan, getErrorFn){
    const msg = getErrorFn();
    displayError(errorspan, msg);
    changeBorderColor(input, !!msg);
    return msg;
}

emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailError, getEmailError)
});

passwordInput.addEventListener('blur', () => {
    validateField(passwordInput, passwordError, getPasswordError)
});

// D) SUBMIT HANDLER WITH VALIDATION GATE
// This function checks both email and password fields for errors, displays the appropriate messages, and returns true if the form is valid (i.e., no error messages). Gatekeeping the form submission ensures that users cannot submit invalid data, enhancing the overall user experience and data integrity.
function isFormValid() {
    const emailMsg = validateField(emailInput, emailError, getEmailError);
    const passwordMsg = validateField(passwordInput, passwordError, getPasswordError);
    return !emailMsg && !passwordMsg
}
 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isFormValid()) {
        // Simulate form submission (e.g., send data to server)
        alert('Form submitted successfully!');
        form.reset(); // Clear the form after submission
        changeBorderColor(emailInput, false); // Reset border color after submit
        changeBorderColor(passwordInput, false); 
        displayError(emailError, ''); //Hide error spans after submit
        displayError(passwordError, '');
    } 
});













 




