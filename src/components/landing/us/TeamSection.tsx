import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-coverflow";
// @ts-ignore
import "swiper/css/pagination";
import environment from "../../../enviroment.ts";

interface TeamMember {
    idLandingFiles: number;
    fileName: string;
    makerName: string;
    description: string;
    fileSector: string;
}

const API_URL = `${environment.API_URL}/landing-files/all`;

const getFileUrl = (fileName: string): string => {
    return fileName.startsWith("http")
        ? fileName
        : `https://tu-bucket-s3.s3.amazonaws.com/${fileName}`;
};

const TeamSection: FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data: TeamMember[]) => {
                const filtered = data.filter((item) => item.fileSector === "TEAM");
                setTeamMembers(filtered);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar miembros del equipo:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="relative pt-32 pb-16 bg-[#ED117F] overflow-hidden flex items-center h-full">
            {/* Nube de título */}
            <div className="relative w-[280px] h-[280px] mb-8 left-16 flex justify-center items-center">
                <div
                    className="w-[280px] h-[280px] bg-[#48C3E6] rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: "radial-gradient(circle, #5ECFEF 0%, #48C3E6 70%)" }}
                >
                    <h2 className="text-white font-spartan font-bold text-[42px] text-center drop-shadow-md">
                        NUESTRO <br /> EQUIPO
                    </h2>
                </div>
            </div>

            {/* Swiper Coverflow */}
            {isLoading ? (
                <div className="text-white text-center py-8">Cargando equipo...</div>
            ) : teamMembers.length === 0 ? (
                <div className="text-white text-center py-8">No hay miembros del equipo registrados.</div>
            ) : (
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={50}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 60 },
                        1024: { slidesPerView: 3, spaceBetween: 70 },
                    }}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 100,
                        depth: 250,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="swiper w-full max-w-[95%] md:max-w-[85%] lg:max-w-[75%] py-12"
                >
                    {teamMembers.map((member) => (
                        <SwiperSlide
                            key={member.idLandingFiles}
                            className="swiper-slide flex justify-center items-center w-[300px] h-[300px]"
                        >
                            <article
                                className="relative w-full h-full rounded-xl overflow-hidden border-4 border-white shadow-lg"
                                aria-labelledby={`member-name-${member.idLandingFiles}`}
                            >
                                <img
                                    src={getFileUrl(member.fileName)}
                                    alt={`Foto de ${member.makerName}`}
                                    width="300"
                                    height="300"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 text-center">
                                    <h3
                                        id={`member-name-${member.idLandingFiles}`}
                                        className="text-lg font-bold text-white truncate"
                                    >
                                        {member.makerName}
                                    </h3>
                                    <p className="text-white text-sm sm:text-base truncate">
                                        {member.description}
                                    </p>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default TeamSection;
