// Handle Registration
const handleRegistration = (event) => {
    event.preventDefault();

    // Fetch input values
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const terms = document.getElementById("terms").checked;

    // Error Message Container
    const errorContainer = document.getElementById("error");
    errorContainer.innerHTML = "";

    // Validation
    if (!username || !first_name || !last_name || !email || !password || !confirm_password) {
        errorContainer.innerHTML = "All fields are required.";
        return;
    }

    if (!validateEmail(email)) {
        errorContainer.innerHTML = "Invalid email format.";
        return;
    }

    if (!terms) {
        errorContainer.innerHTML = "You must agree to the Terms and Conditions.";
        return;
    }

    // // Registration Successful Message
    // alert("Registration Successful!");

    // Clear Form
    document.getElementById("registrationForm").reset();

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };

    if (password === confirm_password) {
        fetch("https://hospital-management-with-rest-api.onrender.com/patient/register/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(info),
            })
            .then((res) => res.json())
            .then((data) => console.log(data))



    } else {
        errorContainer.innerHTML = "Passwords do not match.";
        return;
    }
    console.log(info);
};

// Get Value from Input Field
const getValue = (id) => {
    return document.getElementById(id).value.trim();
};

// Validate Email Format
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};


const handelLogin = (event) => {
    event.preventDefault();
    const username = getValue('username');
    const password = getValue('password');
    console.log(username, password);

    // Proper condition check
    if (username && password) {
        fetch("https://hospital-management-with-rest-api.onrender.com/patient/login/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json(); // Convert response to JSON
            })
            .then((data) => {
                console.log(data); // Log response data
                // Handle success case here (e.g., redirect to dashboard)

                if (data.token && data.user_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    window.location.href = "index.html";

                }
            })
            .catch((error) => {
                console.error('Error:', error); // Log error message
                alert('Login failed. Please try again.');
            });
    } else {
        alert('Username and Password are required!');
    }
}




// Attach Event Listener
document.getElementById("registrationForm").addEventListener("submit", handleRegistration);