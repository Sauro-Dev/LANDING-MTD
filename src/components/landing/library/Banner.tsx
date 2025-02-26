import { FC } from "react";
import bookLogo from '../../../assets/library/iconolibro.png';

/**
 * Componente Banner
 *
 * Este componente representa el encabezado visual de la biblioteca.
 * Muestra un título y una imagen representativa de un libro abierto.
 */
const Banner: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 bg-white animate-fade-in">
            {/* Título principal del banner */}
            <h2 className="text-5xl font-bold text-pink-600 mb-4 animate-fade-in">BIBLIOTECA</h2>

            {/* Imagen decorativa del banner */}
            <img
                src={bookLogo}  // Ruta de la imagen importada
                alt="Libro abierto" // Descripción para accesibilidad
                className="w-64 h-64 mb-6 animate-fade-in"
            />
        </div>
    );
};

export default Banner;
