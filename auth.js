const handleRegistration = async (event) => {
  event.preventDefault();

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const phone_no = getValue("phone_no");
  // !image not mentatory for account automacaly add a image [default]
  const image = document.getElementById("image").files[0];
  const terms = document.getElementById("terms").checked;

  const errorContainer = document.getElementById("error");
  errorContainer.innerHTML = "";

  if (
    !username ||
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !confirm_password ||
    !phone_no ||
    !image
  ) {
    errorContainer.innerHTML = "All fields are required.";
    return;
  }

  if (!validateEmail(email)) {
    errorContainer.innerHTML = "Invalid email format.";
    return;
  }

  if (!terms) {
    errorContainer.innerHTML = "You must agree to the Terms and Conditions.";
    return;
  }

  // !created reg from data and append
  const formData = new FormData();
  formData.append("username", username);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirm_password", confirm_password);
  formData.append("phone_no", phone_no);
  formData.append("image", image);

  try {
    const response = await fetch("http://127.0.0.1:8000/patient/register/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log(data);
    console.log(image.size);
    console.log("Server Response:", data);

    if (response.ok) {
      // !after creating successful login give a patinet id
      alert(`Registration Successful! Your Patient ID is ${data.patient_id}`);
      window.location.href = "login.html";
    } else {
      errorContainer.innerHTML = data.message || "Registration failed!";
    }
  } catch (error) {
    console.error(error);
    errorContainer.innerHTML = "Something went wrong. Please try again.";
  }
};

// *comment out
//     // // Registration Successful Message
//     // alert("Registration Successful!");

//     // Clear Form
//     document.getElementById("registrationForm").reset();

//     // const info = {
//     //     username,
//     //     first_name,
//     //     last_name,
//     //     email,
//     //     password,
//     //     confirm_password,
//     // };

//     if (password === confirm_password) {
//         fetch("https://hospital-management-with-rest-api.onrender.com/patient/register/", {
//                 method: "POST",
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(info),
//             })
//             .then((res) => res.json())
//             .then((data) => console.log(data))

//     } else {
//         errorContainer.innerHTML = "Passwords do not match.";
//         return;
//     }
//     console.log(info);
// };
// *comment out

// Get Value from Input Field

const getValue = (id) => {
  return document.getElementById(id).value.trim();
};

// ! Email Format check
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// !handel pass and user name
const handelLogin = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  console.log(username, password);

  // !confition check
  if (username && password) {
    fetch(
      "https://hospital-management-with-rest-api.onrender.com/patient/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("patient_id", data.patient_id);
          window.location.href = "index.html";
        } else {
          alert("Patient ID is missing. Please contact support.");
        }
      })
      .catch((error) => {
        console.error("Error:", error); //! error message show
        alert("Login failed. Please try again.");
      });
  } else {
    alert("Username and Password are required!");
  }
};

// ! Event Listener for subbmit form
document
  .getElementById("registrationForm")
  .addEventListener("submit", handleRegistration);
