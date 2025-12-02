let vacanteId = null

async function cargarLasVacantes() {
    // 1. Obtener id de la URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    if (!id) {
        document.getElementById("vacante-detalle").innerHTML =
            "<p>No se encontró el id de la vacante.</p>";
        return;
    }

    // 2. Obtener lista de vacantes desde la API
    const respuesta = await fetch("jobs.json");
    const data = await respuesta.json();

    const vacantes = data.jobs;

    // 3. Buscar vacante por ID
    const vacante = vacantes.find(v => v.id === id);
    vacanteId = vacante.id

    if (!vacante) {
        document.getElementById("vacante-detalle").innerHTML =
            "<p>Vacante no encontrada.</p>";
        return;
    }

    // 4. Renderizar contenido dinámico
    renderVacante(vacante);
}

function renderVacante(v) {
    document.getElementById('header').style.position = 'static'
    document.getElementById('vacante-title').innerHTML = `${v.title}`
    document.getElementById("vacante-detalle").innerHTML = `
        <span class="modality ${v.modality}">${v.modality}</span>
        <h3>Descripción</h3>
        <p class="location"> Ubicación: ${v.location}</p>
        <p>${v.description}</p>
        <h3 >Responsabilidades</h3>
        <ul id="modal-responsibilities">
            ${v.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>
        <h3>Requisitos</h3>
        <ul id="modal-requirements">
            ${v.requirements.map(req => `<li>${req}</li>`).join("")}
        </ul>
        <p class="salary"> Salario: ${v.salary}</p>
    `;
}

cargarLasVacantes()

