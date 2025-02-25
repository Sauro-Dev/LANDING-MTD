import React, { useState } from 'react';

/**
 * Interfaz para definir la estructura de cada elemento del carrusel.
 */
interface CarouselItem {
    id: number;
    image: string;        // Imagen de fondo de la diapositiva
    circleImage: string;  // Imagen del botón de navegación circular
    title: string;        // Título de la diapositiva
    phrase: string;       // Frase descriptiva de la diapositiva
}

/**
 * Componente AreasCarousel
 *
 * Este componente muestra un carrusel interactivo con diferentes áreas de impacto.
 * Incluye una imagen de fondo destacada y un grupo de botones circulares para la navegación.
 */
const AreasCarousel: React.FC = () => {
    // Datos del carrusel con diferentes áreas temáticas
    const carouselItems: CarouselItem[] = [
        {
            id: 1,
            image: "src/assets/faq/areascarousel1.jpg",
            circleImage: "src/assets/faq/MEDIOAMBIENTE.png",
            title: "Proyectos Comunitarios",
            phrase: "Transformando vidas, construyendo comunidades",
        },

        /* Falta modificar las imágenes del id 2 en adelante, aún por definir según el diseño de Figma */

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

    // Estado para rastrear qué diapositiva está activa en el carrusel
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
                {/* Sección de la imagen principal del carrusel */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-6 sm:mb-8 lg:mb-12 overflow-hidden rounded-xl sm:rounded-2xl">
                    {/* Imagen de fondo de la diapositiva activa */}
                    <img
                        src={carouselItems[activeIndex].image}
                        alt={carouselItems[activeIndex].title}
                        className="w-full h-full object-cover"
                    />
                    {/* Superposición de degradado para mejorar la visibilidad del texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    {/* Contenido de la diapositiva con título y frase */}
                    <div className="absolute bottom-0 inset-x-0 text-white text-center p-4 sm:p-6 lg:pb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
                            {carouselItems[activeIndex].title}
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl">
                            {carouselItems[activeIndex].phrase}
                        </p>
                    </div>
                </div>

                {/* Botones de navegación en forma de círculos */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
                    {carouselItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(index)} // Cambia la diapositiva activa al hacer clic
                            className={`group relative transition-transform duration-200 ${
                                index === activeIndex ? 'scale-110' : 'hover:scale-105'
                            }`}
                        >
                            {/* Imagen circular con borde resaltado si está activa */}
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 ${
                                index === activeIndex ? 'border-blue-500' : 'border-transparent'
                            } transition-colors duration-200`}>
                                <img
                                    src={item.circleImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Indicador de selección debajo del botón activo */}
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
