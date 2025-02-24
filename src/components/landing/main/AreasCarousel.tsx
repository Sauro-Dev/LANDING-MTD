import React, { useState } from 'react';

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
            title: "Proyectos Comunitarios",
            phrase: "Transformando vidas, construyendo comunidades",
        },

        /* Falta modificar las imagenes del id 2 para abajo, igual idk si la del id1 va a quedar asi como el figma o va a ser otra gaaaa */

        {
            id: 2,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Sociales.png",
            title: "Desarrollo Sostenible",
            phrase: "Cultivando un futuro más verde y sostenible",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/STEM.png",
            title: "Innovación Social",
            phrase: "Creando soluciones innovadoras para el cambio social",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Talento.png",
            title: "Documentación Visual",
            phrase: "Capturando historias que inspiran acción",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Branding.png",
            title: "Difusión y Comunicación",
            phrase: "Amplificando voces, conectando comunidades",
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
            circleImage: "src/assets/faq/Comunicaciones.png",
            title: "Gestión de Proyectos",
            phrase: "Liderando el camino hacia el impacto positivo",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
                {/* Image Section */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-6 sm:mb-8 lg:mb-12 overflow-hidden rounded-xl sm:rounded-2xl">
                    <img
                        src={carouselItems[activeIndex].image}
                        alt={carouselItems[activeIndex].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 text-white text-center p-4 sm:p-6 lg:pb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">{carouselItems[activeIndex].title}</h2>
                        <p className="text-lg sm:text-xl md:text-2xl">{carouselItems[activeIndex].phrase}</p>
                    </div>
                </div>

                {/* Navigation Circles */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
                    {carouselItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            className={`group relative transition-transform duration-200 ${
                                index === activeIndex ? 'scale-110' : 'hover:scale-105'
                            }`}
                        >
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 ${
                                index === activeIndex ? 'border-blue-500' : 'border-transparent'
                            } transition-colors duration-200`}>
                                <img
                                    src={item.circleImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className={`absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors duration-200 ${
                                index === activeIndex ? 'bg-blue-500' : 'bg-transparent'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AreasCarousel;
