import { FC } from "react";
import { motion } from "framer-motion";

/**
 * Interfaz CertificationProps
 * Define las propiedades que recibe el componente `Certification`,
 * incluyendo la imagen, título y descripción de la certificación.
 */
interface CertificationProps {
    image: string;      // Ruta de la imagen de la certificación
    title: string;      // Nombre de la certificación
    description: string; // Descripción breve de la certificación
}

/**
 * Componente Certification
 *
 * Representa una tarjeta individual de certificación con animación de aparición.
 */
const Certification: FC<CertificationProps> = ({ image, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center p-4 sm:p-5 md:p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full"
        >
            {/* Imagen de la certificación */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 sm:mb-5 md:mb-6 relative flex items-center justify-center">
                <img
                    src={image}
                    alt={`Logo de ${title}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
            </div>

            {/* Nombre de la certificación */}
            <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center">{title}</h3>

            {/* Descripción de la certificación */}
            <p className="text-xs sm:text-sm text-gray-600 text-center mt-2 flex-grow">{description}</p>
        </motion.div>
    );
};

/**
 * Componente CertificationSection
 *
 * Muestra una sección con todas las certificaciones obtenidas por la organización.
 */
const CertificationSection: FC = () => {
    // Lista de certificaciones con sus respectivas imágenes, títulos y descripciones.
    const certifications = [
        {
            image: "src/assets/faq/upn.png",
            title: "UPN",
            description: "Ganadores de la 5ta edición Fondo UPN de Responsabilidad Social.",
        },
        {
            image: "src/assets/faq/munilima.jpg",
            title: "Municipalidad de Lima",
            description: "Acreditación de la Municipalidad de Lima para ser parte de la Red Metropolitana para Organizaciones Juveniles.",
        },
        {
            image: "src/assets/faq/sinavol.png",
            title: "Volunteering",
            description: "Inscripción a la SUNARP y Acreditación del SINAVOL, reforzando nuestro compromiso legal y operativo.",
        },
        {
            image: "src/assets/faq/yes.jpg",
            title: "YES",
            description: "Organización finalista del Fondo de aceleración a iniciativas sociales Youth Empowerment Support en 2023.",
        },
    ];

    return (
        <section 
            className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"
            aria-labelledby="certifications-heading"
        >
            <div className="max-w-7xl mx-auto">
                {/* Título de la sección con animación */}
                <motion.h2
                    id="certifications-heading"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black text-center mb-8 sm:mb-10 md:mb-12"
                >
                    Certificaciones
                </motion.h2>

                {/* Grid de tarjetas de certificación con mejor responsividad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                    {certifications.map((cert, index) => (
                        <Certification
                            key={`certification-${index}`}
                            image={cert.image}
                            title={cert.title}
                            description={cert.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
