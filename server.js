const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

// Servir todo lo que está en /public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para el JSON real
app.get("/api/jobs", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "assets", "data", "jobs.json"));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
