// Function to check authentication status and update the button
const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const patientId = localStorage.getItem("patient_id");
    const authButton = document.getElementById("auth-button");

    if (token && userId && patientId) {
        // If logged in, show Logout button
        authButton.innerHTML = `
        <a
          onclick="event.preventDefault(); handleLogout();"
          class="nav-link text-white bg-primary px-3 py-2 font-bold rounded-md hover:bg-secondary"
          href="#"
        >
          Logout
        </a>`;
    } else {
        // If logged out, show Login button
        authButton.innerHTML = `
        <a
          href="/login.html" 
          class="nav-link text-white bg-primary px-3 py-2 font-bold rounded-md hover:bg-secondary"
        >
          Login
        </a>`;
    }
};

// Logout function
const handleLogout = () => {
    const token = localStorage.getItem("token");

    // Perform logout API call
    fetch("https://hospital-management-with-rest-api.onrender.com/patient/logout/", {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to logout"); // Handle API error
            }
            return res.json();
        })
        .then((data) => {
            console.log("Logout successful:", data);
        })
        .catch((err) => {
            console.error("Error during logout:", err); // Handle network error
        })
        .finally(() => {
            // Clear local storage
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("patient_id");

            // Update button to Login
            checkAuthStatus(); // Call function to switch button

            // Redirect to login page (optional)
            window.location.href = "/index.html"; // Replace with your login page URL
        });
};

// Check authentication status on page load
window.onload = checkAuthStatus;