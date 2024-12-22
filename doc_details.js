const getParams = () => {

    const params = new URLSearchParams(window.location.search).get("doctorId");
    loadTime(params);
    // console.log(params);
    fetch(`https://hospital-management-with-rest-api.onrender.com/doctor/DoctorList/${params}/`)
        .then(res => res.json())
        .then((data) => getParamsDetails(data))
    fetch(`https://hospital-management-with-rest-api.onrender.com/doctor/DoctorReview/?doctor_id=${params}`)
        .then(res => res.json())
        .then((data) => displayDoctorSpeciReview(data))
}


// doctor details on another page
const getParamsDetails = (doctor) => {
    const parent = document.getElementById("doc-details");
    if (!parent) {
        console.error("Element with ID 'doc-details' not found.");
        return;
    }
    const div = document.createElement("div");

    div.innerHTML = `
      <div
        id="doc-details-container"
        class="doc-container oc-details-container"
      >
        <!--! Doctor Image Section -->
        <div class="doctors-img">
          <img src="${doctor.image}" alt="Doctor Image" />
        </div>

        <!-- !Doctor Info Section -->
        <div class="doc-info">
          <h1 class="text-dark">${doctor.full_name}</h1>
          <h5 class="text-muted font-semibold text-justify">${doctor.designation}</h5>
          <h6 class="text-secondary font-semibold">${doctor.specialization} </h6>
          <p>
          ${doctor.descriptions}
          </p>
          <h4 class="text-dark-emphasis">Consultation Fee: ${doctor.fee}</h4>
          <button type="button" class="btn btn-dark btn-lg font-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Take an Appointment</button>
        </div>
      </div>
    `;
    parent.innerHTML = "";
    parent.appendChild(div);
}

// 
const displayDoctorSpeciReview = (reviews, doctorName = "Clients") => {
    console.log(reviews);

    // Get the parent container for the slider
    const parent = document.getElementById("review-about-doctor-container");

    // Get the heading element dynamically
    const heading = document.querySelector("#review-container-doctor h1.title");

    // Set dynamic heading based on doctor's name
    // heading.innerText = `WHAT ${review.doctor_full_name} SAID`;

    // Clear previous reviews to prevent duplication
    // parent.innerHTML = "";

    reviews.forEach((review) => {
        const div = document.createElement("div");
        div.classList.add("review-container", "p-3", "mt-3");

        div.innerHTML = `
        <div class="review-card">
          <div class="image-container">
            <img src="./Images/femal1.jpeg" alt="${review.reviewer_full_name || "Client"}" />
          </div>
          <h4 class="reviewer-name">${review.reviewer_full_name || "Anonymous"}</h4>
          <p class="review-text">
            ${review.body.slice(0, 250) || "No review provided."}
          </p>
          <div class="rating">${review.rating}</div>
        </div>
      `;

        parent.appendChild(div);
    });
};


const loadTime = (id) => {
    fetch(`https://hospital-management-with-rest-api.onrender.com/doctor/DoctorAvailableTime/?doctor_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("time-select")
                const option = document.createElement("option")
                option.classList.add("font-semibold");
                option.value = item.id;
                option.innerText = item.name
                parent.appendChild(option)

            });
            // console.log(data);
        });
};

const handleAppointment = async() => {
    try {
        const params = new URLSearchParams(window.location.search).get("doctorId");
        loadTime(params);

        // Get selected radio button for appointment type
        const status = document.getElementsByName("mode");
        const selected = Array.from(status).find((button) => button.checked);

        if (!selected) {
            alert("Please select an appointment mode.");
            return;
        }

        // Get symptom input value
        const symptom = document.getElementById("symptom").value;
        if (!symptom) {
            alert("Please enter symptoms.");
            return;
        }

        // Get selected time option
        const timeSelect = document.getElementById("time-select");
        const selectedTime = timeSelect.options[timeSelect.selectedIndex].value;
        if (!selectedTime) {
            alert("Please select a time slot.");
            return;
        }

        const patient_id = localStorage.getItem("patient_id");
        if (!patient_id) {
            alert("Patient Id not found. Please log in again.");
            return;
        }

        // Prepare request payload
        const info = {
            appointment_types: selected.value,
            appointment_status: "Pending",
            symptom: symptom,
            cancel: false,
            patient: parseInt(patient_id), // Ensure it's an integer
            doctor: parseInt(params), // Ensure it's an integer
            time: parseInt(selectedTime), // Ensure it's an integer
        };

        console.log("Sending Info:", info);

        // Make POST request
        const response = await fetch("https://hospital-management-with-rest-api.onrender.com/appointment/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Appointment Created:", data);
        alert("Appointment created successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to create appointment. Please try again later.");
    }
};



const loadPatientID = {

}





getParams();
loadTime();
// handleAppointment();