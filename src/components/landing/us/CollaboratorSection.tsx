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
        <div className="py-16 bg-[#ED117F]">

            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center">
                        {makers.length > 0 ? (
                            <Swiper
                                effect="cards"
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper w-60 h-80"
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            >
                                {makers.map((maker) => (
                                    <SwiperSlide key={maker.idLandingFiles} className="swiper-slide">
                                        <div className="card-container">
                                            <img
                                                src={getS3ImageUrl(maker.fileName)}
                                                alt={maker.makerName}
                                                className="card-image"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <p className="text-center text-white">No hay Makers Destacados disponibles.</p>
                        )}
                    </div>

                    {/* Texto contenedor*/}
                    <div className="relative -right-[16px] h-[650px] flex items-center justify-end leading-[55px] px-[10px]">

                        {/* Contenedor del título con las nubes amarillas */}
                        <div className="relative -right-[10px] flex items-center justify-end h-[650px] pr-[100px] overflow-hidden">
                            {/* Círculos amarillos (nubes) */}
                            <div className="absolute top-[170px] right-[150px] w-[320px] h-[320px] bg-[#F4C22E] rounded-full shadow-lg"></div>
                            <div className="absolute top-[200px] -right-20 w-[350px] h-[350px] bg-[#F4C22E] rounded-full shadow-lg"></div>
                            <div className="absolute top-[100px] -right-20 w-[350px] h-[350px] bg-[#F4C22E] rounded-full "></div>

                            {/* Título */}
                            <h2
                                className="relative -right-[80px] text-white font-spartan font-bold text-[70px] text-center"
                                style={{ textShadow: "-5px 5px 5px rgba(0, 0, 0, 0.25)" }}
                            >
                                MAKER <br /> DESTACADO
                            </h2>
                        </div>

                    </div>

                    {makers.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4">{makers[activeIndex]?.makerName}</h3>
                            <div className="bg-gray-100 p-6 rounded-lg min-h-[200px] flex items-center justify-center text-center text-lg">
                                {makers[activeIndex]?.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollaboratorSection;
