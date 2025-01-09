// ! by get params to fetch/get doctor id
const getParams = () => {
  const params = new URLSearchParams(window.location.search).get("doctorId");
  loadTime(params);
  //! test console.log(params);
  fetch(
    `https://hospital-management-with-rest-api.onrender.com/doctor/doctor-list/${params}/`
  )
    .then((res) => res.json())
    .then((data) => getParamsDetails(data));
  fetch(
    `https://hospital-management-with-rest-api.onrender.com/doctor/doctor-review/?doctor_id=${params}`
  )
    .then((res) => res.json())
    .then((data) => displayDoctorSpeciReview(data));
};

// ! doctor details on another page next tab
const getParamsDetails = (doctor) => {
  const parent = document.getElementById("doc-details");
  if (!parent) {
    console.error("Element with ID 'doc-details' not found.");
    return;
  }
  const div = document.createElement("div");
  // !dynamiclty handel inner html for doctor details page
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
};

// ! docoter sprcific riview
const displayDoctorSpeciReview = (reviews, doctorName = "Clients") => {
  console.log(reviews);

  const parent = document.getElementById("review-about-doctor-container");

  const heading = document.querySelector("#review-container-doctor h1.title");

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review-container", "p-3", "mt-3");
    // !inner html
    div.innerHTML = `
        <div class="review-card">
          <div class="image-container">
            <img src="./Images/femal1.jpeg" alt="${
              review.reviewer_full_name || "Client"
            }" />
          </div>
          <h4 class="reviewer-name">${
            review.reviewer_full_name || "Anonymous"
          }</h4>
          <p class="review-text">
            ${review.body.slice(0, 250) || "No review provided."}
          </p>
          <div class="rating">${review.rating}</div>
        </div>
      `;

    parent.appendChild(div);
  });
};

// ! load times in pop for appontmrnt
const loadTime = (id) => {
  fetch(
    `https://hospital-management-with-rest-api.onrender.com/doctor/doctor-available-time/?doctor_id=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("time-select");
        const option = document.createElement("option");
        option.classList.add("font-semibold");
        option.value = item.id;
        option.innerText = item.name;
        parent.appendChild(option);
      });
      //!test  console.log(data);
    });
};

const handleAppointment = async () => {
  try {
    const params = new URLSearchParams(window.location.search).get("doctorId");
    loadTime(params);

    // !selected radio button for taking appointment type
    const status = document.getElementsByName("mode");
    const selected = Array.from(status).find((button) => button.checked);

    if (!selected) {
      alert("Please select an appointment mode.");
      return;
    }

    //  !symptom input value text field
    const symptom = document.getElementById("symptom").value;
    if (!symptom) {
      alert("Please enter symptoms.");
      return;
    }

    //! selected time using drop down option
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
      patient: parseInt(patient_id), //! must integer
      doctor: parseInt(params),
      time: parseInt(selectedTime)
    };

    console.log("Sending Info:", info);

    // ! Make POST request to sever
    const response = await fetch(
      "https://hospital-management-with-rest-api.onrender.com/appointment/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
      }
    );

    // ! get a  as response PDF
    if (
      response.ok &&
      response.headers.get("Content-Type") === "application/pdf"
    ) {
      const blob = await response.blob(); // !bob is a function
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "appointment_confirmation.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert("Appointment created successfully! PDF downloaded.");
    } else {
      // ! if not get error message
      const data = await response.json();
      console.log("Appointment Created:", data);
      alert("Appointment created successfully!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create appointment. Please try again later.");
  }
};

// const loadPatientID = {

// }

getParams();
loadTime();
// handleAppointment();
