import React from 'react';
import { cn } from "../../../utils/cn.tsx";
import { useMediaQuery } from "../../../hooks/use-media-query.tsx";

// Array con la información de los logos
const logos = [
    { src: "src/assets/partners/logo-minedu-web-1-1.png", alt: "Logo 1" },
    { src: "src/assets/partners/municipalidad-de-lima-logo.png", alt: "Logo 2" },
    { src: "src/assets/partners/upnorte_nuevo_logo.jpg", alt: "Logo 3" },
];

const FramerCarousel: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isHighRes = useMediaQuery('(min-width: 1440px)');

    // Selecciona la animación según el dispositivo:
    // - Móvil: 35s (más lenta)
    // - Pantalla de alta resolución: 20s (más rápida)
    // - Por defecto: 25s
    let animationClass = 'animate-infinite-scroll-half';
    if (isMobile) {
        animationClass = 'animate-infinite-scroll-half-mobile';
    } else if (isHighRes) {
        animationClass = 'animate-infinite-scroll-highres';
    }

    // Duplicamos el arreglo para lograr un loop continuo
    const allLogos = [...logos, ...logos];

    return (
        <div className="bg-white">
            {/* Título centrado */}
            <h2 className="text-primary font-sans text-center text-2xl font-bold py-4">
                Nuestros Aliados
            </h2>
            <div className="overflow-hidden">
                <div className={cn("flex whitespace-nowrap", animationClass)}>
                    {allLogos.map((logo, index) => {
                        // Puedes ajustar el espaciado responsivamente usando clases de gap.
                        // Aquí se aplica un padding horizontal que se ajusta en diferentes breakpoints.
                        return (
                            <div key={index} className="flex-shrink-0 px-2 sm:px-4 md:px-6">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-12 sm:h-16 md:h-20 lg:h-24"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FramerCarousel;
