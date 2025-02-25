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
            initial={{ opacity: 0, y: 20 }} // Animación inicial (desaparecido y desplazado hacia abajo)
            whileInView={{ opacity: 1, y: 0 }} // Aparece cuando entra en la vista
            transition={{ duration: 0.5 }} // Duración de la animación
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto"
        >
            {/* Imagen de la certificación */}
            <div className="w-48 h-48 mb-6 relative">
                <img
                    src={image}  // Ruta de la imagen
                    alt={title}  // Descripción accesible
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Descripción de la certificación */}
            <p className="text-sm text-gray-600 text-center mt-4">{description}</p>
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
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">

                {/* Título de la sección con animación */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }} // Desaparece y está desplazado hacia arriba inicialmente
                    animate={{ opacity: 1, y: 0 }} // Aparece con desplazamiento hacia abajo
                    className="text-4xl font-semibold text-center mb-12"
                >
                    Certificaciones
                </motion.h2>

                {/* Grid de tarjetas de certificación */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </section>
    );
};

export default CertificationSection;
