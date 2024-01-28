document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let valid = true;

        // Function to display error messages
        function showError(input, message) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.innerText = message;

            const parentDiv = input.parentElement;
            parentDiv.appendChild(errorDiv);

            // Highlight the input field with an error
            input.classList.add("error-input");

            valid = false;
        }
        

        // Function to remove error messages
        function removeError(input) {
            const parentDiv = input.parentElement;
            const errorDiv = parentDiv.querySelector(".error-message");

            if (errorDiv) {
                parentDiv.removeChild(errorDiv);
                input.classList.remove("error-input");
            }
        }

        // Validation for each input field
        const validateField = (input, pattern, errorMessage) => {
            if (!pattern.test(input.value)) {
                showError(input, errorMessage);
            } else {
                removeError(input);
            }
        };

        // Validation for Name
        validateField(
            document.getElementById("name"),
            /^[A-Za-z\s]{3,20}$/,
            "Please enter a valid name (3-20 characters, only letters and spaces)."
        );

        // Validation for Email
        validateField(
            document.getElementById("email"),
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address."
        );

        // Validation for Phone
        validateField(
            document.getElementById("phone"),
            /^(\d{3})-?\s?(\d{3})-?\s?(\d{4})$/,
            "Please enter a valid phone number (e.g., 123-456-7890)."
        );

        // Validation for Adults and Children (numeric)
        const validateNumericField = (input, errorMessage) => {
            if (!Number.isInteger(parseInt(input.value))) {
                showError(input, errorMessage);
            } else {
                removeError(input);
            }
        };

        validateNumericField(
            document.getElementById("adult"),
            "Please enter valid numeric values for Adults."
        );

        validateNumericField(
            document.getElementById("child"),
            "Please enter valid numeric values for Children."
        );

        // Validation for Event Date
        const eventDateInput = document.getElementById("event-date");
        const currentDate = new Date();
        const selectedDate = new Date(eventDateInput.value);
        if (selectedDate < currentDate) {
            showError(eventDateInput, "Please select a future date for the event.");
        } else {
            removeError(eventDateInput);
        }

        // Validation for Event Selection
        const eventSelection = document.getElementById("event-selection");
        if (eventSelection.value === "") {
            showError(eventSelection, "Please choose an event from the list.");
        } else {
            removeError(eventSelection);
        }

        // Validation for Additional Message
        const messageInput = document.getElementById("message");
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Please provide additional information.");
        } else {
            removeError(messageInput);
        }

        // Check for empty fields
        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            if (input.required && input.value.trim() === "") {
                showError(input, "This field is required.");
            }
        });

        // Check if there are errors
        if (!valid) {
            // Prevent form submission
            event.preventDefault();
        } else {
            // Form is valid, submit the form
            form.submit();
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from the form
        var visitorName = document.getElementById('name').value;
        var visitorEmail = document.getElementById('email').value;
        var visitorPhone = document.getElementById('phone').value;
        var totalAdults = document.getElementById('adult').value;
        var totalChildren = document.getElementById('child').value;
        var eventDate = document.getElementById('event-date').value;
        var eventPreference = document.getElementById('event-selection').value;
        var accommodation = document.querySelector('input[name="accommodation"]:checked').value;

        // Store values in sessionStorage
        sessionStorage.setItem('visitorName', visitorName);
        sessionStorage.setItem('visitorEmail', visitorEmail);
        sessionStorage.setItem('visitorPhone', visitorPhone);
        sessionStorage.setItem('totalAdults', totalAdults);
        sessionStorage.setItem('totalChildren', totalChildren);
        sessionStorage.setItem('eventDate', eventDate);
        sessionStorage.setItem('eventPreference', eventPreference);
        sessionStorage.setItem('accommodation', accommodation);

        // Redirect to the transaction page
        window.location.href = 'tran.html';
    });
});
