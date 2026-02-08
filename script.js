// A). PASSWORD VISIBILITY TOGGLE SCRIPT
// GENERAL NOTES:
// This script provides functionality to toggle the visibility of a password input field.
// It includes multiple approaches to achieve this, demonstrating different methods of DOM manipulation and state management.
// The code is structured to allow easy switching between different approaches for educational purposes.
// Each approach is commented out, and only one is active at a time.
// The first three approaches uses the addEventListener method to handle click events on the toggle button.
// The last approach uses the onclick property to handle click events on the toggle button.


// NOTES FOR APPROACH 1
//  ---- Approach using getAttribute/setAttribute and innerHTML ----


// NOTES ON GETATTRIBUTE, SETATTRIBUTE, DIRECT PROPERTY AND INNERHTML (DOM Manipulation)
// Note: Using getAttribute/setAttribute is less common for standard attributes like 'type'.
// Direct property access (e.g., passwordInput.type) is more typical and efficient.
// However, getAttribute/setAttribute is shown here for educational purposes.
// Also, innerHTML is used to change the icon for simplicity, though manipulating classList is often preferred for performance and security.
// This approach is straightforward and easy to understand for beginners.
// togglepassword and passwordinput are selected using getElementById method and are Js objects cus they hold DOM element objects.

// NOTES ON APPROACH 1 LOGIC AND FLOW:
//1. Event listener on the toggle button
//2. Decision made through input field. Using ternary operator to switch between 'password' and 'text' types thru the input field's type attribute
// 3. Set the new type attribute value using setAttribute method (or direct property access)
// 4. Change the button icon based on the current type of the input field by using innerHTML to update/modify the icon's class. Decision made using ternary operator.


// APPROACH 1 CODE COMPACTED:
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    // passwordInput.setAttribute('type', type);
    passwordInput.type = type;   
    this.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';   
});





// NOTES FOR APPROACH 2
// ---- Alternative approach using dataset attribute and arrow function ----

// NOTES ON HTML DATA ATTRIBUTE AND JS DATASET ATTRIBUTE USAGE:
// Html data attributes which are accessed via the dataset property in JavaScript provide a way to store custom data on HTML elements.
// Data attributes are useful for storing extra information on standard HTML elements without using non-standard attributes or extra properties on DOM objects. for example, you can define custom data attributes like data-id, data-name,data-shown (prefixed with 'data-') etc.
// Four things to note about dataset attributes:
// 1. Dataset attributes are always strings. Even if you set a number or boolean, it will be converted to a string.
// 2. You can access dataset attributes using camelCase in JavaScript. For example, data-user-id becomes dataset.userId.
// 3. Dataset attributes are useful for storing state information directly on HTML elements without affecting their standard attributes or properties.
// 4. They always appear in the DOM as data-* attributes, but in JavaScript, you access them via the dataset property without the 'data-' prefix.




// NOTES ON APPROACH 2 lOGIC AND FLOW (without code comments):
// In this approach, we do not have the prefix 'data-' in the html markup, but we are still using the dataset property in JavaScript to manage a custom attribute named 'shown'(used to track whether the password is currently shown or hidden.)
// Shown here is a custom data. we just made it up for this purpose. It could be named anything.
//  So if I have understood the first step clearly.           passInput here is the html element. The element           passInput has no data- attribute on it(in the html doc). Instead the      
// The data- attribute will be set later on in the code using Javascript.        
// When Js reads the first line "const shown =              passInput.dataset.shown === 'true'", it checks the properties in a live object which it created (DOM Object)
// It checks if the value of the property "passInput.dataset.shown" exists and also to confirm  if the value of the "passInput.dataset.shown" is  actaully the string 'true' as it was assigned. But       
// when Js realizes there is not even a data- attribute in the html passInput element to read, it then reads the passInput.dataset.shown as undefined (meaning this does not even exist).
// If the data- attribute did exist in the html passInput element, passInput.dataset.shown would have been confirmed to  be 'true' because yes it does exist. 
// But since it does not exist, and Js reads it as undefined, then the strict equality check (===) between undefined and 'true' results to false.
//  Thats how we get "const shown = passInput.dataset.shown === 'true' to become undefined === 'false'.... which is false.
// Next, we move to the second line "passInput.dataset.shown = !shown;". Here, since shown is false, !shown becomes true. It is in this second line that Js sets the data- attribute on the html passInput element to 'true' (as a string) because dataset attributes are always strings.
// Next, we move to the third line "passInput.type = shown ? 'password' : 'text';". Here, since shown is false, the ternary operator evaluates to 'text'.
// So now Js sets the type attribute of the passInput element to 'text', making the password visible.
// Finally, we move to the fourth line where we update the icon based on the current state of shown. Since shown is false, we set the icon to 'fa-eye-slash' indicating that the password is currently visible and can be hidden by clicking the button again.
// On subsequent clicks, this process repeats, toggling the visibility of the password and updating the icon accordingly.

//  Before the first click, there is no state at all. There's  no data-shown attribute, no 'false' string, nothing. The   element just has type="password" from the HTML and  that's it.  
//When the user clicks and JavaScript reads: const shown = passInput.dataset.shown === 'true'; it reads passInput.dataset.shown as undefined (because it doesn't exist yet) and compares it to 'true', resulting in false.
// At this point, passInput.dataset.shown is still undefined and has not been set yet. shown is just a variable in memory that holds the value false.
// It just so happens that this false result correctly     represents the current state (password is hidden), even  though no data-shown attribute was ever set. That's the  clever part of the code — it works on the first click    without needing any initialization, because undefined ==='true' naturally gives false, which is the right        starting state.
// Then, in the next line, passInput.dataset.shown = !shown; sets the data-shown attribute to 'true' (as a string) because !false is true. This is when data-shown actually gets created for the first time with the string value "true".
// From this point on, the data-shown attribute exists and will toggle between 'true' and 'false' on each click, allowing the code to correctly track the visibility state of the password field.
// In the third line, passInput.type = shown ? 'password' : 'text'; uses the value of shown (which is false) to set the type to 'text', making the password visible.


// NOTES ON APPROACH 2 lOGIC AND FLOW (with code comments):
// const eyeBtn = document.querySelector('#toggle-password');
// const passInput = document.querySelector('#password');

// Once the separation between shown and passInput.dataset.shown clicks, the whole toggle pattern falls into place.
// eyeBtn.addEventListener('click', () => {
    // Explanation for line 1:
    // On each click, we read the current state from the dataset attribute.
    // If it doesn't exist yet (first click), shown becomes false.
    // So here shown the variable holds false on the first click.
    // So this line reads the value of the data- attribute named shown on the passInput element.
    // const shown = passInput.dataset.shown === 'true';
    // Explanation for line 2:
    // We then invert the state and store it back in the dataset attribute. we invert the state by using !shown so if shown was false, !shown becomes true. It is in this line that the data- attribute is created for the first time and it holds the string 'true'. Note shown still holds false in memory.
    // This line sets the data- attribute named shown on the passInput element to the opposite of the current shown value. that is, if shown is false, it sets data-shown to 'true', and vice versa. it flips the value and stores it back.
    // passInput.dataset.shown = !shown;
    // Explanation for line 3:
    // So here we use the value of shown (which is still false) to set the type attribute. Since shown is false, the ternary operator evaluates to 'text', making the password visible.
    // From this point on, the data- attribute exists and will toggle between 'true' and 'false' on each click, allowing the code to correctly track the visibility state of the password field.
//     passInput.type = shown ? 'password' : 'text';
//     eyeBtn.querySelector('i').className = shown
//         ? 'fa-regular fa-eye'
//         : 'fa-regular fa-eye-slash';
// }); 


// APPROACH 2 CODE COMPACTED:
const eyeBtn = document.querySelector('#toggle-password');
const passInput = document.querySelector('#password');
eyeBtn.addEventListener('click', () => {
    const shown = passInput.dataset.shown === 'true';
    passInput.dataset.shown = !shown;
    passInput.type = shown ? 'password' : 'text';
    eyeBtn.querySelector('i').className = shown
        ? 'fa-regular fa-eye'
        : 'fa-regular fa-eye-slash';
});



// NOTES FOR APPROACH 3
// ---- Alternative approach using classList.toggle and ternary on type ----

// NOTES ON CLASSLIST TOGGLE METHOD:
// The classList.toggle() method is a convenient way to add or remove a class from an element's class list.
// If the specified class is already present on the element, toggle() removes it; if it's not present, toggle() adds it.
// This method is useful for toggling styles or states in response to user interactions, such as showing/hiding elements or changing icons.
// It simplifies the code by eliminating the need for explicit checks to see if a class is present before adding or removing it.


// NOTES ON APPROACH 3 lOGIC AND FLOW:
// 1. Event listener on the toggle button
// 2. Decision made through input field. Using ternary operator to switch between 'password' and 'text' types thru the input field's type attribute
// 3. Set the new type attribute value using direct property access
// 4. Use classList.toggle() to switch between the two icon classes based on the current state of the input field's type attribute. 

// APPROACH 3 CODE COMPACTED:
const pwdBtn = document.querySelector('#toggle-password');
const pwdField = document.querySelector('#password');
const icon = pwdBtn.querySelector('i');

pwdBtn.addEventListener('click', () => {
    pwdField.type = pwdField.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});



// ---- Alternative approach using classList toggle and if/else ----

// NOTES ON APPROACH 4:
// This apppraoch uses the onclick property to handle the click event on the toggle button.
// A boolean variable is used to track the visibility state of the password.
// When the button is clicked, the state is toggled, and the input field's type and button icon are updated accordingly.

// NOTES ON APPROACH 4 lOGIC AND FLOW:
// 1. Select the toggle button and password input field
// 2. Initialize a boolean variable to track visibility state
// 3. Assign an onclick event handler to the toggle button
// 4. This is a little bit similar to approach 2 where we used data attributes and reassigned the value on each click. Here we are using a boolean variable instead of data attributes.
// 5. Also, here it is a little bit simplier because we do not have to read from the DOM each time to get the current state. We just read from the boolean variable in memory which is faster.
// 6. Inside the onclick handler, toggle the boolean variable
// 7. Use an if/else statement to update the input field's type and button icon based on the current state of the boolean variable.


// APPROACH 4 CODE COMPACTED:
const toggleBtn = document.querySelector('.toggle-password');
const passField = document.querySelector('#password');
let isVisible = false;
toggleBtn.onclick = function () {
    isVisible = !isVisible;
    if (isVisible) {
        passField.type = 'text';
        toggleBtn.querySelector('i').classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passField.type = 'password';
        toggleBtn.querySelector('i').classList.replace('fa-eye-slash', 'fa-eye');
    }
};


//   SUMMARY COMPARISON TABLE. These ranks are based on the fit of each approach for this specific login page, considering factors like code simplicity, maintainability, and appropriateness for the scale of the problem (a single form with one password field). The state management column indicates how each approach tracks the visibility state of the password field.

//    Rank: 1        
//   Approach: Approach 3
//   Lines of Code: 5 lines
//   Best Fit For This Login Page?: Yes - Best   
//   fit
//   State Management: Reads from DOM directly 

// Why it's the best fit for this login page:  
//   1. No external state needed - It reads directly from pwdField.type, which is the source of truth. No separate variable or data attribute to keep in sync.
//   2. Most concise - 5 lines of actual logic. Less code = fewer bugs, easier to maintain. 
//   3. Efficient icon handling - classList.toggle() is purpose-built for this exact use case. It adds if missing, removes if present. Two toggles elegantly swap between the two icon classes.
//   4. Caches the icon element - const icon = pwdBtn.querySelector('i') is declared once  outside the handler, so you're not querying the DOM on every click.
// 5. Modern syntax - Uses arrow function and classList API which are standard in modern JS.

// Where Approach 3 wouldn't be ideal:
//   - If you need to know the visibility state  elsewhere in your code (other functions, form submission logic), there's no variable to check.
//   - If the icon classes aren't a simple toggle pair (e.g., you have 3+ states). 

//   ────────────────────────────────────────    
//   Rank: 2
//   Approach: Approach 1
//   Lines of Code: 6 lines
//   Best Fit For This Login Page?: Good fit     
//   State Management: Reads from DOM directly 

//   Pros:
//   - Simple and readable
//   - Uses getElementById which is slightly     
//   faster than querySelector
//   - Uses this keyword which is useful for     
//   learning context binding

//   Cons:
//   - innerHTML replaces the entire element     
//   content on every click. This is:
//     - Less performant (triggers HTML parsing) 
//     - Potential security risk if user input   
//   ever got mixed in (XSS)
//     - Destroys and recreates the <i> element  
//   each time
//   - Mixes getAttribute('type') with direct    
//   property access passwordInput.type -        
//   inconsistent

//   Where Approach 1 is a good fit:
//   - Beginner learning projects where
//   understanding this, getAttribute, and       
//   innerHTML is the goal
//   - Quick prototypes where performance doesn't
//    matter


//   ────────────────────────────────────────    
//   Rank: 3
//   Approach: Approach 4
//   Lines of Code: 10 lines
//   Best Fit For This Login Page?: Decent fit   
//   State Management: External variable
//     (isVisible)

//   Pros:
//   - Explicit state variable isVisible - easy  
//   to understand what's happening
//   - classList.replace() is clean and readable 
//   - State is in memory (faster than reading   
//   DOM)

//   Cons:
//   - State can get out of sync - If something  
//   else changes the input type, isVisible won't
//    know
//   - Uses onclick property - can only have one 
//   handler (overwrites any existing onclick)   
//   - Queries toggleBtn.querySelector('i') on   
//   every click instead of caching it
//   - More verbose than necessary for this      
//   simple task
//   - Uses class selector .toggle-password -    
//   less precise than ID

//   Where Approach 4 is a good fit:
//   - When you need to check isVisible from     
//   other parts of your code
//   - When you have multiple related actions    
//   that depend on visibility state
//   - When teaching if/else vs ternary operators
//   ────────────────────────────────────────   


//   Rank: 4
//   Approach: Approach 2
//   Lines of Code: 8 lines
//   Best Fit For This Login Page?:
//   Over-engineered
//   State Management: Dataset attribute

//   Pros:
//   - State persists in the DOM (survives if JS 
//   variables get garbage collected in complex  
//   apps)
//   - Dataset is inspectable in DevTools        
//   (visible as data-shown="true" on the        
//   element)
//   - Clever initialization trick - undefined   
//   === 'true' naturally gives false

//   Cons:
//   - Unnecessary complexity for a login page - 
//   you're storing state that already exists    
//   (input.type)
//   - Dataset values are always strings, so you 
//   need === 'true' comparisons
//   - Replaces entire className - could
//   accidentally remove other classes on the    
//   icon
//   - Queries the icon element on every click   
//   - The "clever" initialization is actually a 
//   code smell - relies on implicit behavior    

//   Where Approach 2 is a good fit:
//   - Complex widgets where you need to store   
//   multiple custom states on an element        
//   - When other JS code needs to read the      
//   visibility state from the DOM
//   - When you're building a component that     
//   might be serialized/restored
//   - Framework-like patterns where state lives 
//   on elements


// B). REAL TIME FORM VALIDATION SCRIPT
// NOTES:
// The selected elements are resused across multiple approaches for consistency.
// Four different approaches to form validation are provided, each demonstrating a different method of structuring validation logic.
// The approaches include function-based validation, data-driven configuration with event delegation, functional composition, class-based OOP and inline procedural.
// Approach 1 function-based validation is best for clear separation of validation logic and UI updates.
// Approach 2 data-driven configuration is best for scalability and maintainability.
// Approach 3 functional composition is best for reusability and modularity.
// Approach 4 class-based OOP is best for encapsulation and organization.
// Approach 5 inline procedural is best for simplicity and directness.


const form = document.querySelector('form');
const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const submitBtn = document.querySelector('.submit-btn');

// APPROACH 1A: FUNCTION-BASED VALIDATION
// BEST USE CASE: When you want clear separation of validation logic and UI updates, making it easy to maintain and extend.
// Best fits Small-to-medium forms (2-5 fields) in a single-page context where  validation rules are distinct per field and you don't reuse them elsewhere.
// Why it works here: You have 2 fields and one form. Each field gets its own validation function, and showError() handles display. That's exactly enough abstraction to eliminate duplication without adding any unnecessary structure. The blur handlers and submit handler all reuse the same functions. Nothing is repeated, nothing is over-built.
// Why it wouldn't work well: If you had 10+  fields, you'd end up writing 10 separate validateX() functions that all follow the  same pattern — read value, check rules in order, return first error. That repetition is a signal you need a more generic solution.

// function validateEmail() {
//     const value = emailInput.value.trim();
//     if (!value) return "Field can't be empty";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
//     return "";
// }

// function validatePassword() {
//     const value = passwordInput.value;
//     if (!value) return "Field can't be empty";
//     if (value.length < 8) return "Password must be at least 8 characters";
//     return "";
// }

// function showError(errorSpan, message) {
//     if (message) {
//         errorSpan.textContent = message;
//         errorSpan.style.display = 'block';
//     } else {
//         errorSpan.textContent = '';
//         errorSpan.style.display = 'none';
//     }
// }

// emailInput.addEventListener('blur', () => {
//     showError(emailError, validateEmail());
// });

// passwordInput.addEventListener('blur', () => {
//     showError(passwordError, validatePassword());
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const emailMsg = validateEmail();
//     const passwordMsg = validatePassword();

//     showError(emailError, emailMsg);
//     showError(passwordError, passwordMsg);

//     if (!emailMsg && !passwordMsg) {
//         form.submit();
//     }
// });

// APPROACH 1B: FUNCTION-BASED (VARIATION)
// This is a slight variation of Approach 1A. The difference is that it combines
// validation and display into a single helper (checkField), so the blur and
// submit handlers each only need one function call per field instead of two.

// function getEmailError() {
//     const value = emailInput.value.trim();
//     if (!value) return "Field can't be empty";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
//     return "";
// }

// function getPasswordError() {
//     const value = passwordInput.value;
//     if (!value) return "Field can't be empty";
//     if (value.length < 8) return "Password must be at least 8 characters";
//     return "";
// }

// function displayError(errorSpan, message) {
//     errorSpan.textContent = message;
//     errorSpan.style.display = message ? 'block' : 'none';
// }

// function checkField(errorSpan, validatorFn) {
//     const message = validatorFn();
//     displayError(errorSpan, message);
//     return !message;
// }

// emailInput.addEventListener('blur', () => {
//     checkField(emailError, getEmailError);
// });

// passwordInput.addEventListener('blur', () => {
//     checkField(passwordError, getPasswordError);
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const emailValid = checkField(emailError, getEmailError);
//     const passwordValid = checkField(passwordError, getPasswordError);

//     if (emailValid && passwordValid) form.submit();
// });



// APPROACH 2: DATA-DRIVEN CONFIG + EVENT DELEGATION
// BEST USE CASE: When you want scalability and maintainability, allowing you to easily add new fields and validation rules without changing the core logic.
// Best fits  a single large form — registration, checkout, or multi-step wizard— with 6+ fields that all follow the same  validate-and-display pattern. The config becomes a concise, scannable table of all your form rules.
// Why it's decent here: The fields config object with rules arrays is clean, and  validateField() is generic — it works on any field without knowing what it's validating. Event delegation means one blur listener instead of two. The code would scale gracefully if you added more fields. 
// Why it's not the best fit here: With only 2 fields, the config object adds a layer of indirection that doesn't pay off. A reader has to mentally map fields.email.rules[0].test back to "check if empty" — whereas in Approach B, if (!value)return "Field can't be empty" is immediately obvious. The delegation pattern also saves you one listener, which is negligible at this scale.

// const fields = {
//     email: {
//         input: emailInput,
//         errorSpan: emailError,
//         rules: [
//             { test: (v) => !v.trim(), message: "Field can't be empty" },
//             { test: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: "Invalid email format" }
//         ]
//     },
//     password: {
//         input: passwordInput,
//         errorSpan: passwordError,
//         rules: [
//             { test: (v) => !v, message: "Field can't be empty" },
//             { test: (v) => v.length < 8, message: "Password must be at least 8 characters" }
//         ]
//     }
// };

// function validateField(field) {
//     const value = field.input.value;

//     for (const rule of field.rules) {
//         if (rule.test(value)) {
//             field.errorSpan.textContent = rule.message;
//             field.errorSpan.style.display = 'block';
//             return false;
//         }
//     }

//     field.errorSpan.textContent = '';
//     field.errorSpan.style.display = 'none';
//     return true;
// }

// form.addEventListener('blur', (e) => {
//     const field = fields[e.target.id];
//     if (field) validateField(field);
// }, true);

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let isValid = true;

//     for (const key in fields) {
//         if (!validateField(fields[key])) isValid = false;
//     }

//     if (isValid) form.submit();
// });



// APPROACH 3: ALTERNATIVE APPROACH — FUNCTIONAL COMPOSITION
// BEST USE CASE: When you want reusability and modularity, allowing you to create small, reusable validation functions that can be composed together for different fields.
// Best fits  A large application with many forms that share validation rules. Think a SaaS platform where required(), minLength(), and pattern() are defined once in a validators.js utility file and imported across 15 different forms. The composability pays off because you mix and match validators per field without rewriting logic.
// Why it's decent here: The individual validator functions are reusable and composable. The compose() function creates a clear pipeline of validation for each field. It's easy to add new validators or reuse existing ones across different fields. The code itself is clean and correct. The pattern is sound.It's just solving the wrong problem at this scale.
//Why it's not a good fit here: You're defining 4 abstractions (required, minLength, pattern, compose) that are each  used exactly once or twice. The compose() higher-order function returns a function that returns a function — that's two levels of indirection to ultimately check if (!value). The abstractions exist but nothing reuses them.

// const required = (msg) => (value) => !value ? msg : '';

// const minLength = (min, msg) => (value) => value.length < min ? msg : '';

// const pattern = (regex, msg) => (value) => !regex.test(value) ? msg : '';

// const compose = (...validators) => (value) => {
//     for (const validate of validators) {
//         const error = validate(value);
//         if (error) return error;
//     }
//     return '';
// };

// const validateEmailF = compose(
//     required("Field can't be empty"),
//     pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
// );

// const validatePasswordF = compose(
//     required("Field can't be empty"),
//     minLength(8, "Password must be at least 8 characters")
// );

// const displayError = (errorSpan, message) => {
//     errorSpan.textContent = message;
//     errorSpan.style.display = message ? 'block' : 'none';
// };

// const runValidation = (input, errorSpan, validator) => {
//     const message = validator(input.value.trim());
//     displayError(errorSpan, message);
//     return !message;
// };

// emailInput.addEventListener('blur', () => {
//     runValidation(emailInput, emailError, validateEmailF);
// });

// passwordInput.addEventListener('blur', () => {
//     runValidation(passwordInput, passwordError, validatePasswordF);
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const emailValid = runValidation(emailInput, emailError, validateEmailF);
//     const passwordValid = runValidation(passwordInput, passwordError, validatePasswordF);

//     if (emailValid && passwordValid) form.submit();
// });



// APPROACH 4: CLASS-BASED (OOP)
// BEST USE CASE: When you want encapsulation and organization, allowing you to create a reusable FormValidator class that can be instantiated for different forms with their own validation rules.
// Best fits A large codebase with multiple forms that require similar validation logic. You can create a FormValidator class that encapsulates all validation logic and UI updates, and then instantiate it for each form with specific rules. This promotes code reuse and keeps your code organized.
// Why it's decent here: The FormValidator class encapsulates all the validation logic and UI updates, making it reusable and organized. You can easily add new fields and rules by calling addField() without changing the core validation logic. The init() method sets up all event listeners in one place.
// Why it's not a good fit here: For a simple form with only 2 fields, creating a whole class might be overkill. It adds complexity and abstraction that may not be necessary for such a small form. The class structure is more beneficial when you have multiple forms or more complex validation requirements. A class       implies reusable instances. FormValidator has a constructor, addField(),validateField(), and init() — that's the API of a library. But you instantiate it exactly once for one form. The this keyword method dispatch, and object-oriented ceremony add cognitive overhead without any benefit over plain functions. 

// class FormValidator {
//     constructor(formElement) {
//         this.form = formElement;
//         this.fields = [];
//     }

//     addField(input, errorSpan, rules) {
//         this.fields.push({ input, errorSpan, rules });
//     }

//     validateField(field) {
//         for (const rule of field.rules) {
//             if (rule.test(field.input.value)) {
//                 field.errorSpan.textContent = rule.message;
//                 field.errorSpan.style.display = 'block';
//                 return false;
//             }
//         }
//         field.errorSpan.textContent = '';
//         field.errorSpan.style.display = 'none';
//         return true;
//     }

//     init() {
//         this.fields.forEach((field) => {
//             field.input.addEventListener('blur', () => {
//                 this.validateField(field);
//             });
//         });

//         this.form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             let isValid = true;

//             this.fields.forEach((field) => {
//                 if (!this.validateField(field)) isValid = false;
//             });

//             if (isValid) this.form.submit();
//         });
//     }
// }

// const validator = new FormValidator(form);

// validator.addField(emailInput, emailError, [
//     { test: (v) => !v.trim(), message: "Field can't be empty" },
//     { test: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: "Invalid email format" }
// ]);

// validator.addField(passwordInput, passwordError, [
//     { test: (v) => !v, message: "Field can't be empty" },
//     { test: (v) => v.length < 8, message: "Password must be at least 8 characters" }
// ]);

// validator.init();



//APPROACH 5: INLINE PROCEDURAL (NO FUNCTIONS, NO CONFIG)
// NOTE: THIS IS BAD CODE, DO NOT USE THIS IN PRODUCTION. It's just here for demonstration purposes to show how not to structure your code. It mixes validation logic and UI updates directly in the event handlers, making it hard to maintain and extend. It also duplicates code for each field, which is a sign of poor design.
// BEST USE CASE: When you want simplicity and directness, allowing you to write straightforward validation logic directly within event handlers without abstraction.
// honestly, this one doesn't have a good use case beyond a quick throwaway prototype where you just need something working in 30 seconds and don't  care about maintenance.

// emailInput.addEventListener('blur', () => {
//     if (!emailInput.value.trim()) {
//         emailError.textContent = "Field can't be empty";
//         emailError.style.display = 'block';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
//         emailError.textContent = "Invalid email format";
//         emailError.style.display = 'block';
//     } else {
//         emailError.textContent = '';
//         emailError.style.display = 'none';
//     }
// });

// passwordInput.addEventListener('blur', () => {
//     if (!passwordInput.value) {
//         passwordError.textContent = "Field can't be empty";
//         passwordError.style.display = 'block';
//     } else if (passwordInput.value.length < 8) {
//         passwordError.textContent = "Password must be at least 8 characters";
//         passwordError.style.display = 'block';
//     } else {
//         passwordError.textContent = '';
//         passwordError.style.display = 'none';
//     }
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let isValid = true;

//     if (!emailInput.value.trim()) {
//         emailError.textContent = "Field can't be empty";
//         emailError.style.display = 'block';
//         isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
//         emailError.textContent = "Invalid email format";
//         emailError.style.display = 'block';
//         isValid = false;
//     } else {
//         emailError.textContent = '';
//         emailError.style.display = 'none';
//     }

//     if (!passwordInput.value) {
//         passwordError.textContent = "Field can't be empty";
//         passwordError.style.display = 'block';
//         isValid = false;
//     } else if (passwordInput.value.length < 8) {
//         passwordError.textContent = "Password must be at least 8 characters";
//         passwordError.style.display = 'block';
//         isValid = false;
//     } else {
//         passwordError.textContent = '';
//         passwordError.style.display = 'none';
//     }

//     if (isValid) form.submit();
// });

  
//  SUMMARY COMPARISON TABLE: These ranks are based on the fit of each approach for this specific login page, considering factors like code simplicity, maintainability, and appropriateness for the scale of the problem (a single form with two fields). The state management column indicates how each approach structures the validation logic and UI updates.

//   Rank: 1
//   Approach: 1 — Functions
//   Fit for this form: Right amount of
//     abstraction
//   Ideal use case: 1 form, 2-5 fields
//   ────────────────────────────────────────    
//   Rank: 2
//   Approach: 2 — Config + delegation
//   Fit for this form: Slightly over-built      
//   Ideal use case: 1 form, 6+ fields
//   ────────────────────────────────────────    
//   Rank: 3
//   Approach: 3 — Functional composition        
//   Fit for this form: Over-engineered
//   Ideal use case: Many forms sharing
//   validators
//   ────────────────────────────────────────    
//   Rank: 4
//   Approach: 4 — Class-based
//   Fit for this form: Wrong tool
//   Ideal use case: Multiple forms needing a    
//     reusable blueprint
//   ────────────────────────────────────────    
//   Rank: 5
//   Approach: 5 — Inline procedural
//   Fit for this form: Duplicated logic
//   Ideal use case: Throwaway prototypes only









