import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    // 🔹 Cargar carrito desde localStorage
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem("carrito");
        return guardado ? JSON.parse(guardado) : [];
    });

    // 🔹 Guardar carrito cada vez que cambia
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // 🔹 Agregar producto
    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find(p => p.id === producto.id);

            if (existe) {
                return prevCarrito.map(p =>
                    p.id === producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };

    // 🔹 Eliminar producto
    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito.filter(p => p.id !== id)
        );
    };

    const aumentarCantidad = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map(p =>
                p.id === id
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            )
        );
    };

    const disminuirCantidad = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito
                .map(p =>
                    p.id === id
                        ? { ...p, cantidad: p.cantidad - 1 }
                        : p
                )
                .filter(p => p.cantidad > 0)
        );
    };


    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            aumentarCantidad,
            disminuirCantidad
        }}>
            {children}
        </CartContext.Provider>
    );
}