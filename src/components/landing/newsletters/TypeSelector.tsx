import { FC } from 'react';

interface TypeSelectorProps {
    activeType: string;
    onTypeChange: (type: string) => void;
}

const TypeSelector: FC<TypeSelectorProps> = ({ activeType, onTypeChange }) => {
    return (
        <div className="w-full py-6 sm:py-10 flex items-center justify-center">
            {/* Contenedor con fondo blanco y borde redondo */}
            <div className="bg-white border border-gray-300 rounded-full flex space-x-1 p-1 shadow-lg max-w-full overflow-x-auto">
                <button
                    onClick={() => onTypeChange('noticias')}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ED117F] focus:ring-opacity-50 ${
                        activeType === 'noticias'
                            ? 'bg-[#ED117F] text-white shadow'
                            : 'bg-transparent text-gray-700 hover:bg-[#ED117F]/10'
                    }`}
                    aria-pressed={activeType === 'noticias'}
                    aria-label="Ver noticias"
                >
                    Noticias
                </button>

                <button
                    onClick={() => onTypeChange('revistas')}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ED117F] focus:ring-opacity-50 ${
                        activeType === 'revistas'
                            ? 'bg-[#ED117F] text-white shadow'
                            : 'bg-transparent text-gray-700 hover:bg-[#ED117F]/10'
                    }`}
                    aria-pressed={activeType === 'revistas'}
                    aria-label="Ver revistas"
                >
                    Revistas
                </button>
            </div>
        </div>
    );
};

export default TypeSelector;