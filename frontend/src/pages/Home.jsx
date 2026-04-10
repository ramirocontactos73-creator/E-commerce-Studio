import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
    const [productos, setProductos] = useState([]);
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:3000/productos")
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {/* 🔴 BANNER */}
            <div className="bg-red-600 text-white py-6 px-4 text-center shadow-md">
                <h1 className="text-3xl font-bold mb-1">
                    🎧 Equipos para Creadores
                </h1>
                <p className="text-sm">
                    Encuentra lo mejor en audio y video profesional
                </p>
            </div>

            {/* 📦 CONTENIDO */}
            <div className="p-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-500 inline-block pb-1">
                    Productos Destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-white rounded-xl shadow-md p-5 transition transform hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* 🖼️ IMAGEN */}
                            <div className="overflow-hidden rounded mb-4">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="h-40 w-full object-cover transition transform hover:scale-110"
                                />
                            </div>

                            {/* 📝 INFO */}
                            <h3 className="text-lg font-semibold">
                                {producto.nombre}
                            </h3>

                            <p className="text-gray-600 text-sm">
                                {producto.descripcion}
                            </p>

                            <p className="text-green-600 font-bold mt-2">
                                ${producto.precio}
                            </p>

                            {/* 🛒 BOTÓN */}
                            <button
                                onClick={() => agregarAlCarrito(producto)}
                                className="bg-blue-500 text-white w-full py-2 mt-4 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 transition"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;