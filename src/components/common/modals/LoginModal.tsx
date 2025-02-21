import React, { useState, useEffect, useRef } from "react";
import environment from "../../../enviroment";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Leer el token de localStorage al cargar
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    // Cerrar modal si el usuario hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleLogin = async () => {
        setError(null);

        try {
            const response = await fetch(`${environment.API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Credenciales incorrectas");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            window.location.href = `http://localhost:4200/admin-panel?token=${data.token}`;
        } catch {
            setError("Error al conectar con el servidor. Intente nuevamente.");
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            await fetch(`${environment.API_URL}/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
        }

        localStorage.removeItem("token");
        window.dispatchEvent(new StorageEvent("storage", { key: "token", newValue: null }));
        window.location.reload();
    };

    return (
        <div className="fixed top-16 right-4 z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4">
                    {isAuthenticated ? "Bienvenido" : "Iniciar Sesión"}
                </h2>

                {isAuthenticated ? (
                    // Si está autenticado, mostrar opciones de sistema y logout
                    <div className="space-y-4">
                        <a
                            href={environment.ANGULAR_APP_URL}
                            className="block w-full text-center px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Ingresar al Sistema
                        </a>
                        <button
                            className="w-full px-4 py-2 bg-red-500 text-light rounded-lg hover:bg-red-600 transition-colors"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    // Si no está autenticado, mostrar el formulario de login
                    <form onSubmit={(e) => e.preventDefault()}>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700">Correo</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-primary"
                                placeholder="Ingrese su correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-primary"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary-dark transition-colors"
                            onClick={handleLogin}
                        >
                            Iniciar Sesión
                        </button>

                        <p className="text-center text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                            Recuperar Contraseña
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
