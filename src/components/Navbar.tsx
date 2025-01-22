import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import mtdLogo from '../assets/mtd-logov2.png';

interface NavbarProps {
    title?: string;
}

const Navbar: FC<NavbarProps> = ({ title = 'MAKE THE DIFFERENCE' }) => {
    const location = useLocation();

    const isActiveRoute = (path: string) => {
        return location.pathname === path ? 'text-pink-200' : 'text-white hover:text-pink-200';
    };

    return (
        <nav className="bg-purple-600 p-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link to="/landing" className="flex items-center">
                        <img
                            src={mtdLogo}
                            alt="MTD Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="text-white ml-2 font-bold">{title}</span>
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/nosotros" className={`transition-colors ${isActiveRoute('/nosotros')}`}>
                            NOSOTROS
                        </Link>
                        <Link to="/boletines" className={`transition-colors ${isActiveRoute('/boletines')}`}>
                            BOLETINES
                        </Link>
                        <Link to="/playlists" className={`transition-colors ${isActiveRoute('/playlists')}`}>
                            PLAYLISTS
                        </Link>
                        <Link to="/biblioteca" className={`transition-colors ${isActiveRoute('/biblioteca')}`}>
                            BIBLIOTECA
                        </Link>
                    </div>
                </div>
                <button className="text-white">
                    <User size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;