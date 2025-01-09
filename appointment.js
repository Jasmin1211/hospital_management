const loadUserDetailsinappontment = () => {
  const user_id = localStorage.getItem("user_id");
  const patient_id = localStorage.getItem("patient_id");

  fetch(
    `https://hospital-management-with-rest-api.onrender.com/user/usersList/${user_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("user-container-appintmrnt");

      const div = document.createElement("div");
      div.classList.add("p-3", "border", "rounded", "bg-white", "shadow-sm");

      div.innerHTML = `
            <h4 id="user-name" class="text-dark">Name: ${data.full_name} User ID : ${user_id} </h4>
            <h5 id="user-email" class="text-muted">Email:${data.email} </h5>
            <h5 id="user-email" class="text-muted">Patient ID:${patient_id} </h5>
            `;

      parent.appendChild(div);
    })
    .catch((error) => {
      console.error("Error loading user details:", error);
    });
};

loadUserDetails();

const loadAllAppointment = () => {
  // Retrieve patient ID from localStorage
  const patient_id = localStorage.getItem("patient_id");

  // ! get from local storage patient ID
  fetch(
    `https://hospital-management-with-rest-api.onrender.com/appointment/?patient_id=${patient_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        const parent = document.getElementById("appointment-table-body");
        const tr = document.createElement("tr");

        // Format date
        const formattedDate = new Date(
          item.appointment_date
        ).toLocaleDateString();

        // Dynamically create and add row content with better styling
        tr.innerHTML = `
          <td class="text-center">${item.id}</td>
          <td class="text-center">${formattedDate}</td>
          <td>${item.doctor}</td>
          <td>${item.symptom}</td>
          <td>${item.appointment_types}</td>
          <td class="text-center">
            <span class="badge ${
              item.appointment_status === "Completed"
                ? "bg-success"
                : item.appointment_status === "Pending"
                ? "bg-warning"
                : "bg-danger"
            }">${item.appointment_status}</span>
          </td>
          <td class="text-center">$50</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary me-2">Edit</button>
            <button class="btn btn-sm btn-outline-danger">Delete</button>
          </td>
        `;

        // Add the new row to the table body
        parent.appendChild(tr);
      });
    });
};

loadAllAppointment();
loadUserDetailsinappontment();

// !testing purpose
// appointment_status: "Running";
// appointment_types: "Online";
// cancel: false;
// doctor: 8;
// id: 10;
// patient: 14;
// symptom: "jasmin - 4\r\nMicrosoft and our third-party vendors use cookies to store and access information such as unique IDs to deliver, maintain and improve our services and ads. If you agree, MSN and Microsoft Bing will personalise the content and ads that you see. You can select ‘I Accept’ to consent to these uses or click on ‘Manage";
// time: 12;
