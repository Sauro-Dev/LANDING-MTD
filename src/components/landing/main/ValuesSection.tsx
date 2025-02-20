import { FC } from 'react';
import IconsCarousel from "../../ui/carousel/IconsCarousel";

const ValuesSection: FC = () => {
    return (
        <section className="relative w-full bg-white">
            {/* Contenedor Principal */}
            <div className="container mx-auto flex flex-row items-center justify-between py-16">
                {/* Contenedor de imagen con destello */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all">
                    </div>
                    <img
                        src="/src/assets/faq/alumn2.png"
                        alt="Líder"
                        className="w-80 md:w-96 h-auto relative z-10 drop-shadow-xl"
                    />
                </div>

                <div className="text-right max-w-2xl relative">
                    <p className="text-lg font-semibold text-gray-700 absolute -top-6 right-0">Sé un líder</p>
                    <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-16">Únete Y Sé Parte Del Cambio</h2>
                    <div className="space-y-16">
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-800 text-right">Liderazgo</h4>
                                <p className="text-lg text-gray-600 text-right">Fomentamos el desarrollo de habilidades de liderazgo en jóvenes para que puedan guiar y transformar sus comunidades.</p>
                            </div>
                            <img src="/src/assets/faq/lit.png" alt="Liderazgo" className="w-12 h-12" />
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-800 text-right">Educación</h4>
                                <p className="text-lg text-gray-600 text-right">Promovemos una educación inclusiva y accesible para todos los jóvenes, creando espacios seguros y saludables donde puedan aprender y crecer.</p>
                            </div>
                            <img src="/src/assets/faq/edu.png" alt="Educación" className="w-12 h-12" />
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-800 text-right">Cambio Positivo</h4>
                                <p className="text-lg text-gray-600 text-right">Inspiramos a los jóvenes a ser agentes de cambio positivo en el mundo para construir un futuro más justo y equitativo.</p>
                            </div>
                            <img src="/src/assets/faq/cam.png" alt="Cambio Positivo" className="w-12 h-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección para Area.png */}
            <div className="relative w-full aspect-[1440/740] overflow-hidden">
                <img src="/src/assets/faq/Area.png" alt="Proyectos Medioambientales" className="w-full h-full object-cover" />
            </div>

            {/* Sección para el Carrusel de Iconos */}
            <IconsCarousel />
        </section>
    );
};

export default ValuesSection;
