import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white" aria-labelledby="faq-heading">
            {/* Improved heading structure and spacing */}
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    id="faq-heading"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-8 sm:mb-12 text-center"
                >
                    Preguntas Frecuentes
                </motion.h2>

                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                    {/* FAQ Content Container - Spans 3 columns on md+ screens */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-3 bg-pink-100 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg"
                    >
                        {showQuestions ? (
                            <div className="space-y-6" role="region" aria-label="Lista de preguntas frecuentes">
                                {/* Back button with improved accessibility */}
                                <button
                                    onClick={() => setShowQuestions(false)}
                                    className="group absolute -top-4 left-4 p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                    aria-label="Regresar a la introducción"
                                >
                                    <ArrowLeft className="w-6 h-6 text-white" aria-hidden="true" />
                                </button>

                                {/* FAQ List with improved spacing and accessibility */}
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div 
                                            key={index} 
                                            className="border-b border-pink-200 last:border-b-0"
                                        >
                                            <button
                                                onClick={() => toggleAnswer(index)}
                                                className="w-full py-4 text-left flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg"
                                                aria-expanded={expandedIndex === index}
                                                aria-controls={`faq-answer-${index}`}
                                            >
                                                <span className="text-base sm:text-lg font-semibold text-gray-800 flex-1">
                                                    {faq.question}
                                                </span>
                                                <motion.span
                                                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-pink-600 flex-shrink-0"
                                                    aria-hidden="true"
                                                >
                                                    {expandedIndex === index ? "▲" : "▼"}
                                                </motion.span>
                                            </button>

                                            <AnimatePresence>
                                                {expandedIndex === index && (
                                                    <motion.div
                                                        id={`faq-answer-${index}`}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="py-4 text-gray-700 text-sm sm:text-base">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {/* WhatsApp button with improved accessibility */}
                                <div className="pt-6 flex justify-center">
                                    <a
                                        href="https://api.whatsapp.com/send/?phone=51912609733&text=Hola%2C+me+gustar%C3%ADa+saber+m%C3%A1s+sobre+sus+servicios&type=phone_number&app_absent=0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        aria-label="Contactar por WhatsApp para más información"
                                    >
                                        ¿Aún tienes duda?
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-6">
                                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                                    En <span className="text-pink-600 font-bold">Make The Difference</span>,
                                    estamos comprometidos con nuestro público. Si tienes alguna pregunta,
                                    estaremos encantados de aclarar tus inquietudes.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowQuestions(true)}
                                    className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full px-6 py-3 text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                    aria-label="Ver preguntas frecuentes"
                                >
                                    ¿Otra duda?
                                </motion.button>
                            </div>
                        )}
                    </motion.div>

                    {/* Image Container - Spans 2 columns on md+ screens */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2 flex justify-center items-start"
                    >
                        <div className="w-40 sm:w-48 md:w-full max-w-md aspect-square relative">
                            <img
                                src="src/assets/faq/person.png"
                                alt="Ilustración decorativa de persona con preguntas"
                                className="w-full h-full object-contain drop-shadow-lg"
                                aria-hidden="true"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
