import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, TrendingUp } from "lucide-react";

/**
 * Componente JoinChange
 *
 * Esta sección invita a los usuarios a unirse a la iniciativa y ser parte del cambio.
 * Presenta tres pilares clave: Liderazgo, Educación y Cambio Positivo.
 */
const JoinChange: React.FC = () => {
    return (
        <section className="bg-white py-20 px-8 sm:px-12 font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* Imagen decorativa (solo visible en pantallas grandes) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="hidden lg:flex relative w-full max-w-md lg:max-w-lg"
                >
                    <div className="relative flex items-center justify-center">
                        <img
                            src="/src/assets/faq/Team2.png"
                            alt="Team members"
                            className="w-full rounded-2xl shadow-xl  hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </motion.div>

                {/* Contenido textual con pilares clave */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col space-y-8 text-center lg:text-left"
                >
                    {/* Encabezado */}
                    <div>
                        <p className="text-pink-600 font-semibold text-lg uppercase tracking-wide">
                            Sé un líder
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
                            Únete y sé parte del cambio
                        </h2>
                    </div>

                    {/* Lista de pilares con mejor espacio en móviles */}
                    <div className="space-y-6 sm:space-y-8">
                        {[
                            {
                                title: "Liderazgo",
                                description:
                                    "Fomentamos el desarrollo de habilidades de liderazgo en jóvenes para que puedan transformar sus comunidades.",
                                icon: <Users className="w-7 h-7 text-pink-600" />,
                            },
                            {
                                title: "Educación",
                                description:
                                    "Promovemos una educación inclusiva y accesible para todos, creando espacios seguros y saludables donde puedan aprender y crecer.",
                                icon: <GraduationCap className="w-7 h-7 text-pink-600" />,
                            },
                            {
                                title: "Cambio Positivo",
                                description:
                                    "Inspiramos a los jóvenes a ser agentes de cambio positivo en el mundo, construyendo un futuro más justo y equitativo.",
                                icon: <TrendingUp className="w-7 h-7 text-pink-600" />,
                            },
                        ].map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex items-center gap-4 bg-pink-100 p-6 sm:p-7 rounded-xl shadow-md"
                            >
                                <div className="bg-pink-200 p-3 rounded-lg">{pillar.icon}</div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-black">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default JoinChange;
