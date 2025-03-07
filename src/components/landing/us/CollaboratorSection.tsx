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
        <div className="py-10 md:py-16 bg-[#ED117F] min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Contenedor IZQUIERDA: Card + Descripción */}
                <div className="flex flex-col items-center w-full md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
                    {makers.length > 0 ? (
                        <>
                            {/* Swiper de la tarjeta */}
                            <Swiper
                                effect="cards"
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="swiper w-[240px] h-[320px] z-10"
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
                                <h3 className="text-[30px] md:text-[40px] font-spartan font-semibold mb-2 text-white">
                                    {makers[activeIndex]?.makerName}
                                </h3>
                                <div className="bg-gray-100 p-4 md:p-6 border-accent border-4 rounded-lg min-h-[150px] md:min-h-[200px] flex items-center justify-center text-center text-base md:text-lg">
                                    {makers[activeIndex]?.description}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white">No hay Makers Destacados disponibles.</p>
                    )}
                </div>

                {/* Contenedor DERECHA: Nubes + Título */}
                <div className="relative flex items-center justify-center md:justify-end w-full md:w-1/2 h-[300px] md:h-[650px] order-1 md:order-2">
                    {/* Contenedor de las nubes y el título */}
                    <div className="relative flex items-center justify-center md:justify-end h-full md:pr-[20px] lg:pr-[50px] overflow-visible">
                        {/* Nubes (Círculos amarillos) - Ajustados para mejor visualización */}
                        <div className="absolute top-[50px] md:top-[170px] right-[50%] md:right-[120px] w-[200px] h-[200px] md:w-[320px] md:h-[320px] bg-[#F4C22E] rounded-full shadow-lg transform translate-x-[50%] md:translate-x-0"></div>
                        <div className="absolute top-[80px] md:top-[200px] right-[50%] md:-right-10 w-[220px] h-[220px] md:w-[350px] md:h-[350px] bg-[#F4C22E] rounded-full shadow-lg transform translate-x-[60%] md:translate-x-0"></div>
                        <div className="absolute top-[30px] md:top-[100px] right-[50%] md:-right-10 w-[220px] h-[220px] md:w-[350px] md:h-[350px] bg-[#F4C22E] rounded-full transform translate-x-[40%] md:translate-x-0"></div>

                        {/* Título MAKER DESTACADO */}
                        <h2
                            className="relative z-10 text-white font-spartan font-bold text-[40px] md:text-[70px] text-center md:text-right md:-right-[40px] lg:-right-[20px]"
                            style={{ textShadow: "-3px 3px 3px rgba(0, 0, 0, 0.25)" }}
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
