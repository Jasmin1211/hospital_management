const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");

    fetch(`https://hospital-management-with-rest-api.onrender.com/user/usersList/${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("user-container");

            const div = document.createElement("div");
            div.classList.add("user-all", "doc-container", "oc-details-container");

            div.innerHTML = `
                <div id="profile-comtainer" class="doc-container oc-details-container">
                <div class="profile-img">
                    <img src="./Images/profile.png" alt="Doctor Image" 
                 onerror="this.onerror=null; this.src="./Images/profile.png" />
                </div>

                <div class="profile-info">
                    <h1 class="text-dark">${data.username}</h1>
                    <h5 class="text-muted font-semibold">${data.full_name}</h5>
                    <h6 class="text-secondary font-semibold">${data.email}</h6>
                    <div class="d-flex gap-3">
                        <a href="update_profile.html" class="btn btn-dark btn-lg font-bold">
                    Updated Profile
                </a>

                       <!-- Appointment button as a link -->
                <a href="appointment.html" class="btn btn-dark btn-lg font-bold">
                    Appointment Status
                </a>
                            

                    </div>

                </div>
            </div>
            `;

            parent.appendChild(div);
        })
        .catch((error) => {
            console.error('Error loading user details:', error);
        });
};

loadUserDetails();