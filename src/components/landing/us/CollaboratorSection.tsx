import { FC, useState } from "react";
import { Edit } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-cards";
import "../../../App.css"; // Asegúrate de que la ruta sea correcta

const collaborators = [
    { name: "Nombre 1", image: "src/assets/team/celine.jpg", description: "Descripción del colaborador 1." },
    { name: "Nombre 2", image: "src/assets/team/aref.jpg", description: "Descripción del colaborador 2." },
    { name: "Nombre 3", image: "/images/collab3.jpg", description: "Descripción del colaborador 3." },
    { name: "Nombre 4", image: "/images/collab4.jpg", description: "Descripción del colaborador 4." },
    { name: "Nombre 5", image: "/images/collab5.jpg", description: "Descripción del colaborador 5." },
    { name: "Nombre 6", image: "/images/collab6.jpg", description: "Descripción del colaborador 6." },
    { name: "Nombre 7", image: "/images/collab7.jpg", description: "Descripción del colaborador 7." },
    { name: "Nombre 8", image: "/images/collab8.jpg", description: "Descripción del colaborador 8." },
    { name: "Nombre 9", image: "/images/collab9.jpg", description: "Descripción del colaborador 9." },
    { name: "Nombre 10", image: "/images/collab10.jpg", description: "Descripción del colaborador 10." },
];

const CollaboratorSection: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Colaborador del mes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Swiper Carrusel */}
                    <div className="flex flex-col items-center">
                        <Swiper
                            effect="cards"
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper w-60 h-80" // Ajuste de tamaño de la carta
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Cambia la descripción según la tarjeta activa
                        >
                            {collaborators.map((collab, index) => (
                                <SwiperSlide key={index} className="flex items-center justify-center">
                                    <img
                                        src={collab.image}
                                        alt={collab.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Información sobre el colaborador */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">{collaborators[activeIndex].name}</h3>
                        <div className="bg-gray-100 p-6 rounded-lg min-h-[200px] flex items-center justify-center text-center text-lg">
                            {collaborators[activeIndex].description}
                        </div>
                        <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                            <Edit size={20} />
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollaboratorSection;
