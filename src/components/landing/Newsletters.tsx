import { FC, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

import TypeSelector from './newsletters/TypeSelector';
import ContentDisplay from './newsletters/ContentDisplay';

const Newsletters: FC = () => {
    const [activeType, setActiveType] = useState<string>('noticias');

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Selector de tipo (noticias o revistas) */}
            <TypeSelector activeType={activeType} onTypeChange={setActiveType} />

            {/* Contenido según la selección */}
            <ContentDisplay type={activeType} />

            <Footer />
        </div>
    );
};

export default Newsletters;
