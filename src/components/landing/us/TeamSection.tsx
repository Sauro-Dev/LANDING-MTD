import { FC } from 'react';

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
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Nuestro Equipo</h2>
                <div className="group flex max-md:flex-col justify-center gap-4 w-[90%] mx-auto">
                    {teamMembers.map((member) => (
                        <article
                            key={member.id}
                            className="group/article relative w-full rounded-xl overflow-hidden
                                md:group-hover:[&:not(:hover)]:w-[20%]
                                transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]
                                shadow-lg hover:shadow-xl"
                        >
                            {/* Capa oscura con la info */}
                            <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-white text-2xl font-semibold md:opacity-0 md:translate-y-4 group-hover/article:opacity-100 group-hover/article:translate-y-0 transition-all duration-200">
                                    {member.name}
                                </h3>
                                <p className="text-gray-200 text-lg md:opacity-0 md:translate-y-4 group-hover/article:opacity-100 group-hover/article:translate-y-0 transition-all duration-200 delay-75">
                                    {member.role}
                                </p>
                            </div>
                            {/* Imagen */}
                            <img
                                src={member.url}
                                alt={member.name}
                                className="
                                    object-cover
                                    object-top
                                    h-72
                                    md:h-[500px]
                                    w-full
                                    transform
                                    transition-transform
                                    duration-300
                                    group-hover/article:scale-102
                                "
                            />
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
