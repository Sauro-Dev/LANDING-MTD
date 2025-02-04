import { FC, useState } from 'react';
import { Edit } from 'lucide-react';
import Navbar from "../common/Navbar.tsx";

// Selector Component
const TypeSelector: FC<{ activeType: string; onTypeChange: (type: string) => void }> = ({
                                                                                            activeType,
                                                                                            onTypeChange
                                                                                        }) => (
    <div className="flex justify-center space-x-8 mb-12">
        <button
            onClick={() => onTypeChange('noticias')}
            className={`text-xl font-bold px-8 py-2 transition-colors ${
                activeType === 'noticias'
                    ? 'bg-white text-black'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
            }`}
        >
            Noticias
        </button>
        <button
            onClick={() => onTypeChange('revistas')}
            className={`text-xl font-bold px-8 py-2 transition-colors ${
                activeType === 'revistas'
                    ? 'bg-white text-black'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
            }`}
        >
            Revistas
        </button>
    </div>
);

interface PublicationCardProps {
    type: 'noticias' | 'revistas';
}

// Unified Card Component for both types
const PublicationCard: FC<PublicationCardProps> = ({ type }) => (
    <div className="flex flex-col items-center">
        <button className="mb-4 px-6 py-1 bg-gray-300 hover:bg-gray-400 transition-colors">
            <div className="flex items-center gap-2">
                <Edit size={16} />
                <span>Editar</span>
            </div>
        </button>

        <div className="w-full max-w-md aspect-[3/4] relative group cursor-pointer">
            <img
                src="/api/placeholder/300/400"
                alt={type === 'noticias' ? "Portada de la noticia" : "Portada del boletín"}
                className="w-full h-full object-cover rounded-lg shadow-lg"
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {type === 'noticias' ? 'Ver noticia' : 'Ver boletín'}
                </span>
            </div>
        </div>

        <div className="mt-4 text-center">
            <h3 className="text-lg font-bold">
                {type === 'noticias' ? 'Noticia Destacada' : 'Boletín Informativo'}
            </h3>
            <p className="text-gray-600">
                {type === 'noticias'
                    ? 'Mayo 15, 2024 - Título de la noticia'
                    : 'Edición Mayo 2024'}
            </p>
        </div>
    </div>
);

// Content Display Component
const ContentDisplay: FC<{ type: string }> = ({ type }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <PublicationCard type={type as 'noticias' | 'revistas'} />
        <PublicationCard type={type as 'noticias' | 'revistas'} />
        <PublicationCard type={type as 'noticias' | 'revistas'} />
    </div>
);

// Footer component
const Footer: FC = () => (
    <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto">
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
);

// Main Newsletters Component
const Newsletters: FC = () => {
    const [activeType, setActiveType] = useState<string>('noticias');

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <TypeSelector
                    activeType={activeType}
                    onTypeChange={setActiveType}
                />
                <ContentDisplay type={activeType} />
            </div>
            <Footer />
        </div>
    );
};

export default Newsletters;