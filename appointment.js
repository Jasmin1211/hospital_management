const loadAllAppointment = () => {
    // Retrieve patient ID from localStorage
    const patient_id = localStorage.getItem("patient_id");

    // Fetch appointments for the given patient ID
    fetch(`https://hospital-management-with-rest-api.onrender.com/appointment/?patient_id=${patient_id}`)
        .then((res) => res.json()) // Fixing the arrow function syntax
        .then((data) => {
            console.log(data);
            data.forEach((item) => {

                const parent = document.getElementById("appointment-table-body");
                const tr = document.createElement("tr");
                tr.innerHTML = `<tr>
                    <td>${item.id}</td>
                    <td>2024-12-21</td>
                    <td>${item.doctor}</td>
                    <td>${item.symptom}</td>
                    <td>${item.appointment_types}</td>
                    <td>${item.appointment_status}</td>
                    <td>$50</td>
                    <td>
                      <button class="btn btn-primary btn-sm">Edit</button>
                      <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                  `

                parent.appendChild(tr)
            })

        });

}

// Example usage
loadAllAppointment();

appointment_status
    :
    "Running"
appointment_types
    :
    "Online"
cancel
    :
    false
doctor
    :
    8
id
    :
    10
patient
    :
    14
symptom
    :
    "jasmin - 4\r\nMicrosoft and our third-party vendors use cookies to store and access information such as unique IDs to deliver, maintain and improve our services and ads. If you agree, MSN and Microsoft Bing will personalise the content and ads that you see. You can select ‘I Accept’ to consent to these uses or click on ‘Manage"
time
    :
    12