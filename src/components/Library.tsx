import { FC, useState } from 'react';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';

interface SubjectCardProps {
    name: string;
}

// Componente Banner
const Banner: FC = () => (
    <div className="w-full h-48 bg-gray-200 mb-8 rounded-lg flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-700">Banner</h2>
    </div>
);

// Componente Tarjeta de Materia
const SubjectCard: FC<SubjectCardProps> = ({ name }) => (
    <div className="bg-gray-800 p-6 rounded-lg text-white flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <div className="flex space-x-4">
            <button className="hover:text-pink-300">E</button>
            <button className="hover:text-pink-300">X</button>
        </div>
    </div>
);

// Componente Principal Biblioteca
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
                        "Nunca dudes que un pequeño grupo de ciudadanos comprometidos puede
                        cambiar el mundo. De hecho, solo eso puede lograrlo"
                    </p>
                    <p className="mt-2">-Margaret Mead</p>
                </div>
            </div>

            {/* Footer Contact */}
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="space-x-4">
                            <a href="#" className="hover:text-pink-300">Facebook</a>
                            <a href="#" className="hover:text-pink-300">Instagram</a>
                            <a href="#" className="hover:text-pink-300">Twitter</a>
                            <a href="#" className="hover:text-pink-300">TikTok</a>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <h3 className="font-bold mb-2">CONTÁCTANOS</h3>
                            <p>example@hotmail.com</p>
                            <p>+51 111222333</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Library;