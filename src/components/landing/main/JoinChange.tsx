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
        <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 font-poppins" aria-labelledby="join-change-heading">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Imagen decorativa (visible en pantallas grandes y medianas) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="hidden lg:flex justify-center items-center order-2 lg:order-1 w-full"
                >
                    <div className="relative aspect-[4/3] w-full max-w-md mx-auto">
                        <img
                            src="/src/assets/faq/Team2.png"
                            alt="Equipo de Make The Difference colaborando juntos"
                            className="w-full h-full object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                </motion.div>

                {/* Contenido textual con pilares clave */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col space-y-6 sm:space-y-8 order-1 lg:order-2"
                >
                    {/* Encabezado */}
                    <div className="text-center lg:text-left">
                        <p className="text-pink-600 font-semibold text-base sm:text-lg uppercase tracking-wide mb-2">
                            Sé un líder
                        </p>
                        <h2 id="join-change-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">
                            Únete y sé parte del cambio
                        </h2>
                    </div>

                    {/* Lista de pilares con mejor espacio y responsividad */}
                    <div className="grid gap-4 sm:gap-6 md:gap-8">
                        {[
                            {
                                title: "Liderazgo",
                                description:
                                    "Fomentamos el desarrollo de habilidades de liderazgo en jóvenes para que puedan transformar sus comunidades.",
                                icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" aria-hidden="true" />,
                            },
                            {
                                title: "Educación",
                                description:
                                    "Promovemos una educación inclusiva y accesible para todos, creando espacios seguros y saludables donde puedan aprender y crecer.",
                                icon: <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" aria-hidden="true" />,
                            },
                            {
                                title: "Cambio Positivo",
                                description:
                                    "Inspiramos a los jóvenes a ser agentes de cambio positivo en el mundo, construyendo un futuro más justo y equitativo.",
                                icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" aria-hidden="true" />,
                            },
                        ].map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-pink-50 p-5 sm:p-6 md:p-7 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-pink-200 p-3 rounded-lg flex-shrink-0 self-center sm:self-start">
                                    {pillar.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-black mb-1 text-center sm:text-left">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg text-center sm:text-left">
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