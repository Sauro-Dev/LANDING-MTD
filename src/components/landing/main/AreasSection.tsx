import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Componente AreasSection
 *
 * Sección que motiva a los usuarios a unirse a Make The Difference.
 * Contiene un mensaje inspirador y un botón de llamada a la acción para el formulario de voluntariado.
 */
const AreasSection: FC = () => {
    const navigate = useNavigate(); // Hook para la navegación dentro de la página

    return (
        <section className="relative py-12 sm:py-16 md:py-20 bg-white overflow-hidden font-poppins">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">

                {/* Sección de texto con título, mensaje y botón */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="w-full max-w-lg space-y-4 sm:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    {/* Título principal */}
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
                        HAZ LA DIFERENCIA
                    </h2>

                    {/* Mensaje inspirador */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-snug">
                        ¡En <span className="text-pink-600 font-bold">Make The Difference</span> buscamos alguien como tú!
                    </p>

                    {/* Botón de llamada a la acción con animación */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 sm:mt-4 bg-pink-600 text-white font-extrabold py-3 px-8 rounded-full text-xl sm:text-2xl shadow-lg md:py-4 md:px-10 md:text-2xl lg:text-3xl md:shadow-xl hover:bg-pink-700 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        onClick={() => navigate("/volunteer-form")}
                        aria-label="Únete a Make The Difference"
                    >
                        ¡ÚNETENOS!
                    </motion.button>
                </motion.div>

                {/* Imagen decorativa con su diseño original */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="w-full max-w-xs sm:max-w-sm hidden lg:block"
                >
                    <div className="relative aspect-[3/4] w-full">
                        <img
                            src="/src/assets/faq/alumn.png"
                            alt="Estudiante Make The Difference"
                            className="w-full h-full object-cover drop-shadow-lg rounded-md"
                            style={{ maskImage: "linear-gradient(black 80%, transparent)" }}
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AreasSection;