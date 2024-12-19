// Fetch and Load Services
const loadServices = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/service/")
        .then((res) => res.json())
        .then((data) => DisplayService(data)) // Display fetched services
        .catch((err) => console.error("Error fetching services:", err)); // Handle fetch errors
};

// Display Services
const DisplayService = (services) => {
    const parent = document.getElementById("service-container");
    parent.innerHTML = ""; // Clear previous services to avoid duplication

    services.forEach((service) => {
        const li = document.createElement("li");
        li.classList.add("slide-visible");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img src="${service.image}" class="card-img-top" loading="lazy" alt="${service.name}">
                </div>
                <div class="card-body p-3">
                    <h3 class="card-title h5 font-bold">${service.name}</h3>
                    <p class="card-text text-justify pb-2">${service.description.slice(0, 150)}</p>
                    <div><a href="${service.link}" class="btn btn-primary font-bold">Go somewhere</a></div>
                </div>
            </div>
        `;
        parent.appendChild(li); // Append each service to the container
    });
};

// Fetch and Load Doctors
const loadDoctors = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorList/")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
            }
            return response.json();
        })
        .then((data) => {
            DisplayDoctors(data.results); // Display fetched doctors
        })
        .catch((error) => {
            console.error("Failed to fetch doctors:", error); // Log errors
        });
};

// Display Doctors
const DisplayDoctors = (doctors) => {
        const parent = document.getElementById("doctors");
        parent.innerHTML = ""; // Clear previous doctors to avoid duplication

        doctors.forEach((doctor) => {
                    const div = document.createElement("div");
                    div.classList.add("col-md-3", "mb-4");

                    div.innerHTML = `
            <div class="card doctor-card shadow-sm">
                <img src="${doctor.image}" class="card-img-top doctor-img" alt="${doctor.full_name}">
                <div class="card-body text-center">
                    <h5 class="card-title">Dr. ${doctor.full_name}</h5>
                    <h6 class="text-muted">${doctor.designation}</h6>
                    <div class="specialization-container">
                        ${doctor.specialization
                            .map((specialty) => `<button class="btn btn-outline-primary btn-sm m-1">${specialty}</button>`)
                            .join("")}
                    </div>
                    <p class="card-text mt-1">${doctor.descriptions ? doctor.descriptions.slice(0, 150) : "No description available"}...</p>
                    <button class="btn btn-primary btn-sm mt-2">Details</button>
                </div>
            </div>
        `;
        parent.appendChild(div); // Append each doctor card to the container
    });
};

// Reusable Function to Load Dropdown Data
const loadDropdownData = (url, dropdownId) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = '<option value="">Select</option>'; // Clear and reset dropdown

            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.slug; // Use slug for option value
                option.innerText = item.name; // Use name for option text
                dropdown.appendChild(option); // Append option to dropdown
            });
        })
        .catch((error) => console.error(`Error fetching data for ${dropdownId}:`, error)); // Handle errors
};

// Load Designations
const loadDesignation = () => {
    loadDropdownData("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorDesignation/", "drop-drag-designation");
};

// Load Specializations
const loadSpecialization = () => {
    loadDropdownData("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorSpecialization/", "drop-drag");
};

// Initialize App
loadDoctors();
loadServices();
loadDesignation();
loadSpecialization();