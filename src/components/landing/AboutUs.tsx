import { FC } from 'react';
import { Edit } from 'lucide-react';
import Navbar from "../common/Navbar.tsx";

// Componente para las tarjetas del equipo
interface TeamMemberCardProps {
    role: string;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ role }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
        <h3 className="text-xl font-semibold text-purple-600">{role}</h3>
    </div>
);

// Sección del Equipo
const TeamSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TeamMemberCard role="Vicepresidente" />
                <TeamMemberCard role="Presidente" />
                <TeamMemberCard role="Tesorero" />
            </div>
        </div>
    </div>
);

// Sección Colaborador del Mes
const CollaboratorSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Colaborador del mes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center">
                    <div className="w-48 h-64 bg-gray-200 rounded-lg mb-4" />
                    <h3 className="text-xl font-semibold">Nombre</h3>
                    <p className="text-gray-600">colaborador</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Motivo de ser destacado</h3>
                    <div className="bg-gray-100 p-6 rounded-lg min-h-[200px]"></div>
                    <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                        <Edit size={20} />
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// Sección Misión y Visión
const MissionVisionSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-6">Misión</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-700 text-center">Contenido de la misión...</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-6">Visión</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-700 text-center">Contenido de la visión...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Sección Historia y Logros
const HistoryAchievementsSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8">Historia</h2>
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <p className="text-gray-700">Contenido de la historia...</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8">Logros</h2>
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                <span>Logro destacado 1</span>
                            </li>
                            {/* Más logros aquí */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Sección Línea de Tiempo
const TimelineSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Línea de Tiempo</h2>
            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-600"></div>
                <div className="space-y-12">
                    {[2020, 2021, 2022, 2023].map((year) => (
                        <div key={year} className="relative flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-600 absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pr-8 text-right">
                                <h3 className="font-bold">{year}</h3>
                                <p className="text-gray-600">Evento importante...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Footer actualizado
const Footer: FC = () => (
    <footer className="bg-black text-white py-8">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="space-x-4">
                    <a href="#" className="hover:text-pink-300">Facebook</a>
                    <a href="#" className="hover:text-pink-300">Instagram</a>
                    <a href="#" className="hover:text-pink-300">Twitter</a>
                    <a href="#" className="hover:text-pink-300">TikTok</a>
                </div>
                <div className="mt-4 md:mt-0">
                    <h3 className="font-bold mb-2">CONTÁCTANOS</h3>
                    <p>example@hotmail.com</p>
                    <p>+51 111222333</p>
                </div>
            </div>
        </div>
    </footer>
);

// Componente Principal Nosotros
const AboutUs: FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <TeamSection />
            <CollaboratorSection />
            <MissionVisionSection />
            <HistoryAchievementsSection />
            <TimelineSection />
            <Footer />
        </div>
    );
};

export default AboutUs;