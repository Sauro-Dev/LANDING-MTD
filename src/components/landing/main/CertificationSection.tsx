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
            initial={{ opacity: 0, y: 30 }} // Desaparecido y desplazado hacia abajo
            whileInView={{ opacity: 1, y: 0 }} // Aparece con desplazamiento hacia arriba
            viewport={{ once: false, amount: 0.2 }} // Asegura que la animación funcione al hacer scroll
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 max-w-xs mx-auto"
        >
            {/* Imagen de la certificación */}
            <div className="w-48 h-48 mb-6 relative">
                <img
                    src={image}  // Ruta de la imagen
                    alt={title}  // Descripción accesible
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Nombre de la certificación */}
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>

            {/* Descripción de la certificación */}
            <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
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
        <motion.section
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="py-16 px-6 bg-white"
        >
            <div className="container mx-auto">
                {/* Título de la sección con animación */}
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-extrabold text-black text-center mb-12"
                >
                    Certificaciones
                </motion.h2>

                {/* Grid de tarjetas de certificación con mayor margen en móviles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {certifications.map((cert, index) => (
                        <Certification
                            key={index} // Uso del índice como clave (mejor si fuera un ID único)
                            image={cert.image}
                            title={cert.title}
                            description={cert.description}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default CertificationSection;
