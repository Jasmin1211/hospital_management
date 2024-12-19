const loadServices = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/service/")
        .then((res) => res.json())
        .then((data) => DisplayService(data))
        .catch((err) => console.log(err));
};

const DisplayService = (services) => {
    // console.log(services);
    services.forEach((service) => {
        const parent = document.getElementById("service-container");
        const li = document.createElement("li");
        li.classList.add("slide-visible");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img src="${service.image
            }" class="card-img-top" loading="lazy" alt="...">
                </div>
                <div class="card-body p-3">
                    <h3 class="card-title h5 font-bold">${service.name}</h3>
                    <p class="card-text text-justify pb-2">${service.description.slice(
                0,
                150
            )}</p>
                    <div><a href="${service.link
            }" class="btn btn-primary font-bold">Go somewhere</a></div>
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
};

// Fetch and Load Doctors
const loadDoctors = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorList/")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            DisplayDoctors(data.results); // Pass fetched results to display function
        })
        .catch((error) => {
            console.error("Failed to fetch doctors:", error);
        });
};

// Display Doctors on the Page
const DisplayDoctors = (doctors) => {
        const parent = document.getElementById("doctors");
        parent.innerHTML = ""; // Clear existing content

        doctors.forEach((doctor) => {
                    // Create a container for each doctor
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
                            .map(
                                (specialty) =>
                                    `<button class="btn btn-outline-primary btn-sm m-1">${specialty}</button>`
                            )
                            .join("")}
                    </div>
                    <p class="card-text mt-1">${doctor.descriptions ? doctor.descriptions.slice(0, 150) : 'No description available'}...</p>
                    <button class="btn btn-primary btn-sm mt-2">Details</button>
                </div>
            </div>
        `;
        parent.appendChild(div); // Append each doctor card to the container
    });
};

const loadDesignation = () =>{
    fetch("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorDesignation/")
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((data)=> {
        data.forEach((items)=> {
            const parent = document.getElementById("drop-drag")
        })
    })
}

const loadSpecialization = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/doctor/DoctorSpecialization/")
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("drop-drag"); // Ensure parent is selected correctly
            data.forEach((item) => {
                const option = document.createElement("option"); // Create a new <option> element
                option.value = item.slug; // Assign the value attribute for the option
                option.innerText = item.name; // Set the visible text for the option
                parent.appendChild(option); // Append the option to the select element
            });
        })
        .catch((error) => console.error("Error fetching data:", error)); // Add error handling
};

// Call the function to load the data
loadSpecialization();


// const displayDesignation(designations)
// const displaySpecialization(designations)








loadDoctors();
loadServices();
loadDesignation();
loadSpecialization();