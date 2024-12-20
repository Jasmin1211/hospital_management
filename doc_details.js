const getParams = () => {
    const params = new URLSearchParams(window.location.search).get("doctorId");
    // console.log(params);
    fetch(`https://hospital-management-with-rest-api.onrender.com/doctor/DoctorList/${params}/`)
        .then(res => res.json())
        .then((data) => getParamsDetails(data))
}

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
          <button class="btn btn-dark btn-lg font-bold">
            Take an Appointment
          </button>
        </div>
      </div>
    `;
    parent.innerHTML = "";
    parent.appendChild(div);
}








getParams();