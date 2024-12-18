const loadServices = () => {
    fetch("https://hospital-management-with-rest-api.onrender.com/service/")
        .then((res) => res.json())
        .then((data) => DisplayService(data))
        .catch((err) => console.log(err));
};

const DisplayService = (services) => {
    console.log(services);
    services.forEach((service) => {
        const parent = document.getElementById("service-container")
        const li = document.createElement("li");
        li.classList.add("slide-visible");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img src="${service.image}" class="card-img-top" loading="lazy" alt="...">
                </div>
                <div class="card-body p-3">
                    <h3 class="card-title h5 font-bold">${service.name}</h3>
                    <p class="card-text text-justify pb-2">${service.description.slice(0,150)}</p>
                    <div><a href="${service.link}" class="btn btn-primary font-bold">Go somewhere</a></div>
                </div>
            </div>
        `;
        parent.appendChild(li);

    });

}

loadServices();