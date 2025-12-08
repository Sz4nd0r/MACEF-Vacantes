// ==========================
// Cargar listado de vacantes
// ==========================
async function cargarVacantes() {
    try {
        // Use an absolute path for reliability on GitHub Pages:
        const respuesta = await fetch('jobs.json');

        if (!respuesta.ok) {
            // Throw an error if the status is not OK (e.g., 404 Not Found)
            // This stops the 'try' block and sends execution to the 'catch' block
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        const jobs = data.jobs;

        renderizarTarjetas(jobs);

    } catch (error) {
        console.error("Error cargando jobs.json:", error);
        // Display the user-friendly fallback message here in the catch block
        document.getElementById('jobs-container').innerHTML = "<p>No hay vacantes abiertas.<p>";
    }
}

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

cargarVacantes();
