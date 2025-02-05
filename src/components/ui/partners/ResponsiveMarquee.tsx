import React from 'react';
import { cn } from "../../../utils/cn.tsx";
import { useMediaQuery } from "../../../hooks/use-media-query.tsx";

// Definición del arreglo de logos
const logos = [
    {
        src: "src/assets/partners/logo-minedu-web-1-1.png",
        alt: "Logo 1",
    },
    {
        src: "src/assets/partners/municipalidad-de-lima-logo.png",
        alt: "Logo 2",
    },
    {
        src: "src/assets/partners/upnorte_nuevo_logo.jpg",
        alt: "Logo 3",
    },
];

const ResponsiveMarquee: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isHighRes = useMediaQuery('(min-width: 1440px)');

    // Selecciona la animación según el dispositivo:
    // - Móvil: animación más lenta (35s)
    // - Pantalla alta resolución: animación más rápida (20s)
    // - Por defecto: animación estándar (25s)
    let animationClass = 'animate-infinite-scroll-half';
    if (isMobile) {
        animationClass = 'animate-infinite-scroll-half-mobile';
    } else if (isHighRes) {
        animationClass = 'animate-infinite-scroll-highres';
    }

    // Duplicar el arreglo para generar el efecto continuo
    const allLogos = [...logos, ...logos];

    return (
        <div className="bg-white">
            {/* Título centrado con las clases definidas en Tailwind */}
            <h2 className="text-primary font-sans text-center text-2xl font-bold py-4">
                Nuestros Aliados
            </h2>
            <div className="overflow-hidden">
                <div className={cn("flex whitespace-nowrap", animationClass)}>
                    {allLogos.map((logo, index) => {
                        // El arreglo original tiene 3 logos; la primera copia son índices 0-2 y la segunda 3-5.
                        // Eliminamos el margen derecho del último elemento de la primera copia (índice 2)
                        // y el margen izquierdo del primer elemento de la segunda copia (índice 3)
                        let marginClass = "mx-4";
                        if (index === logos.length - 1 || index === logos.length) {
                            marginClass = "mx-0";
                        }
                        return (
                            <div key={index} className="flex-shrink-0">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className={`h-12 sm:h-16 md:h-20 lg:h-24 ${marginClass}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveMarquee;
