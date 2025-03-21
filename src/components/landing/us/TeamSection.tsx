import { FC, useEffect, useState } from 'react';
import environment from '../../../enviroment.ts';

interface TeamMember {
    idLandingFiles: number;
    fileName: string;
    makerName: string;
    description: string;
    fileSector: string;
}

const API_URL = `${environment.API_URL}/landing-files/all`;

const getFileUrl = (fileName: string): string => {
    return fileName.startsWith('http')
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
        <div className="relative pt-32 pb-16 bg-[#ED117F] overflow-hidden">
            <div className="container mx-auto px-4 mt-[50px]">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    {/* Título en nube */}
                    <div className="relative w-full md:w-1/4 mb-8 md:mb-0">
                        <div className="relative mx-auto md:mx-0 w-[280px] h-[280px]">
                            <div className="absolute w-[280px] h-[280px] bg-[#48C3E6] rounded-full
                                flex items-center justify-center"
                                 style={{
                                     boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                                     background: "radial-gradient(circle, #5ECFEF 0%, #48C3E6 70%)"
                                 }}
                            >
                                <h2
                                    className="text-white font-spartan font-bold text-[42px] text-center"
                                    style={{ textShadow: "-2px 2px 4px rgba(0, 0, 0, 0.25)" }}
                                >
                                    NUESTRO <br /> EQUIPO
                                </h2>
                            </div>
                            <div className="absolute w-[80px] h-[80px] bg-[#5ECFEF] rounded-full right-[-20px] top-[-30px]"
                                 style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                            ></div>
                            <div className="absolute w-[60px] h-[60px] bg-[#5ECFEF] rounded-full left-[-20px] bottom-[20px]"
                                 style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                            ></div>
                        </div>
                    </div>

                    {/* Miembros del equipo */}
                    <div className="w-full md:w-3/4">
                        {isLoading ? (
                            <div className="text-white text-center py-8">Cargando equipo...</div>
                        ) : teamMembers.length === 0 ? (
                            <div className="text-white text-center py-8">No hay miembros del equipo registrados.</div>
                        ) : (
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-6 w-full flex-wrap">
                                {teamMembers.map((member) => (
                                    <article
                                        key={member.idLandingFiles}
                                        className="group/article relative w-full md:w-1/3 max-w-[280px] rounded-xl overflow-hidden
                                            border-4 border-white shadow-md"
                                        aria-labelledby={`member-name-${member.idLandingFiles}`}
                                    >
                                        {/* Imagen */}
                                        <img
                                            src={getFileUrl(member.fileName)}
                                            alt={`Foto de ${member.makerName}`}
                                            width='400'
                                            height='300'
                                            className='object-fit h-[250px] sm:h-[280px] md:h-[320px] w-full'
                                            loading="lazy"
                                            decoding="async"
                                        />

                                        {/* Nombre y cargo */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent
                                            flex flex-col justify-end p-3 text-center">
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
