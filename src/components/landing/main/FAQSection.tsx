import { FC, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Componente FAQSection
 *
 * Ahora permite regresar a la pantalla anterior y añadir un botón para contactar vía WhatsApp.
 */
const FAQSection: FC = () => {
    const [showQuestions, setShowQuestions] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Qué es Girl Up?",
            answer: "Es un movimiento que impulsa la igualdad de género y el empoderamiento femenino a nivel global. A través del liderazgo juvenil, busca reducir brechas de género y fomentar la participación activa de las jóvenes en la transformación social."
        },
        {
            question: "¿Qué significa 'Make The Difference-Girl Up'?",
            answer: "Es un espacio donde jóvenes trabajan en la equidad de género en Latinoamérica. Sus miembros, llamados 'makers', impulsan el cambio a través de acciones concretas, promoviendo respeto, unión y responsabilidad en distintas áreas."
        },
        {
            question: "¿Quiénes pueden ser parte de Make The Difference - Girl Up?",
            answer: "Cualquier persona entre 15 y 29 años con liderazgo y compromiso con la causa. No hay restricciones de género, solo el deseo de crear soluciones y trabajar en equipo para promover la igualdad de oportunidades."
        }
    ];

    return (
        <div className="py-16 px-6 flex flex-col items-center justify-center font-poppins bg-white relative">
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
                {/* Contenedor dinámico */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-pink-100 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg flex-1 flex flex-col items-center text-center space-y-6 relative"
                >
                    {showQuestions ? (
                        <div className="w-full text-left space-y-4 relative">
                            {/* Botón de regreso con color y estilo correcto */}
                            <button
                                onClick={() => setShowQuestions(false)}
                                className="absolute -top-8 left-0 p-1 rounded-full bg-pink-500 hover:bg-pink-600 transition-all shadow-md"
                            >
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </button>





                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-300 pb-2">
                                    <button
                                        onClick={() => toggleAnswer(index)}
                                        className="text-lg md:text-xl font-semibold text-gray-800 flex justify-between w-full"
                                    >
                                        {faq.question}
                                        <span>{expandedIndex === index ? "▲" : "▼"}</span>
                                    </button>
                                    {expandedIndex === index && (
                                        <p className="mt-2 text-gray-700">{faq.answer}</p>
                                    )}
                                </div>
                            ))}

                            {/* Botón de contacto por WhatsApp más pequeño y centrado */}
                            <div className="mt-6 flex justify-center">
                                <a
                                    href="https://api.whatsapp.com/send/?phone=51912609733&text=Hola%2C+me+gustar%C3%ADa+saber+m%C3%A1s+sobre+sus+servicios&type=phone_number&app_absent=0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base shadow-md transition-all"
                                >
                                    ¿Aún tienes duda?
                                </a>

                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
                                En <span className="text-pink-600 font-bold">Make The Difference</span>,
                                estamos comprometidos con nuestro público. Si tienes alguna pregunta,
                                estaremos encantados de aclarar tus inquietudes.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowQuestions(true)}
                                className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl shadow-md transition-all"
                            >
                                ¿Otra duda?
                            </motion.button>
                        </>
                    )}
                </motion.div>

                {/* Contenedor de la imagen ilustrativa (permanece siempre) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center md:justify-start mb-6 md:mb-0"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 relative">
                        <img
                            src="src/assets/faq/person.png"
                            alt="Ilustración de persona con preguntas"
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQSection;
