import { FC } from 'react';


const TeamSection: FC = () => {
    const teamMembers = [
        {
            id: '1',
            url: 'src/assets/team/exm1.jpg',
            name: 'Celine Flores Mostacero',
            role: 'Fundadora y Presidenta Actual',
        },
        {
            id: '2',
            url: 'src/assets/team/exm2.jpg',
            name: 'Aref Damian Buendia',
            role: 'Vicepresidente actual',
        },
        {
            id: '3',
            url: 'src/assets/team/exm3.jpg',
            name: 'Lesly Sánchez Vergaray',
            role: 'Voluntaria y Tesorera del Club',
        },
    ];

    return (
        <div className="relative py-16 bg-[#ED117F]">
            {/* Nube de título */}
            <div className="absolute left-0 md:left-10 top-[5px] flex items-center space-x-5 z-50 w-full md:w-auto">
                {/* Círculos para la nube */}
                <div className="relative hidden md:block">


                    <div
                        className="absolute w-[300px] h-[300px] bg-[#48C3E6] rounded-full left-[50px] top-[170px]"
                        style={{ boxShadow: "-26px 10px 8px 1.1px rgba(0, 0, 0, 0.25)" }}
                    ></div>
                    <div
                        className="absolute w-[350px] h-[350px] bg-[#48C3E6] rounded-full left-[-180px] top-[90px]"
                        style={{ boxShadow: "-26px 10px 8px 1.1px rgba(0, 0, 0, 0.25)" }}
                    ></div>
                    <div
                        className="absolute w-[350px] h-[350px] bg-[#48C3E6] rounded-full left-[-180px] top-[200px]"
                        style={{ boxShadow: "-26px 10px 8px 1.1px rgba(0, 0, 0, 0.25)" }}
                    ></div>

                    {/* Contenedor del texto */}
                    <div className="relative w-[280px] h-[650px] rounded-lg flex items-center justify-center leading-[55px] px-4">
                        <h2
                            className="text-white font-spartan font-bold text-[70px] text-center"
                            style={{ textShadow: "-5px 5px 5px rgba(0, 0, 0, 0.25)" }}
                        >
                            NUESTRO <br /> EQUIPO
                        </h2>
                    </div>


                </div>

                {/* Mobile title */}
                <div className="md:hidden w-full">
                    <div className="bg-[#48C3E6] py-6 px-4 rounded-lg mx-auto max-w-[300px] mb-8"
                         style={{ boxShadow: "-5px 5px 8px 1.1px rgba(0, 0, 0, 0.25)" }}>
                        <h2
                            className="text-white font-spartan font-bold text-[40px] text-center"
                            style={{ textShadow: "-3px 3px 3px rgba(0, 0, 0, 0.25)" }}
                        >
                            NUESTRO <br /> EQUIPO
                        </h2>
                    </div>
                </div>

            </div>

            {/* Contenedor principal */}
            <div className="container mx-auto px-4 md:px-[0px] mt-[120px] md:mt-[10px] w-full md:w-[85%] max-w-[1100px] md:ml-[380px]">
                {/* Contenedor de los miembros del equipo */}
                <div className="group flex flex-col md:flex-row justify-center gap-6 md:gap-4 w-full md:w-[90%] mx-auto">
                    {teamMembers.map((member) => (
                        <article
                            className="group/article relative w-full rounded-xl overflow-hidden
        md:group-hover:[&:not(:hover)]:w-[20%]
        md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%]
        transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]
        before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t
        before:from-black/50 before:transition-opacity md:before:opacity-0
        md:hover:before:opacity-100 focus-within:before:opacity-100
        after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100
        md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100
        after:absolute after:inset-0 after:bg-black/30 after:backdrop-blur
        after:rounded-lg after:transition-all focus-within:ring focus-within:ring-[#F6BE43]"
                        >
                            {/* Enlace cubriendo toda la tarjeta */}
                            <a
                                className="absolute inset-0 text-white z-10 p-3 flex flex-col justify-end"
                                href="#0"
                            >
                                {/* Título con animación */}
                                <h1
                                    className="text-xl font-medium md:whitespace-nowrap md:truncate
                md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100
                md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0
                transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]
                group-hover/article:delay-300 group-focus-within/article:delay-300"
                                >
                                    {member.name}
                                </h1>

                                {/* Descripción con animación */}
                                <span
                                    className="text-3xl font-medium md:whitespace-nowrap md:truncate
                md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100
                md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0
                transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]
                group-hover/article:delay-500 group-focus-within/article:delay-500"
                                >
            {member.role}
        </span>
                            </a>

                            {/* Imagen */}
                            <img
                                src={member.url}
                                alt={member.name}
                                width='960'
                                height='480'
                                className='object-cover h-[180px] md:h-[520px] w-full'
                            />




                        </article>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;