import { FC } from "react";
import { motion } from "framer-motion";

/**
 * Componente FAQSection
 *
 * Esta sección proporciona un mensaje de bienvenida a la sección de preguntas frecuentes.
 * Incluye una ilustración y un mensaje informativo dentro de un contenedor destacado,
 * junto con un botón para realizar más consultas.
 */
const FAQSection: FC = () => {
    return (
        <div className="py-16 px-6 flex flex-col items-center justify-center font-poppins bg-white">
            {/* Título de la sección con animación */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-black mb-8 md:mb-12 text-center"
            >
                Preguntas Frecuentes
            </motion.h1>

            <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-6">
                {/* Contenedor del mensaje informativo con diseño mejorado */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-pink-100 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg flex-1 flex flex-col items-center text-center space-y-6"
                >
                    {/* Mensaje principal con mejor tipografía */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
                        En <span className="text-pink-600 font-bold">Make The Difference</span>,
                        estamos comprometidos con nuestro público. Si tienes alguna pregunta,
                        estaremos encantados de aclarar tus inquietudes.
                    </p>

                    {/* Botón interactivo con mejor diseño */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl shadow-md transition-all"
                    >
                        ¿Otra duda?
                    </motion.button>
                </motion.div>

                {/* Contenedor de la imagen ilustrativa (ahora arriba en móviles) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center md:justify-start mb-6 md:mb-0"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 relative">
                        <img
                            src="src/assets/faq/person.png" // Ruta de la imagen ilustrativa
                            alt="Ilustración de persona con preguntas" // Descripción accesible
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQSection;
