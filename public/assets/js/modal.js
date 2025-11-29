const modal = document.getElementById("modal-aplicar");
const closeModal = document.getElementById("close-modal");

async function cargarVacante(vacanteId) {

    // 2. Obtener lista de vacantes desde la API
    const respuesta = await fetch("/api/jobs");
    const data = await respuesta.json();

    const vacantes = data.jobs;

    // 3. Buscar vacante por ID
    const vacante = vacantes.find(v => v.id === vacanteId);
    cargarModal(vacante)
}

function cargarModal(vacante) {
    // Llenamos contenido dinámico 
    document.getElementById('modality').innerHTML = `<span class="modality ${vacante.modality}">${vacante.modality}</span>`

    document.getElementById("modal-title").textContent = vacante.title;
    document.getElementById("modal-location").textContent = vacante.location;
    document.getElementById("modal-description").textContent = vacante.description;

    const listaRequisitos = document.getElementById("modal-requirements");
    listaRequisitos.innerHTML = "";
    vacante.requirements.forEach(requ => {
        const li = document.createElement("li");
        li.textContent = requ;
        listaRequisitos.appendChild(li);
    });

    const listaResponsabilidades = document.getElementById("modal-responsibilities");
    listaResponsabilidades.innerHTML = "";
    vacante.responsibilities.forEach(resp => {
        const li = document.createElement("li");
        li.textContent = resp;
        listaResponsabilidades.appendChild(li);
    });

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"
}

function cerrarModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "scroll"
}

modal.addEventListener("click", e => {
    if (e.target === modal) cerrarModal(); // cerrar si clickea fuera
});

