import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import mtdLogo from '../../assets/mtd-logov2.png';

const Navbar: FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActiveRoute = (path: string) =>
        location.pathname === path ? 'text-secondary' : 'text-light hover:text-secondary';

    const routes = [
        { path: '/nosotros', name: 'NOSOTROS' },
        { path: '/boletines', name: 'BOLETINES' },
        { path: '/playlists', name: 'PLAYLISTS' },
        { path: '/biblioteca', name: 'BIBLIOTECA' }
    ];

    return (
        <nav className="bg-primary p-4 fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Menú Hamburguesa */}
                <button
                    className="md:hidden text-light mr-4 p-2 hover:bg-primary-dark rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menú"
                >
                    <Menu size={28} />
                </button>

                {/* Logo y título */}
                <Link to="/landing" className="flex items-center space-x-2 flex-1 md:flex-none">
                    <img src={mtdLogo} alt="MTD Logo" className="h-10 w-10 object-contain" />
                    <span className="text-light font-bold text-xl">MAKE THE DIFFERENCE</span>
                </Link>

                {/* Menú desktop */}
                <div className="hidden md:flex space-x-8 text-lg">
                    {routes.map((route) => (
                        <Link
                            key={route.path}
                            to={route.path}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActiveRoute(route.path)} hover:bg-primary-dark`}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>

                {/* Botón usuario */}
                <button className="text-light ml-4 p-2 hover:bg-primary-dark rounded-lg transition-colors">
                    <User size={28} />
                </button>

                {/* Menú móvil */}
                <div
                    className={`md:hidden fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className={`absolute top-0 left-0 h-full w-3/4 max-w-xs bg-primary transform transition-transform duration-300 ${
                            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Encabezado del menú */}
                            <div className="flex justify-between items-center mb-8">
                                <img src={mtdLogo} alt="MTD Logo" className="h-12 w-12 object-contain" />
                                <button
                                    className="text-light p-2 hover:bg-primary-dark rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Cerrar menú"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            {/* Opciones del menú */}
                            <nav className="flex flex-col space-y-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.path}
                                        to={route.path}
                                        className={`px-4 py-3 text-xl rounded-lg transition-colors ${isActiveRoute(
                                            route.path
                                        )} hover:bg-primary-dark`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;