import { FC, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import TypeSelector from './newsletters/TypeSelector';
import ContentDisplay from './newsletters/ContentDisplay';

const Newsletters: FC = () => {
    const [activeType, setActiveType] = useState<string>('noticias');

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                    <h1 className="sr-only">Newsletters y Publicaciones</h1>
                    
                    {/* Selector de tipo (noticias o revistas) */}
                    <TypeSelector activeType={activeType} onTypeChange={setActiveType} />

                    {/* Contenido según la selección */}
                    <ContentDisplay type={activeType} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Newsletters;