import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
    id: number;
    image: string;
    circleImage: string;
    title: string;
    phrase: string;
}

const AreasCarousel: React.FC = () => {
    const carouselItems: CarouselItem[] = [
        {
            id: 1,
            image: "src/assets/faq/Comun.jpg",
            circleImage: "src/assets/faq/COMUNICACIONES.png",
            title: "",
            phrase: "",
        },
        {
            id: 2,
            image: "src/assets/faq/DISEÑO.jpg",
            circleImage: "src/assets/faq/Branding.png",
            title: "",
            phrase: "",
        },
        {
            id: 3,
            image: "src/assets/faq/TALENTO.jpg",
            circleImage: "src/assets/faq/Talento.png",
            title: "",
            phrase: "",
        },
        {
            id: 4,
            image: "src/assets/faq/MARKETING.jpg",
            circleImage: "src/assets/faq/Ellipse 287.png",
            title: "",
            phrase: "",
        },
        {
            id: 5,
            image: "src/assets/faq/MEDIOAMBIENTE.jpg",
            circleImage: "src/assets/faq/MEDIOAMBIENTE.png",
            title: "",
            phrase: "",
        },
        {
            id: 6,
            image: "src/assets/faq/P. SOCIALES.jpg",
            circleImage: "src/assets/faq/Sociales.png",
            title: "",
            phrase: "",
        },
        {
            id: 7,
            image: "src/assets/faq/STEAM.jpg",
            circleImage: "src/assets/faq/STEM.png",
            title: "",
            phrase: "",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Handle image load
    useEffect(() => {
        setLoading(true);
        const img = new Image();
        img.src = carouselItems[activeIndex].image;
        img.onload = () => {
            setLoading(false);
        };
        img.onerror = () => {
            console.error(`Error loading image: ${carouselItems[activeIndex].image}`);
            setLoading(false);
        };
    }, [activeIndex, carouselItems]);

    return (
        <section className="bg-white py-12 sm:py-16 md:py-20 w-full font-poppins" aria-labelledby="areas-carousel-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 id="areas-carousel-heading" className="sr-only">Áreas de Make The Difference</h2>

                {/* Contenedor principal optimizado para imágenes 1920x1080 (16:9) */}
                <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-gray-100">
                    {/* Contenedor con aspect ratio 16:9 para mantener proporción exacta */}
                    <div className="relative w-full aspect-[16/9]">
                        {/* Loading indicator */}
                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10"
                                    aria-live="polite"
                                    aria-busy={loading}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" role="status"></div>
                                        <p className="mt-2 text-gray-700 font-medium">Cargando...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Carousel image - Optimizado para 1920x1080 */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={carouselItems[activeIndex].id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: loading ? 0 : 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={carouselItems[activeIndex].image}
                                    alt={carouselItems[activeIndex].title || `Área ${activeIndex + 1} de Make The Difference`}
                                    className="absolute w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* Text overlay */}
                                <div className="absolute bottom-0 inset-x-0 text-center p-4 sm:p-6 md:p-8">
                                    {carouselItems[activeIndex].title && (
                                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">
                                            {carouselItems[activeIndex].title}
                                        </h3>
                                    )}
                                    {carouselItems[activeIndex].phrase && (
                                        <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white">
                                            {carouselItems[activeIndex].phrase}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Circle navigation buttons - Corregidos para evitar el recorte en la parte superior */}
                <div className="mt-16 sm:mt-20 md:mt-24 overflow-visible pb-4 px-4">
                    <div className="flex flex-row flex-nowrap min-w-full gap-4 sm:gap-6 md:gap-8 justify-center lg:justify-evenly px-2">
                        {carouselItems.map((item, index) => {
                            // Special handling for icons 5 and 7 as requested
                            const isSpecialIcon = index === 4 || index === 6; // id 5 is index 4, id 7 is index 6

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
                                        flex-shrink-0
                                        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
                                        rounded-full border-2 transition-all duration-300
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                                        ${index === activeIndex
                                        ? 'border-pink-600 shadow-lg transform scale-105'
                                        : 'border-gray-300 hover:border-pink-400 hover:scale-105'
                                    }
                                        overflow-visible ${isSpecialIcon ? 'bg-white' : 'bg-transparent'}
                                    `}
                                    aria-label={`Ver área ${index + 1}`}
                                    aria-pressed={index === activeIndex}
                                    style={{
                                        // Aseguramos espacio suficiente para la escala
                                        margin: index === activeIndex ? '0.5rem' : '0.5rem',
                                        transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                                        transformOrigin: 'center center',
                                        position: 'relative',
                                        zIndex: index === activeIndex ? 10 : 1
                                    }}
                                >
                                    <div className={`
                                        w-full h-full rounded-full overflow-hidden
                                        ${isSpecialIcon ? 'p-0.5 bg-white' : 'p-0 bg-transparent'}
                                    `}>
                                        <img
                                            src={item.circleImage}
                                            alt=""
                                            className={`
                                                ${isSpecialIcon
                                                ? 'max-w-[90%] max-h-[90%] object-contain m-auto'
                                                : 'w-full h-full object-cover'
                                            } 
                                                rounded-full
                                            `}
                                            aria-hidden="true"
                                            loading="lazy"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AreasCarousel;