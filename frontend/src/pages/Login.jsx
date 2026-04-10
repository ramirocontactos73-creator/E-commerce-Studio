import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error login");
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                navigate("/admin");
            })
            .catch(() => {
                alert("Credenciales incorrectas");
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Iniciar Sesión
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4 rounded"
                />

                <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;