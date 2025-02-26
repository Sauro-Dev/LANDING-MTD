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
            image: "src/assets/faq/areascarousel1.jpg",
            circleImage: "src/assets/faq/MEDIOAMBIENTE.png",
            title: "Medioambiente",
            phrase: "Cuidamos el planeta con conocimiento y con pasión, porque solo así generamos un cambio real.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Sociales.png",
            title: "Proyectos Sociales",
            phrase: "El verdadero impacto ocurre cuando la empatía y la estrategia trabajan juntas.",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/STEM.png",
            title: "STEAM",
            phrase: "Innovamos con la lógica, pero creamos con el alma para cambiar vidas.",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Talento.png",
            title: "Diseño",
            phrase: "Cada diseño equilibra creatividad y propósito para transformar realidades.",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Branding.png",
            title: "Marketing y Storytelling",
            phrase: "Contamos historias con la mente, pero las hacemos vibrar con el corazón.",
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Comunicaciones.png",
            title: "Comunicaciones",
            phrase: "Damos voz a los mensajes equilibrando razón y emoción.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const img = new Image();
        img.src = carouselItems[activeIndex].image;
        img.onload = () => setLoading(false);
    }, [activeIndex]);

    return (
        <div className="bg-white py-8">
            <div className="max-w-full mx-auto px-4 py-8 sm:py-12 lg:py-16">
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mb-6 overflow-hidden rounded-xl">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center bg-gray-100"
                        >
                            Cargando...
                        </motion.div>
                    )}
                    <motion.img
                        key={carouselItems[activeIndex].image}
                        src={carouselItems[activeIndex].image}
                        alt={carouselItems[activeIndex].title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 text-white text-center p-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{carouselItems[activeIndex].title}</h2>
                        <p className="text-lg md:text-xl">{carouselItems[activeIndex].phrase}</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    {carouselItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            className={`w-16 h-16 rounded-full border-2 transition-all ${index === activeIndex ? 'border-blue-500 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            <img src={item.circleImage} alt={item.title} className="w-full h-full object-cover rounded-full" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AreasCarousel;
