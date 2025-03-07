import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-cards";
import environment from "../../../enviroment.ts";

interface Maker {
    idLandingFiles: number;
    makerName: string;
    fileName: string;
    description: string;
    fileSector: string;
}

const API_URL = `${environment.API_URL}/landing-files/all`;

const getS3ImageUrl = (fileKey: string): string => {
    return fileKey.startsWith("http") ? fileKey : `https://tu-bucket-s3.s3.amazonaws.com/${fileKey}`;
};

const CollaboratorSection: FC = () => {
    const [makers, setMakers] = useState<Maker[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data: Maker[]) => {
                const featuredMakers = data.filter((file) => file.fileSector === "FEATURED_MAKER");
                setMakers(featuredMakers);
            })
            .catch((error) => console.error("Error cargando los Makers Destacados:", error));
    }, []);

    return (
        <div className="py-16 bg-[#ED117F] min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Contenedor IZQUIERDA: Card + Descripción */}
                <div className="flex flex-col items-center w-full md:w-1/2">
                    {makers.length > 0 ? (
                        <>
                            {/* Swiper de la tarjeta */}
                            <Swiper
                                effect="cards"
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="swiper w-[240px] h-[320px]"
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            >
                                {makers.map((maker, index) => (
                                    <SwiperSlide key={maker.idLandingFiles} className={`swiper-slide bg-slide-${index % 10}`}>
                                        <div className="card-container flex items-center justify-center w-full h-full rounded-xl text-white text-2xl font-bold">
                                            <img
                                                src={getS3ImageUrl(maker.fileName)}
                                                alt={maker.makerName}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Descripción debajo de la tarjeta */}
                            <div className="mt-6 text-center w-full px-4">
                                <h3 className="text-[40px] font-spartan font-semibold mb-2 text-white">
                                    {makers[activeIndex]?.makerName}
                                </h3>
                                <div className="bg-gray-100 p-6 border-accent border-4 rounded-lg min-h-[200px] flex items-center justify-center text-center text-lg">
                                    {makers[activeIndex]?.description}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white">No hay Makers Destacados disponibles.</p>
                    )}
                </div>

                {/* Contenedor DERECHA: Nubes + Título */}
                <div className="relative flex items-center -right-[16git px] justify-end w-full md:w-1/2 h-[650px]">
                    {/* Contenedor de las nubes y el título */}
                    <div className="relative flex items-center justify-end h-[650px] pr-[100px] overflow-hidden">
                        {/* Nubes (Círculos amarillos) */}
                        <div className="absolute top-[170px] right-[150px] w-[320px] h-[320px] bg-[#F4C22E] rounded-full shadow-lg"></div>
                        <div className="absolute top-[200px] -right-20 w-[350px] h-[350px] bg-[#F4C22E] rounded-full shadow-lg"></div>
                        <div className="absolute top-[100px] -right-20 w-[350px] h-[350px] bg-[#F4C22E] rounded-full"></div>

                        {/* Título MAKER DESTACADO */}
                        <h2
                            className="relative -right-[80px] text-white font-spartan font-bold text-[70px] text-center"
                            style={{ textShadow: "-5px 5px 5px rgba(0, 0, 0, 0.25)" }}
                        >
                            MAKER <br /> DESTACADO
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CollaboratorSection;
