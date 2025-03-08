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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Maker[]) => {
                const featuredMakers = data.filter((file) => file.fileSector === "FEATURED_MAKER");
                setMakers(featuredMakers);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error cargando los Makers Destacados:", error);
                setError("No se pudieron cargar los Makers Destacados");
                setIsLoading(false);
            });
    }, []);

    return (
        <section 
            className="py-8 sm:py-12 md:py-16 bg-[#ED117F] w-full overflow-hidden"
            aria-labelledby="featured-maker-heading"
        >
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

                {/* Left Container: Card + Description */}
                <div className="flex flex-col items-center w-full md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-[400px]">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-white">Cargando...</p>
                        </div>
                    ) : error ? (
                        <div className="text-white bg-red-500/20 p-4 rounded-lg" role="alert">
                            {error}
                        </div>
                    ) : makers.length > 0 ? (
                        <>
                            {/* Card Swiper */}
                            <div className="w-full flex justify-center">
                                <Swiper
                                    effect="cards"
                                    grabCursor={true}
                                    modules={[EffectCards]}
                                    className="swiper w-[240px] sm:w-[280px] h-[320px] sm:h-[380px]"
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                    aria-label="Galería de makers destacados"
                                >
                                    {makers.map((maker, index) => (
                                        <SwiperSlide 
                                            key={maker.idLandingFiles} 
                                            className={`swiper-slide bg-slide-${index % 10}`}
                                            aria-label={`Maker: ${maker.makerName}`}
                                        >
                                            <div className="card-container flex items-center justify-center w-full h-full rounded-xl text-white text-2xl font-bold">
                                                <img
                                                    src={getS3ImageUrl(maker.fileName)}
                                                    alt={maker.makerName}
                                                    className="w-full h-full object-cover rounded-xl"
                                                    loading={index < 2 ? "eager" : "lazy"}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Description below card */}
                            <div className="mt-6 text-center w-full max-w-md mx-auto">
                                <h3 className="text-2xl sm:text-3xl md:text-[40px] font-spartan font-semibold mb-2 text-white">
                                    {makers[activeIndex]?.makerName}
                                </h3>
                                <div 
                                    className="bg-gray-100 p-4 sm:p-6 border-[#F4C22E] border-4 rounded-lg min-h-[100px] sm:min-h-[120px] flex items-center justify-center text-center text-base sm:text-lg shadow-lg"
                                >
                                    {makers[activeIndex]?.description}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white p-4 bg-white/10 rounded-lg">
                            No hay Makers Destacados disponibles.
                        </p>
                    )}
                </div>

                {/* Right Container: Clouds + Title */}
                <div className="relative flex items-center justify-center md:justify-end w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-[500px] order-1 md:order-2">
                    {/* Mobile title - visible only on small screens */}
                    <div className="md:hidden w-full">
                        <h2
                            id="featured-maker-heading-mobile"
                            className="text-white font-spartan font-bold text-4xl sm:text-5xl text-center"
                            style={{ textShadow: "-3px 3px 3px rgba(0, 0, 0, 0.25)" }}
                        >
                            MAKER <br /> DESTACADO
                        </h2>
                    </div>
                    
                                                            {/* Clouds and title container - desktop */}
                    <div className="hidden md:flex relative w-full h-full items-center">
                        {/* Single yellow circle with perfect positioning */}
                        <div className="absolute right-[40px] top-1/2 -translate-y-1/2">
                            <div 
                                className="w-[320px] h-[320px] bg-[#F4C22E] rounded-full"
                                style={{ 
                                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
                                }}
                            ></div>
                        </div>

                        {/* Desktop title - centered on the circle */}
                        <div className="absolute right-[70px] top-1/2 -translate-y-1/2 z-10 text-center w-[260px]">
                            <h2
                                id="featured-maker-heading"
                                className="text-white font-spartan font-bold text-[50px] leading-tight"
                                style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.2)" }}
                            >
                                MAKER <br /> DESTACADO
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollaboratorSection;