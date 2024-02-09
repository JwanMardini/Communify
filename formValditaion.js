document.addEventListener('DOMContentLoaded', function() {
    const myForm = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
    });

    function checkInputs() {
        let isValid = true;
        const nameValue = nameField.value.trim();
        const emailValue = emailField.value.trim();
        const messageValue = messageField.value.trim();

        if(nameValue === "" || emailValue === "" || messageValue === "") {
            alert("Please fill in all fields");
            isValid = false;
        }
        if (!validateEmail(emailValue)) {
            alert("Please enter a valid email address");
            isValid = false;
        }
        if (containsInteger(nameValue)) {
            alert("Name should not contain integers");
            isValid = false;
        }
        if (isValid) {
            alert("Form submitted successfully");
            myForm.reset();
        }
    }

    // Function to check if a string contains an integer
    function containsInteger(str) {
        return /\d/.test(str);
    }

    // Function to validate email from stackoverflow using regular expression
    function validateEmail(email) {
        // Regular expression to check for valid email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
