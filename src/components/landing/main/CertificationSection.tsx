import { FC } from "react";
import { motion } from "framer-motion";

interface CertificationProps {
    image: string;
    title: string;
    description: string;
}

const Certification: FC<CertificationProps> = ({ image, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto"
        >
            <div className="w-48 h-48 mb-6 relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">{description}</p>
        </motion.div>
    );
};

const CertificationSection: FC = () => {
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
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-semibold text-center mb-12"
                >
                    Certificaciones
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {certifications.map((cert, index) => (
                        <Certification
                            key={index}
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
