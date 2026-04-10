const db = require("./src/db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});

const productosRoutes = require("./src/routes/productos.routes");

app.use("/productos", productosRoutes);

const authRoutes = require("./src/routes/auth.routes");

app.use("/auth", authRoutes);