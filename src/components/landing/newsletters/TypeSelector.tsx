import { FC } from 'react';

interface TypeSelectorProps {
    activeType: string;
    onTypeChange: (type: string) => void;
}

const TypeSelector: FC<TypeSelectorProps> = ({ activeType, onTypeChange }) => {
    return (
        <div className="w-full py-10 flex items-center justify-center">
            {/* Contenedor con fondo blanco y borde redondo */}
            <div className="bg-white border border-gray-300 rounded-full flex space-x-1 p-1 shadow-lg">
                <button
                    onClick={() => onTypeChange('noticias')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeType === 'noticias'
                            ? 'bg-[#ED117F] text-white shadow'
                            : 'bg-transparent text-gray-700 hover:bg-[#ED117F]/10'
                    }`}
                >
                    Noticias
                </button>

                <button
                    onClick={() => onTypeChange('revistas')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeType === 'revistas'
                            ? 'bg-[#ED117F] text-white shadow'
                            : 'bg-transparent text-gray-700 hover:bg-[#ED117F]/10'
                    }`}
                >
                    Revistas
                </button>
            </div>
        </div>
    );
};

export default TypeSelector;
