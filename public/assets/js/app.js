// ==========================
// Cargar listado de vacantes
// ==========================
async function cargarVacantes() {
    try {
        const respuesta = await fetch("/api/jobs");
        const data = await respuesta.json();
        const jobs = data.jobs;

        renderizarTarjetas(jobs);

    } catch (error) {
        console.error("Error cargando jobs.json:", error);
    }
}

// ==========================
// Renderizar tarjetas en Home
// ==========================
function renderizarTarjetas(jobs) {
    const contenedor = document.getElementById("jobs-container");
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpiar por si acaso

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("job-card");

        card.innerHTML = `
            <div class="info__card">
                <span class="modality ${job.modality}">${job.modality}</span>
                <h3>${job.title}</h3>
                <p class="location">${job.location}</p>
                <p class="salary"> ${job.salary}</p>
            </div>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="buttons">
                <button class="btn-details" onclick="irAVacante(${job.id})">
                    Ver detalles
                </button>

                <button class="btn-apply" onclick="cargarVacante(${job.id})">
                    Aplicar
                </button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Navegar a la página vacante
function irAVacante(id) {
    window.location.href = `vacante.html?id=${id}`;
}

// Cargar cuando el home abra
cargarVacantes();
