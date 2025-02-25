import { FC } from 'react';
import bannerImage from '../../../assets/banner/banner principal.png';

/**
 * Componente HeroSection
 *
 * Sección principal de la página de inicio. Muestra un banner de gran tamaño
 * con una imagen destacada que ocupa todo el ancho de la pantalla.
 */
const HeroSection: FC = () => {
    return (
        <section className="">
            {/* Contenedor de la imagen del banner */}
            <div className="relative w-full aspect-[2000/600] overflow-hidden">
                {/* Imagen del banner con ajuste automático para cubrir el espacio disponible */}
                <img
                    src={bannerImage}  // Ruta de la imagen importada
                    alt="Banner principal" // Descripción para accesibilidad
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default HeroSection;
