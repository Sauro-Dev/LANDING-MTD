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
        <div className="relative py-16 bg-white flex flex-col items-center justify-center overflow-hidden font-poppins">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-12 text-center lg:text-left">

                {/* Sección de texto con título, mensaje y botón */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-lg space-y-6 flex flex-col items-center lg:items-start"
                >
                    {/* Título principal */}
                    <h2 className="text-4xl font-extrabold text-black">
                        HAZ LA DIFERENCIA
                    </h2>

                    {/* Mensaje inspirador */}
                    <p className="text-xl md:text-4xl font-medium text-gray-800 leading-snug">
                        ¡En <span className="text-pink-600 font-bold">Make The Difference</span> buscamos alguien como tú!
                    </p>

                    {/* Botón de llamada a la acción con animación */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 text-white font-extrabold py-3 px-8 rounded-full text-2xl shadow-lg md:py-4 md:px-10 md:text-3xl md:shadow-xl hover:bg-pink-700 transition-all"
                        onClick={() => navigate("/volunteer-form")}
                    >
                        ¡ÚNETENOS!
                    </motion.button>
                </motion.div>

                {/* Imagen decorativa con su diseño original */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-1/2 max-w-sm lg:flex hidden justify-center"
                >
                    <img
                        src="/src/assets/faq/alumn.png"
                        alt="Estudiante Make The Difference"
                        className="w-full object-cover drop-shadow-lg rounded-md"
                        style={{ maskImage: "linear-gradient(black 80%, transparent)" }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default AreasSection;
