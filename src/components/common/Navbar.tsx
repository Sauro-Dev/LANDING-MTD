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
        <nav className="bg-primary p-4 fixed w-full top-0 z-50 shadow-md font-poppins">
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
                <Link
                    to="/landing"
                    className="flex items-center space-x-3 md:space-x-4 flex-1 md:flex-none mx-4 md:mx-6"
                >
                    <img
                        src={mtdLogo}
                        alt="MTD Logo"
                        className="h-12 w-12 md:h-14 md:w-14 object-contain transition-all duration-300"
                    />
                    <div className="flex flex-col leading-tight -space-y-0.5">
                        <span className="text-light font-bold text-xl md:text-2xl font-poppins">MAKE THE</span>
                        <span className="text-light font-bold text-xl md:text-2xl font-poppins">DIFFERENCE</span>
                    </div>
                </Link>
                {/* Menú desktop */}
                <div className="hidden md:flex space-x-6 lg:space-x-8 text-xl font-semibold">
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
                <button className="text-light ml-4 p-2.5 hover:bg-primary-dark rounded-lg transition-colors">
                    <User size={30} />
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
                            <nav className="flex flex-col space-y-4 font-semibold">
                                {routes.map((route) => (
                                    <Link
                                        key={route.path}
                                        to={route.path}
                                        className={`px-4 py-3 text-2xl rounded-lg transition-colors ${isActiveRoute(
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