import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Carrito() {
    const {
        carrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
    } = useContext(CartContext);

    const total = carrito.reduce(
        (acc, producto) => acc + producto.precio * producto.cantidad,
        0
    );

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 inline-block pb-1">
                🛒 Tu Carrito
            </h1>

            {carrito.length === 0 ? (
                <p className="text-gray-500">
                    No hay productos en el carrito
                </p>
            ) : (
                <div className="grid gap-6">

                    {/* 🔥 PRODUCTOS */}
                    {carrito.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-white rounded-xl shadow-md p-5 flex items-center gap-6"
                        >
                            {/* 🖼️ IMAGEN */}
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="w-24 h-24 object-cover rounded"
                            />

                            {/* 📝 INFO */}
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold">
                                    {producto.nombre}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {producto.descripcion}
                                </p>

                                <p className="text-green-600 font-bold mt-2">
                                    ${producto.precio}
                                </p>
                            </div>

                            {/* 🔢 CONTROLES */}
                            <div className="flex flex-col items-center gap-2">

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => disminuirCantidad(producto.id)}
                                        className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
                                    >
                                        -
                                    </button>

                                    <span className="font-bold">
                                        {producto.cantidad}
                                    </span>

                                    <button
                                        onClick={() => aumentarCantidad(producto.id)}
                                        className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => eliminarDelCarrito(producto.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* 💰 TOTAL */}
                    <div className="bg-white p-6 rounded-xl shadow-md mt-6 text-right">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Total: ${total}
                        </h2>

                        <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg cursor-pointer hover:bg-green-600 transition">
                            Comprar
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Carrito;