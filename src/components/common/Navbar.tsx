import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu } from "lucide-react";
import mtdLogo from "../../assets/logos/mtd-logov2.png";
import LoginModal from "./modals/LoginModal";

const Navbar: FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const isActiveRoute = (path: string) =>
        location.pathname === path
            ? "text-secondary"
            : "text-light hover:text-secondary";

    const routes = [
        { path: "/nosotros", name: "NOSOTROS" },
        { path: "/boletines", name: "BOLETINES" },
        { path: "/playlists", name: "PLAYLISTS" },
        { path: "/biblioteca", name: "BIBLIOTECA" },
    ];

    return (
        <nav
            className="
        bg-primary
        p-4
        w-full
        top-0
        z-50
        font-poppins
        /* Quita o ajusta shadow-md si no quieres sombra */
      "
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Menú Hamburguesa */}
                <button
                    className="md:hidden text-light mr-4 p-2 hover:bg-primary-dark rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={28} />
                </button>

                {/* Logo y título */}
                <Link to="/home" className="flex items-center space-x-3 md:space-x-4">
                    <img src={mtdLogo} alt="MTD Logo" className="h-16 w-16 object-contain" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-light font-medium text-xl">MAKE THE</span>
                        <span className="text-light font-medium text-xl">DIFFERENCE</span>
                    </div>
                </Link>

                {/* Menú desktop */}
                <div className="hidden md:flex space-x-6 lg:space-x-8 text-xl font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.path}
                            to={route.path}
                            className={`
                px-4 py-2.5
                rounded-lg
                transition-colors
                ${isActiveRoute(route.path)}
                hover:bg-primary-dark
              `}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>

                {/* Botón usuario */}
                <button
                    className="text-light ml-4 p-2.5 hover:bg-primary-dark rounded-lg transition-colors"
                    onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                >
                    <User size={30} />
                </button>
            </div>

            {/* Barra lateral (sidebar) para móviles con animación */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-primary z-50
          transform transition-transform duration-300
          md:hidden
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="p-4">
                    {/* Enlaces con texto más grande y más espacio */}
                    <div className="flex flex-col space-y-4 text-xl">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                to={route.path}
                                className="
                  block px-4 py-3
                  rounded-lg
                  transition-colors
                  text-light
                  hover:text-secondary
                  hover:bg-primary-dark
                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Superposición oscura (overlay) al mostrar la barra lateral */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Modal de inicio de sesión */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </nav>
    );
};

export default Navbar;
