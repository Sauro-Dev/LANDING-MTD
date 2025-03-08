import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import mtdLogo from "../../assets/logos/mtd-logov2.png";
import LoginModal from "./modals/LoginModal";

const Navbar: FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detectar scroll para cambiar estilos del navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevenir scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const isActiveRoute = (path: string) =>
        location.pathname === path
            ? "text-secondary font-bold"
            : "text-light hover:text-secondary";

    const routes = [
        { path: "/nosotros", name: "NOSOTROS" },
        { path: "/boletines", name: "BOLETINES" },
        { path: "/playlists", name: "PLAYLISTS" },
        { path: "/biblioteca", name: "BIBLIOTECA" },
    ];

    return (
        <header className={`
            sticky top-0 w-full z-50 font-poppins
            transition-all duration-300
            ${isScrolled ? 'bg-primary shadow-lg' : 'bg-primary'}
        `}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-2" aria-label="Navegación principal">
                <div className="flex justify-between items-center">
                    {/* Menú Hamburguesa con mejor accesibilidad */}
                    <button
                        className="md:hidden text-light p-2 hover:bg-primary-dark rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <Menu size={28} aria-hidden="true" />
                    </button>

                    {/* Logo y título */}
                    <Link to="/home" className="flex items-center space-x-2 sm:space-x-3 md:space-x-4" aria-label="Ir a la página principal">
                        <img src={mtdLogo} alt="MTD Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-light font-medium text-lg sm:text-xl">MAKE THE</span>
                            <span className="text-light font-medium text-lg sm:text-xl">DIFFERENCE</span>
                        </div>
                    </Link>

                    {/* Menú desktop con mejor accesibilidad */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
                        <nav className="flex space-x-1 sm:space-x-2 lg:space-x-4" aria-label="Menú principal">
                            {routes.map((route) => (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className={`
                                        px-3 py-2 lg:px-4 lg:py-2.5
                                        rounded-lg text-base lg:text-lg font-medium
                                        transition-colors
                                        ${isActiveRoute(route.path)}
                                        hover:bg-primary-dark
                                        focus:outline-none focus:ring-2 focus:ring-secondary
                                    `}
                                    aria-current={location.pathname === route.path ? "page" : undefined}
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Botón usuario con mejor accesibilidad */}
                    <button
                        className="text-light p-2 hover:bg-primary-dark rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
                        onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                        aria-label="Iniciar sesión"
                        aria-haspopup="dialog"
                    >
                        <User size={28} aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Menú móvil con mejor accesibilidad y animación */}
            <div
                id="mobile-menu"
                className={`
                    fixed inset-0 z-50 md:hidden
                    transition-opacity duration-300 ease-in-out
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                aria-hidden={!isMenuOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Menú móvil"
            >
                {/* Overlay con animación */}
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
                
                {/* Panel lateral */}
                <div 
                    className={`
                        absolute top-0 left-0 h-full w-72 max-w-[80vw]
                        bg-primary shadow-xl overflow-y-auto
                        transform transition-transform duration-300 ease-in-out
                        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="flex items-center justify-between p-4 border-b border-primary-dark">
                        <Link to="/home" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <img src={mtdLogo} alt="MTD Logo" className="h-10 w-10 object-contain" />
                            <span className="text-light font-medium text-lg">MAKE THE DIFFERENCE</span>
                        </Link>
                        <button 
                            className="text-light p-1.5 hover:bg-primary-dark rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Cerrar menú"
                        >
                            <X size={24} aria-hidden="true" />
                        </button>
                    </div>
                    
                    <nav className="p-4" aria-label="Menú móvil">
                        <div className="flex flex-col space-y-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className={`
                                        block px-4 py-3
                                        rounded-lg text-lg font-medium
                                        transition-colors
                                        ${location.pathname === route.path ? 'text-secondary bg-primary-dark' : 'text-light'}
                                        hover:text-secondary hover:bg-primary-dark
                                        focus:outline-none focus:ring-2 focus:ring-secondary
                                    `}
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-current={location.pathname === route.path ? "page" : undefined}
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Modal de inicio de sesión */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Navbar;