// !Function to check authentication status and update the button
const checkAuthStatus = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const patientId = localStorage.getItem("patient_id");
  const authButton = document.getElementById("auth-button");

  if (token && userId && patientId) {
    //! If logged in, show Logout button
    authButton.innerHTML = `
        <a
          onclick="event.preventDefault(); handleLogout();"
          class="nav-link text-white bg-primary px-3 py-2 font-bold rounded-md hover:bg-secondary"
          href="#"
        >
          Logout
        </a>`;
  } else {
    // !If logged out, show Login button
    authButton.innerHTML = `
        <a
          href="/login.html" 
          class="nav-link text-white bg-primary px-3 py-2 font-bold rounded-md hover:bg-secondary"
        >
          Login
        </a>`;
  }
};

//! Logout function
const handleLogout = () => {
  const token = localStorage.getItem("token");

  // !API call
  fetch(
    "https://hospital-management-with-rest-api.onrender.com/patient/logout/",
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
      }
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to logout");
        1;
      }
      return res.json();
    })
    .then((data) => {
      console.log("Logout successful:", data);
    })
    .catch((err) => {
      console.error("Error during logout:", err);
      1;
    })
    .finally(() => {
      1;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("patient_id");

      1;
      checkAuthStatus();
      1;

      1;
      window.location.href = "/index.html";
      1;
    });
};

window.onload = checkAuthStatus;
