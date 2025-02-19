import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu } from "lucide-react"; // Eliminamos 'X' porque no se usa
import mtdLogo from "../../assets/mtd-logov2.png";
import LoginModal from "./modals/LoginModal";

const Navbar: FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const isActiveRoute = (path: string) =>
        location.pathname === path ? "text-secondary" : "text-light hover:text-secondary";

    const routes = [
        { path: "/nosotros", name: "NOSOTROS" },
        { path: "/boletines", name: "BOLETINES" },
        { path: "/playlists", name: "PLAYLISTS" },
        { path: "/biblioteca", name: "BIBLIOTECA" },
    ];

    return (
        <nav className="bg-primary p-4 w-full top-0 z-50 shadow-md font-poppins">
            <div className="container mx-auto flex justify-between items-center">
                {/* Menú Hamburguesa */}
                <button
                    className="md:hidden text-light mr-4 p-2 hover:bg-primary-dark rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={28} />
                </button>

                {/* Logo y título */}
                <Link to="/landing" className="flex items-center space-x-3 md:space-x-4">
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
                            className={`px-4 py-2.5 rounded-lg transition-colors ${isActiveRoute(route.path)} hover:bg-primary-dark`}
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

            {/* Modal de inicio de sesión */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </nav>
    );
};

export default Navbar;
