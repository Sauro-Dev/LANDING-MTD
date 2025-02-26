import React, { useState, useEffect } from 'react';

interface CarouselItem {
    id: number;
    image: string;
    circleImage: string;
    title: string;
    phrase: string;
}

const AreasCarousel: React.FC = () => {
    // Definición de los ítems del carrusel con imagen, imagen circular, título y frase.
    const carouselItems: CarouselItem[] = [
        {
            id: 1,
            image: "src/assets/faq/areascarousel1.jpg",
            circleImage: "src/assets/faq/MEDIOAMBIENTE.png",
            title: "🌱 Medioambiente",
            phrase: "🌍 Cuidamos el planeta con conocimiento y con pasión, porque solo así generamos un cambio real.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Sociales.png",
            title: "🤝 Proyectos Sociales",
            phrase: "💡 El verdadero impacto ocurre cuando la empatía y la estrategia trabajan juntas",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/STEM.png",
            title: "🛠️ STEAM",
            phrase: "🔬 Innovamos con la lógica, pero creamos con el alma para cambiar vidas.",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Talento.png",
            title: "🎨 Diseño",
            phrase: "🖌️ Cada diseño equilibra creatividad y propósito para transformar realidades",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Branding.png",
            title: "📢 Marketing y Storytelling",
            phrase: "📖 Contamos historias con la mente, pero las hacemos vibrar con el corazón",
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Comunicaciones.png",
            title: "🗣️ Comunicaciones",
            phrase: "Damos voz a los mensajes equilibrando razón y emoción",
        },
    ];

    // Estado para el índice activo y el índice previo (para la transición cruzada)
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);

    // Precarga de imágenes (para mejorar el rendimiento)
    useEffect(() => {
        carouselItems.forEach(item => {
            new Image().src = item.image;
            new Image().src = item.circleImage;
        });
    }, [carouselItems]);

    // Función para cambiar de imagen con transición cruzada:
    // - Guarda el índice actual en prevIndex
    // - Actualiza activeIndex al nuevo índice
    // - Después de 300ms (duración de la animación), elimina prevIndex
    const handleIndexChange = (index: number) => {
        if (index !== activeIndex) {
            setPrevIndex(activeIndex);  // Guarda el índice actual como previo
            setActiveIndex(index);      // Cambia al nuevo índice
            setTimeout(() => setPrevIndex(null), 300);
        }
    };

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
                {/* Contenedor principal de la imagen */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-6 sm:mb-8 lg:mb-12 overflow-hidden rounded-xl sm:rounded-2xl">
                    {/* Imagen previa (fade-out) */}
                    {prevIndex !== null && (
                        <img
                            src={carouselItems[prevIndex].image}
                            alt={carouselItems[prevIndex].title}
                            className="absolute inset-0 w-full h-full object-cover animate-fade-out"
                        />
                    )}
                    {/* Imagen actual (fade-in) */}
                    <img
                        src={carouselItems[activeIndex].image}
                        alt={carouselItems[activeIndex].title}
                        className="w-full h-full object-cover animate-fade-in"
                    />

                    {/* Overlay de degradado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Contenido textual: título y frase de la imagen actual */}
                    <div className="absolute bottom-0 inset-x-0 text-white text-center p-4 sm:p-6 lg:pb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
                            {carouselItems[activeIndex].title}
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl">
                            {carouselItems[activeIndex].phrase}
                        </p>
                    </div>
                </div>

                {/* Botones de navegación */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
                    {carouselItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleIndexChange(index)}
                            className="group relative transition-transform duration-150 ease-out"
                        >
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 transition-all duration-150 ease-out ${
                                index === activeIndex
                                    ? 'border-blue-500 scale-105'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}>
                                <img
                                    src={item.circleImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            {/* Indicador activo: un pequeño círculo que muestra el elemento seleccionado */}
                            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-150 ease-out ${
                                index === activeIndex
                                    ? 'bg-blue-500 scale-125'
                                    : 'bg-gray-300 scale-0 group-hover:scale-100'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AreasCarousel;
