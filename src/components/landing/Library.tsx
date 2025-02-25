import { FC } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Banner from './library/Banner.tsx';
import GoggleDriveFolders from './library/GoogleDriveFolders.tsx';

/**
 * Componente Library
 *
 * Este componente representa la página de la biblioteca digital.
 * Se encarga de estructurar la vista con un encabezado (Navbar),
 * un banner, una sección con carpetas de Google Drive
 * y un pie de página (Footer).
 */

const Library: FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Banner />
            <GoggleDriveFolders />
            <Footer />
        </div>
    );
};

export default Library;
