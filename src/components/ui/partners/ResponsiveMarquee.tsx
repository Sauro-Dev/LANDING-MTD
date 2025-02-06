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

    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos]; // Duplicación extra para cubrir el espacio

    return (
        <div className="bg-white">
            <h2 className="py-4 font-sans text-2xl font-bold text-center text-primary">
                Nuestros Aliados
            </h2>
            <div className="relative overflow-hidden">
                <div className={cn("flex w-auto min-w-max -mx-1 whitespace-nowrap hover:[animation-play-state:paused]", animationClass)}>
                    {duplicatedLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0 mx-12">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="object-contain h-12 sm:h-16 md:h-20 lg:h-24"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveMarquee;
