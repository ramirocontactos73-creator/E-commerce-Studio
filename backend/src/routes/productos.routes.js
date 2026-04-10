const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔹 OBTENER TODOS LOS PRODUCTOS
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});

// 🔹 CREAR PRODUCTO
router.post("/", (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

  const sql = `
    INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, descripcion, precio, stock, categoria, imagen],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al insertar producto" });
      }
      res.json({ mensaje: "Producto creado correctamente" });
    }
  );
});

// 🔹 ACTUALIZAR PRODUCTO
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

  const sql = `
    UPDATE productos
    SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, imagen=?
    WHERE id=?
  `;

  db.query(
    sql,
    [nombre, descripcion, precio, stock, categoria, imagen, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar producto" });
      }
      res.json({ mensaje: "Producto actualizado correctamente" });
    }
  );
});

// 🔹 ELIMINAR PRODUCTO
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar producto" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});

module.exports = router;