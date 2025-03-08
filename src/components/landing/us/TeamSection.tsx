import { FC, memo } from 'react';

const TeamSection: FC = () => {
    const teamMembers = [
        {
            id: '1',
            url: 'src/assets/team/celine.jpg',
            name: 'Celine Flores Mostacero',
            role: 'Fundadora y Presidenta Actual',
        },
        {
            id: '2',
            url: 'src/assets/team/aref.jpg',
            name: 'Aref Damian Buendia',
            role: 'Vicepresidente actual',
        },
        {
            id: '3',
            url: 'src/assets/team/lesly.jpg',
            name: 'Lesly Sánchez Vergaray',
            role: 'Voluntaria y Tesorera del Club',
        },
    ];

    return (
        <div className="relative pt-32 pb-16 bg-[#ED117F] overflow-hidden">
            {/* Diseño integrado - Cloud y miembros centrados juntos */}
            <div className="container mx-auto px-4 mt-[50px]">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    {/* Cloud design - Ahora como parte del layout principal */}
                    <div className="relative w-full md:w-1/4 mb-8 md:mb-0">
                        <div className="relative mx-auto md:mx-0 w-[280px] h-[280px]">
                            {/* Círculo principal */}
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
                            
                            {/* Decoración adicional */}
                            <div className="absolute w-[80px] h-[80px] bg-[#5ECFEF] rounded-full right-[-20px] top-[-30px]"
                                style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                            ></div>
                            <div className="absolute w-[60px] h-[60px] bg-[#5ECFEF] rounded-full left-[-20px] bottom-[20px]"
                                style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                            ></div>
                        </div>
                    </div>

                    {/* Contenedor de los miembros del equipo */}
                    <div className="w-full md:w-3/4">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-6 w-full">
                            {teamMembers.map((member) => (
                                <article
                                    key={member.id}
                                    className="group/article relative w-full md:w-1/3 max-w-[280px] rounded-xl overflow-hidden
                                        border-4 border-white shadow-md"
                                    aria-labelledby={`member-name-${member.id}`}
                                >
                                    {/* Imagen */}
                                    <img
                                        src={member.url}
                                        alt={`Foto de ${member.name}`}
                                        width='400'
                                        height='300'
                                        className='object-cover h-[250px] sm:h-[280px] md:h-[320px] w-full'
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    
                                    {/* Nombre y rol visible siempre */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
                                        flex flex-col justify-end p-3 text-center">
                                        <h3
                                            id={`member-name-${member.id}`}
                                            className="text-lg font-bold text-white truncate"
                                        >
                                            {member.name}
                                        </h3>
                                        <p className="text-white text-sm sm:text-base truncate">
                                            {member.role}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(TeamSection);