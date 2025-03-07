import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        img.onload = () => setLoading(false);
    }, [activeIndex, carouselItems]);


    useEffect(() => {
        const handleResize = () => {

        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-white py-4 w-full">
            <div className="max-w-full mx-auto px-4 py-4 sm:py-6 lg:py-8">
                <div className="relative w-full overflow-hidden rounded-xl">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center bg-gray-100"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-2 text-gray-600">Cargando...</p>
                            </div>
                        </motion.div>
                    )}
                    <motion.div
                        key={carouselItems[activeIndex].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loading ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full h-full"
                    >
                        <div className="relative w-full">
                            <img
                                src={carouselItems[activeIndex].image}
                                alt={carouselItems[activeIndex].title}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 text-center p-4 sm:p-6">
                            {carouselItems[activeIndex].title && (
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">{carouselItems[activeIndex].title}</h2>
                            )}
                            {carouselItems[activeIndex].phrase && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white">{carouselItems[activeIndex].phrase}</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                <div className="flex justify-center flex-wrap gap-8 sm:gap-10 mt-10">
                    {carouselItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            className={`w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 transition-all ${
                                index === activeIndex ? 'border-blue-500 scale-110' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            aria-label={`Ver área ${index + 1}`}
                        >
                            <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                                {(item.circleImage.includes("MEDIOAMBIENTE.png") || item.circleImage.includes("STEM.png")) ? (
                                    <img
                                        src={item.circleImage}
                                        alt={`Icono ${index + 1}`}
                                        className="w-5/6 h-5/6 object-contain"
                                    />
                                ) : (
                                    <img
                                        src={item.circleImage}
                                        alt={`Icono ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AreasCarousel;