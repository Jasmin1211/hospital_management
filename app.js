// // Declare debounce timer globally
// let debounceTimer;

// // Fetch and Load Services
// const loadServices = () => {
//   fetch(
//     "https://hospital-management-with-rest-api.onrender.com/service/services/"
//   )
//     .then((res) => res.json())
//     .then((data) => DisplayService(data))
//     .catch((err) => console.error("Error fetching services:", err));
// };

// // Display Services
// const DisplayService = (services) => {
//   const parent = document.getElementById("service-container");
//   parent.innerHTML = ""; // Clear previous services to avoid duplication

//   services.forEach((service) => {
//     const li = document.createElement("li");
//     li.classList.add("slide-visible");
//     li.innerHTML = `
//             <div class="card shadow h-100">
//                 <div class="ratio ratio-16x9">
//                     <img src="${
//                       service.image
//                     }" class="card-img-top" loading="lazy" alt="${
//       service.name
//     }">
//                 </div>
//                 <div class="card-body p-3">
//                     <h3 class="card-title h5 font-bold">${service.name}</h3>
//                     <p class="card-text text-justify pb-2">${service.description.slice(
//                       0,
//                       150
//                     )}...</p>
//                     <div><a href="./service.html" class="btn btn-primary font-semibold">Details</a></div>
//                 </div>
//             </div>
//         `;
//     parent.appendChild(li);
//   });
// };

// // Fetch and Load Doctors
// const loadDoctors = (search = "", filters = {}) => {
//   const { designation, specialization } = filters;

//   let apiUrl = `https://hospital-management-with-rest-api.onrender.com/doctor/doctor-list/`;

//   const queryParams = new URLSearchParams();

//   if (search) queryParams.append("search", search);
//   if (designation) queryParams.append("designation", designation);
//   if (specialization) queryParams.append("specialization", specialization);

//   apiUrl += `?${queryParams.toString()}`;

//   document.getElementById("loading").style.display = "block";
//   document.getElementById("no-results").style.display = "none";

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       document.getElementById("loading").style.display = "none";

//       if (!data.results || data.results.length === 0) {
//         document.getElementById("no-results").style.display = "block";
//       } else {
//         document.getElementById("no-results").style.display = "none"; // Hide "No Results" message
//         DisplayDoctors(data.results);
//       }
//     })
//     .catch((error) => {
//       document.getElementById("loading").style.display = "none";
//       console.error("Failed to fetch doctors:", error);
//     });
// };

// // Apply Filters
// const applyFilters = () => {
//   const designation = document.getElementById("drop-drag-designation").value;
//   const specialization = document.getElementById("drop-drag").value;
//   loadDoctors("", { designation, specialization });
// };

// // Debounced Search Handler
// const handleDebouncedSearch = () => {
//   clearTimeout(debounceTimer); // Clear previous timer
//   debounceTimer = setTimeout(() => {
//     const searchValue = document.getElementById("search").value;
//     handleSearch(searchValue);
//   }, 300); // Wait 300ms after the user stops typing
// };

// // Main Search Handler
// const handleSearch = (searchValue) => {
//   const designation = document.getElementById("drop-drag-designation").value;
//   const specialization = document.getElementById("drop-drag").value;

//   const filters = { designation, specialization }; // Combine filters
//   loadDoctors(searchValue, filters); // Load doctors based on search and filters
// };

// // Display Doctors
// const DisplayDoctors = (doctors) => {
//   const parent = document.getElementById("doctors");
//   parent.innerHTML = ""; // Clear previous doctors

//   doctors.forEach((doctor) => {
//     const div = document.createElement("div");
//     div.classList.add("col-md-4", "col-sm-6", "mb-4"); // Responsive classes for Bootstrap

//     div.innerHTML = `
//             <div class="card doctor-card shadow-sm">
//                 <img src="${
//                   doctor.image
//                 }" class="card-img-top doctor-img" alt="${doctor.full_name}">
//                 <div class="card-body text-center">
//                     <h5 class="card-title">Dr. ${doctor.full_name}</h5>
//                     <h6 class="text-muted">${doctor.designation}</h6>
//                     <div class="specialization-container">
//                         ${doctor.specialization
//                           .map(
//                             (specialty) =>
//                               `<button class="btn btn-outline-primary btn-sm m-1">${specialty}</button>`
//                           )
//                           .join("")}
//                     </div>
//                     <p class="card-text mt-1">${
//                       doctor.descriptions
//                         ? doctor.descriptions.slice(0, 150)
//                         : "No description available"
//                     }...</p>
//                     <button class="btn btn-primary btn-sm mt-2 font-semibold"><a target="_blank" href="doc_details.html?doctorId=${
//                       doctor.id
//                     }">Details</a></button>
//                 </div>
//             </div>
//         `;
//     parent.appendChild(div);
//   });
// };

// // Display Live Suggestions
// const showSearchSuggestions = (searchResults) => {
//   const suggestionsContainer = document.getElementById("search-suggestions");
//   suggestionsContainer.innerHTML = "";

//   if (searchResults.length > 0) {
//     suggestionsContainer.style.display = "block";
//     searchResults.forEach((result) => {
//       const suggestionItem = document.createElement("a");
//       suggestionItem.href = "#";
//       suggestionItem.className = "list-group-item list-group-item-action";
//       suggestionItem.innerText = `Dr. ${result.full_name}`;
//       suggestionItem.onclick = (e) => {
//         e.preventDefault();
//         document.getElementById("search").value = result.full_name;
//         suggestionsContainer.style.display = "none";
//         handleSearch(result.full_name);
//       };
//       suggestionsContainer.appendChild(suggestionItem);
//     });
//   } else {
//     suggestionsContainer.style.display = "none";
//   }
// };

// // Reusable Function to Load Dropdown Data
// const loadDropdownData = (url, dropdownId) => {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       const dropdown = document.getElementById(dropdownId);
//       dropdown.innerHTML = '<option value="">Select</option>'; // Clear and reset dropdown

//       data.forEach((item) => {
//         const option = document.createElement("option");
//         option.value = item.slug; // Use slug for option value
//         option.textContent = item.name; // Properly set the text for the option
//         dropdown.appendChild(option); // Append option to dropdown
//       });
//     })
//     .catch((error) =>
//       console.error(`Error fetching data for ${dropdownId}:`, error)
//     ); // Handle errors
// };

// // Load Designations
// const loadDesignation = () => {
//   loadDropdownData(
//     "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-designation/",
//     "drop-drag-designation"
//   );
// };

// // Load Specializations
// const loadSpecialization = () => {
//   loadDropdownData(
//     "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-specialization/",
//     "drop-drag"
//   );
// };

// const loadReview = () => {
//   fetch(
//     "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-review/"
//   )
//     .then((res) => res.json())
//     .then((data) => displayReview(data))
//     //   .then((data) => console.log(data))
//     .catch((error) => console.error("Error fetching reviews:", error));
// };

// //   display review
// const displayReview = (reviews) => {
//   console.log(reviews);
//   const parent = document.getElementById("review-container");

//   reviews.forEach((review) => {
//     // const reviewer = reviewers.find(r => r.id === review.reviewer);
//     const div = document.createElement("div");
//     div.classList.add("review");

//     div.innerHTML = `
//         <div class="review-card">
//           <div class="image-container">
//             <img src="./Images/femal1.jpeg" alt="${
//               review.reviewer_full_name || "Client"
//             }" />
//           </div>
//           <h4 class="reviewer-name">${
//             review.reviewer_full_name || "Anonymous"
//           }</h4>
//           <p class="review-text">
//             ${review.body.slice(0, 250) || "No review provided."}
//           </p>
//           <div class="rating">${review.rating}</div>
//         </div>
//       `;

//     parent.appendChild(div);
//   });
// };

// // Initialize App
// loadDoctors();
// loadServices();
// loadDesignation();
// loadSpecialization();
// loadReview();

// // Event Listeners for Filtering
// document
//   .getElementById("drop-drag-designation")
//   .addEventListener("change", applyFilters);
// document.getElementById("drop-drag").addEventListener("change", applyFilters);
// document
//   .getElementById("apply-filters-btn")
//   .addEventListener("click", applyFilters);

// // Event Listener for Search Input
// document
//   .getElementById("search")
//   .addEventListener("input", handleDebouncedSearch);
// // Call the loadReview function when the page loads
// //   document.addEventListener("DOMContentLoaded", loadReview);

// Declare debounce timer globally
let debounceTimer;

// ! Fetch and Load Services
const loadServices = () => {
  fetch(
    "https://hospital-management-with-rest-api.onrender.com/service/services/"
  )
    .then((res) => res.json())
    .then((data) => DisplayService(data))
    .catch((err) => console.error("Error fetching services:", err));
};

// ! Display Services
const DisplayService = (services) => {
  const parent = document.getElementById("service-container");
  parent.innerHTML = ""; // Clear previous services to avoid duplication

  services.forEach((service) => {
    const li = document.createElement("li");
    li.classList.add("slide-visible");
    // ! service card is visible using Dynamic HTML
    li.innerHTML = `
      <div class="card shadow h-100">
        <div class="ratio ratio-16x9">
          <img src="${
            service.image
          }" class="card-img-top" loading="lazy" alt="${service.name}">
        </div>
        <div class="card-body p-3">
          <h3 class="card-title h5 font-bold">${service.name}</h3>
          <p class="card-text text-justify pb-2">${service.description.slice(
            0,
            150
          )}...</p>
          <div><a href="./service.html" class="btn btn-primary font-semibold">Details</a></div>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });
};

// ! Fetch and Load Doctors in front
const loadDoctors = (search = "", filters = {}) => {
  const { designation, specialization } = filters;

  let apiUrl = `https://hospital-management-with-rest-api.onrender.com/doctor/doctor-list/`;

  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (designation) queryParams.append("designation", designation);
  if (specialization) queryParams.append("specialization", specialization);

  apiUrl += `?${queryParams.toString()}`;

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

      if (!data.results || data.results.length === 0) {
        document.getElementById("no-results").style.display = "block";
      } else {
        document.getElementById("no-results").style.display = "none";
        DisplayDoctors(data.results);
      }
    })
    .catch((error) => {
      document.getElementById("loading").style.display = "none";
      console.error("Failed to fetch doctors:", error);
    });
};

// ! Apply Filters to making doctor short
const applyFilters = () => {
  const designation = document.getElementById("drop-drag-designation").value;
  const specialization = document.getElementById("drop-drag").value;
  loadDoctors("", { designation, specialization });
};

// ! Dynamic searching  Debounced Search Handler
const handleDebouncedSearch = () => {
  clearTimeout(debounceTimer); // !Clear previous timer
  debounceTimer = setTimeout(() => {
    const searchValue = document.getElementById("search").value;
    handleSearch(searchValue);
  }, 300);
  // ! after typing waiting for 300ms then show results
};

// ! Main Search  Handler where we write
const handleSearch = (searchValue) => {
  const designation = document.getElementById("drop-drag-designation").value;
  const specialization = document.getElementById("drop-drag").value;

  const filters = { designation, specialization };
  loadDoctors(searchValue, filters);
};

// ! display Display Doctors
const DisplayDoctors = (doctors) => {
  const parent = document.getElementById("doctors");
  parent.innerHTML = ""; // Clear previous doctors

  doctors.forEach((doctor) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "col-sm-6", "mb-4");

    // ! doctor cards
    div.innerHTML = `
      <div class="card doctor-card shadow-sm">
        <img src="${doctor.image}" class="card-img-top doctor-img" alt="${
      doctor.full_name
    }">
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
          <p class="card-text mt-1">${
            doctor.descriptions
              ? doctor.descriptions.slice(0, 150)
              : "No description available"
          }...</p>
          <button class="btn btn-primary btn-sm mt-2 font-semibold">
            <a target="_blank" href="doc_details.html?doctorId=${
              doctor.id
            }">Details</a>
          </button>
        </div>
      </div>
    `;
    parent.appendChild(div);
  });
};

// //! Display Live Suggestions (Not working)
// const showSearchSuggestions = (searchResults) => {
//   const suggestionsContainer = document.getElementById("search-suggestions");
//   suggestionsContainer.innerHTML = "";

//   if (searchResults.length > 0) {
//     suggestionsContainer.style.display = "block";
//     searchResults.forEach((result) => {
//       const suggestionItem = document.createElement("a");
//       suggestionItem.href = "#";
//       suggestionItem.className = "list-group-item list-group-item-action";
//       suggestionItem.innerText = `Dr. ${result.full_name}`;
//       suggestionItem.onclick = (e) => {
//         e.preventDefault();
//         document.getElementById("search").value = result.full_name;
//         suggestionsContainer.style.display = "none";
//         handleSearch(result.full_name);
//       };
//       suggestionsContainer.appendChild(suggestionItem);
//     });
//   } else {
//     suggestionsContainer.style.display = "none";
//   }
// };

// ! Reusable Function to Load Dropdown Data (not working)
const loadDropdownData = (url, dropdownId) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dropdown = document.getElementById(dropdownId);
      dropdown.innerHTML = '<option value="">Select</option>';

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.slug;
        option.textContent = item.name;
        dropdown.appendChild(option);
      });
    })
    .catch((error) =>
      console.error(`Error fetching data for ${dropdownId}:`, error)
    );
};

// !Load Designations to filter card
const loadDesignation = () => {
  loadDropdownData(
    "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-designation/",
    "drop-drag-designation"
  );
};

// !Load Specializations to filter card
const loadSpecialization = () => {
  loadDropdownData(
    "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-specialization/",
    "drop-drag"
  );
};

// ! Load Reviews
const loadReview = () => {
  fetch(
    "https://hospital-management-with-rest-api.onrender.com/doctor/doctor-review/"
  )
    .then((res) => res.json())
    .then((data) => displayReview(data))
    .catch((error) => console.error("Error fetching reviews:", error));
};

// ! Display Reviews
const displayReview = (reviews) => {
  console.log(reviews);
  const parent = document.getElementById("review-container");

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review");
    // !inter test of the review container
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

// ! call all functions Initialize App

loadDoctors();
loadServices();
loadDesignation();
loadSpecialization();
loadReview();

// !Event  for Filtering
document
  .getElementById("drop-drag-designation")
  .addEventListener("change", applyFilters);
document.getElementById("drop-drag").addEventListener("change", applyFilters);
document
  .getElementById("apply-filters-btn")
  .addEventListener("click", applyFilters);

// !Event for Search Input
document
  .getElementById("search")
  .addEventListener("input", handleDebouncedSearch);
