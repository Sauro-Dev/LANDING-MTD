import { FC, useState, useEffect } from "react";
import { Edit } from "lucide-react";
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
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Colaborador del mes
                </h2>
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
                            <p className="text-center text-gray-500">No hay Makers Destacados disponibles.</p>
                        )}
                    </div>

                    {makers.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4">{makers[activeIndex]?.makerName}</h3>
                            <div className="bg-gray-100 p-6 rounded-lg min-h-[200px] flex items-center justify-center text-center text-lg">
                                {makers[activeIndex]?.description}
                            </div>
                            <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                                <Edit size={20} />
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollaboratorSection;
