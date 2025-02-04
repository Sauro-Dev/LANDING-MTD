import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import mtdLogo from '../../assets/mtd-logov2.png';

const Navbar: FC = () => {
    const location = useLocation();

    const isActiveRoute = (path: string) =>
        location.pathname === path ? 'text-secondary' : 'text-light hover:text-secondary';

    return (
        <nav className="bg-primary p-4 fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/landing" className="flex items-center space-x-2">
                    <img src={mtdLogo} alt="MTD Logo" className="h-10 w-10 object-contain" />
                    <span className="text-light font-bold text-xl">MAKE THE DIFFERENCE</span>
                </Link>

                <div className="hidden md:flex space-x-8 text-lg">
                    {['/nosotros', '/boletines', '/playlists', '/biblioteca'].map((path) => (
                        <Link key={path} to={path} className={`transition-colors ${isActiveRoute(path)}`}>
                            {path.replace('/', '').toUpperCase()}
                        </Link>
                    ))}
                </div>

                <button className="text-light">
                    <User size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;