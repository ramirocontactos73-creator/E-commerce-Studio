import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = carrito.reduce(
    (acc, p) => acc + p.cantidad,
    0
  );

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* 🔥 NAVBAR */}
      <nav className="bg-gradient-to-r from-fuchsia-600 to-blue-500 text-white px-8 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-xl font-bold">
          🎧 Studio Store
        </h1>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:opacity-80 transition">
            Inicio
          </Link>

          <Link to="/carrito" className="relative hover:opacity-80 transition">
            🛒 Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/admin" className="hover:opacity-80 transition">
            Admin
          </Link>

          {/* 🔐 LOGOUT */}
          <button
            onClick={logout}
            className="ml-4 px-3 py-1 text-sm border border-white/40 rounded-full cursor-pointer hover:bg-white hover:text-black transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* 🔥 CONTENIDO (empuja el footer abajo) */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {/* 🔥 FOOTER */}
      <footer className="bg-gray-700 text-white text-center py-4 mt-10 border-t">
        <p className="text-sm">
          E-commerce desarrollado por: Aprendiz Sena Ramiro Ramirez ADSO - ficha 3118305
        </p>
        <p className="text-xs"> © 2026 Studio Store</p>
      </footer>

    </div>
  );
}

export default App;