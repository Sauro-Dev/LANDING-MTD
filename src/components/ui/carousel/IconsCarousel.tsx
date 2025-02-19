import React from 'react';
import { cn } from "../../../utils/cn.tsx";
import { useMediaQuery } from "../../../hooks/use-media-query.tsx";

// Array con la información de las imágenes
const iconImages = [
    {src: "src/assets/faq/MEDIOAMBIENTE.png", alt: "Icon 1"},
    { src: "/src/assets/faq/Sociales.png", alt: "Icon 2" },
    { src: "/src/assets/faq/STEM.png", alt: "Icon 3" },
    { src: "/src/assets/faq/Talento.png", alt: "Icon 4" },
    { src: "/src/assets/faq/Branding.png", alt: "Icon 5" },
    { src: "/src/assets/faq/Ellipse 287.png", alt: "Icon 6" },
    { src: "/src/assets/faq/Comunicaciones.png", alt: "Icon 7" },

];

const IconsCarousel: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isHighRes = useMediaQuery('(min-width: 1440px)');

    // Selección de animación según resolución
    let animationClass = 'animate-infinite-scroll-half';
    if (isMobile) {
        animationClass = 'animate-infinite-scroll-half-mobile';
    } else if (isHighRes) {
        animationClass = 'animate-infinite-scroll-highres';
    }

    // Duplicamos el array para lograr un efecto de loop continuo
    const allIcons = [...iconImages, ...iconImages];

    return (
        <div className="bg-white py-6">
            <div className="overflow-hidden">
                <div className={cn("flex whitespace-nowrap", animationClass)}>
                    {allIcons.map((icon, index) => (
                        <div key={index} className="flex-shrink-0 px-4">
                            <img
                                src={icon.src}
                                alt={icon.alt}
                                className="h-16 sm:h-20 md:h-24 lg:h-28"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IconsCarousel;