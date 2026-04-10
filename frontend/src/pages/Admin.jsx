import { useEffect, useState } from "react";

function Admin() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        imagen: "",
    });

    const [editandoId, setEditandoId] = useState(null);

    // 🔹 Obtener productos
    const obtenerProductos = () => {
        fetch("http://localhost:3000/productos")
            .then((res) => res.json())
            .then((data) => setProductos(data));
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // 🔹 Manejar inputs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 🔹 Crear o actualizar
    const guardarProducto = (e) => {
        e.preventDefault();

        const metodo = editandoId ? "PUT" : "POST";
        const url = editandoId
            ? `http://localhost:3000/productos/${editandoId}`
            : "http://localhost:3000/productos";

        fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(() => {
            obtenerProductos();
            setForm({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                categoria: "",
                imagen: "",
            });
            setEditandoId(null);
        });
    };

    // 🔹 Eliminar con confirmación
    const eliminarProducto = (id) => {
        const confirmar = window.confirm("¿Eliminar este producto?");
        if (!confirmar) return;

        fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        }).then(() => obtenerProductos());
    };

    // 🔹 Editar
    const editarProducto = (producto) => {
        setForm(producto);
        setEditandoId(producto.id);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Panel de Administración
            </h1>

            {/* 🧾 FORMULARIO */}
            <form
                onSubmit={guardarProducto}
                className="bg-white p-6 rounded-xl shadow-md mb-10"
            >
                <h2 className="text-xl font-semibold mb-4">
                    {editandoId ? "Editar Producto" : "Crear Producto"}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="precio"
                        type="number"
                        placeholder="Precio"
                        value={form.precio}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="categoria"
                        placeholder="Categoría"
                        value={form.categoria}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="imagen"
                        placeholder="URL Imagen"
                        value={form.imagen}
                        onChange={handleChange}
                        className="border p-2 rounded col-span-2"
                    />
                </div>

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mt-4"
                />

                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg cursor-pointer hover:bg-blue-600">
                    {editandoId ? "Actualizar" : "Crear"}
                </button>
            </form>

            {/* 📊 TABLA */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    Lista de Productos
                </h2>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((p) => (
                            <tr
                                key={p.id}
                                className="border-b hover:bg-gray-100 transition"
                            >
                                <td>
                                    <img
                                        src={p.imagen}
                                        alt={p.nombre}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                </td>

                                <td>{p.nombre}</td>
                                <td>${p.precio}</td>
                                <td>{p.stock}</td>

                                <td className="space-x-2">
                                    <button
                                        onClick={() => editarProducto(p)}
                                        className="bg-yellow-400 px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-500"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => eliminarProducto(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;