import { FC, useState } from "react";
import { Edit } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-cards";
import "../../../App.css"; // Mantiene los estilos externos

const collaborators = [
    { id: 1, name: "Colaborador 1", image: "src/assets/team/celine.jpg", description: "Descripción del colaborador 1." },
    { id: 2, name: "Colaborador 2", image: "src/assets/team/aref.jpg", description: "Descripción del colaborador 2." },
    { id: 3, name: "Colaborador 3", image: "/images/collab3.jpg", description: "Descripción del colaborador 3." },
    { id: 4, name: "Colaborador 4", image: "/images/collab4.jpg", description: "Descripción del colaborador 4." },
    { id: 5, name: "Colaborador 5", image: "/images/collab5.jpg", description: "Descripción del colaborador 5." },
    { id: 6, name: "Colaborador 6", image: "/images/collab6.jpg", description: "Descripción del colaborador 6." },
    { id: 7, name: "Colaborador 7", image: "/images/collab7.jpg", description: "Descripción del colaborador 7." },
    { id: 8, name: "Colaborador 8", image: "/images/collab8.jpg", description: "Descripción del colaborador 8." },
    { id: 9, name: "Colaborador 9", image: "/images/collab9.jpg", description: "Descripción del colaborador 9." },
    { id: 10, name: "Colaborador 10", image: "/images/collab10.jpg", description: "Descripción del colaborador 10." },
];

const CollaboratorSection: FC = () => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const [allowSwipe, setAllowSwipe] = useState(true);

    const handleCardClick = (index: number) => {
        if (flippedIndex === index) {
            setFlippedIndex(null);
            setAllowSwipe(true);
        } else {
            setFlippedIndex(index);
            setAllowSwipe(false);
        }
    };

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Colaborador del mes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Swiper con 10 tarjetas */}
                    <div className="flex flex-col items-center">
                        <Swiper
                            effect="cards"
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="w-48 h-64"
                            allowTouchMove={allowSwipe} // Bloquea el Swipe mientras la tarjeta está volteada
                        >
                            {collaborators.map((collab, index) => (
                                <SwiperSlide key={collab.id}>
                                    <div
                                        className={`relative w-full h-full rounded-lg transition-transform duration-500 ${
                                            flippedIndex === index ? "rotate-y-180" : ""
                                        }`}
                                        onClick={() => handleCardClick(index)}
                                        style={{
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {/* Lado frontal */}
                                        <div
                                            className={`absolute inset-0 flex items-center justify-center text-white text-xl font-bold rounded-lg backface-hidden ${
                                                flippedIndex === index ? "hidden" : "flex"
                                            }`}
                                            style={{ backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={collab.image}
                                                alt={collab.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Lado trasero - ahora con fondo blanco */}
                                        <div
                                            className={`absolute inset-0 flex flex-col items-center justify-center bg-white text-black text-center px-4 rounded-lg ${
                                                flippedIndex === index ? "flex" : "hidden"
                                            }`}
                                            style={{ backfaceVisibility: "hidden" }}
                                        >
                                            <h3 className="text-lg font-bold">{collab.name}</h3>
                                            <p className="text-sm">{collab.description}</p>
                                            <button
                                                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                                                onClick={() => handleCardClick(index)}
                                            >
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <h3 className="text-xl font-semibold mt-4">Nombre</h3>
                        <p className="text-gray-600">Colaborador</p>
                    </div>

                    {/* Información sobre el colaborador */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">
                            Motivo de ser destacado
                        </h3>
                        <div className="bg-gray-100 p-6 rounded-lg min-h-[200px]"></div>
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
