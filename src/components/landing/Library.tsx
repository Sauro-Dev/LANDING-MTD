import { FC, useState } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Banner from './library/Banner.tsx';
import SubjectCard from './library/SubjectCard.tsx';

const Library: FC = () => {
    const [subjects] = useState([
        'BIOLOGIA',
        'DIBUJO',
        'CIUDADANIA',
        'FILOSOFIA',
        'HISTORIA',
        'LITERATURA',
        'INGLES',
        'GEOGRAFIA',
        'FISICA',
        'ECOLOGIA'
    ]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12">
                {/* Banner Section */}
                <Banner />

                {/* Botón Agregar */}
                <div className="flex justify-center mb-8">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                        <Plus size={20} />
                        Agregar
                    </button>
                </div>

                {/* Grid de Materias */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => (
                        <SubjectCard key={index} name={subject} />
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="mt-12 text-center text-gray-600">
                    <p className="italic">
                        "Nunca dudes que un pequeño grupo de ciudadanos comprometidos puede cambiar el mundo. De hecho, solo eso puede lograrlo"
                    </p>
                    <p className="mt-2">-Margaret Mead</p>
                </div>
            </div>
            {/* Se utiliza el Footer común */}
            <Footer />
        </div>
    );
};

export default Library;