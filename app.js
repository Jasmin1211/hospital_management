// Declare debounce timer globally
let debounceTimer;

// Fetch and Load Services
const loadServices = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/service/")
        .then((res) => res.json())
        .then((data) => DisplayService(data))
        .catch((err) => console.error("Error fetching services:", err));
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
                    <p class="card-text text-justify pb-2">${service.description.slice(0, 150)}...</p>
                    <div><a href="${service.link}" class="btn btn-primary font-bold">Details</a></div>
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
};

// Fetch and Load Doctors
const loadDoctors = (search = "", filters = {}) => {
    console.log(search);
    const { designation, specialization } = filters;

    let apiUrl = `https://hospital-management-with-rest-api.onrender.com/doctor/DoctorList/?search=${search}`;
    if (designation) apiUrl += `&designation=${designation}`;
    if (specialization) apiUrl += `&specialization=${specialization}`;

    document.getElementById("loading").style.display = "block";
    document.getElementById("no-results").style.display = "none";

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById("loading").style.display = "none";
            if (data.results.length === 0) {
                document.getElementById("no-results").style.display = "block";
            } else {
                DisplayDoctors(data.results);
            }
        })
        .catch((error) => {
            document.getElementById("loading").style.display = "none";
            console.error("Failed to fetch doctors:", error);
        });
};

// Debounced Search Handler
const handleDebouncedSearch = () => {
    clearTimeout(debounceTimer); // Clear previous timer
    debounceTimer = setTimeout(() => {
        const searchValue = document.getElementById("search").value;
        handleSearch(searchValue);
    }, 300); // Wait 300ms after the user stops typing
};

// Main Search Handler
const handleSearch = (searchValue) => {
    const designation = document.getElementById("drop-drag-designation").value;
    const specialization = document.getElementById("drop-drag").value;

    const filters = { designation, specialization }; // Combine filters
    loadDoctors(searchValue, filters); // Load doctors based on search and filters
};

// Display Doctors
const DisplayDoctors = (doctors) => {
        const parent = document.getElementById("doctors");
        parent.innerHTML = ""; // Clear previous doctors

        doctors.forEach((doctor) => {
                    const div = document.createElement("div");
                    div.classList.add("col-md-4", "col-sm-6", "mb-4"); // Responsive classes for Bootstrap

                    div.innerHTML = `
            <div class="card doctor-card shadow-sm">
                <img src="${doctor.image}" class="card-img-top doctor-img" alt="${doctor.full_name}">
                <div class="card-body text-center">
                    <h5 class="card-title">Dr. ${doctor.full_name}</h5>
                    <h6 class="text-muted">${doctor.designation}</h6>
                    <div class="specialization-container">
                        ${
                            doctor.specialization
                                .map((specialty) => `<button class="btn btn-outline-primary btn-sm m-1">${specialty}</button>`)
                                .join("")
                        }
                    </div>
                    <p class="card-text mt-1">${doctor.descriptions ? doctor.descriptions.slice(0, 150) : "No description available"}...</p>
                    <button class="btn btn-primary btn-sm mt-2">Details</button>
                </div>
            </div>
        `;
        parent.appendChild(div);
    });
};


// Display Live Suggestions
const showSearchSuggestions = (searchResults) => {
    const suggestionsContainer = document.getElementById("search-suggestions");
    suggestionsContainer.innerHTML = "";

    if (searchResults.length > 0) {
        suggestionsContainer.style.display = "block";
        searchResults.forEach((result) => {
            const suggestionItem = document.createElement("a");
            suggestionItem.href = "#";
            suggestionItem.className = "list-group-item list-group-item-action";
            suggestionItem.innerText = `Dr. ${result.full_name}`;
            suggestionItem.onclick = (e) => {
                e.preventDefault();
                document.getElementById("search").value = result.full_name;
                suggestionsContainer.style.display = "none";
                handleSearch(result.full_name);
            };
            suggestionsContainer.appendChild(suggestionItem);
        });
    } else {
        suggestionsContainer.style.display = "none";
    }
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
                // option.innerText = item.name; // Use name for option text
                option.innerHTML = `
                <options onclick="loadDoctors('${item.name}')">${item.name}</options>
                `
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


const handelSearch= () => {
    const value = document.getElementById("search").value;
    // console.log(value);
    loadDoctors(value);
}

// Initialize App
loadDoctors();
loadServices();
loadDesignation();
loadSpecialization();