import { FC } from 'react';

/**
 * Componente FAQSection
 *
 * Esta sección proporciona un mensaje de bienvenida a la sección de preguntas frecuentes.
 * Incluye una ilustración y un mensaje informativo dentro de un contenedor destacado,
 * junto con un botón para realizar más consultas.
 */
const FAQSection: FC = () => {
    return (
        <div className="py-8 flex flex-col items-center justify-center p-4">

            {/* Título de la sección */}
            <h1 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center">
                Preguntas Frecuentes
            </h1>

            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4">

                {/* Contenedor de la imagen ilustrativa */}
                <div className="flex justify-center md:justify-end">
                    <div className="w-28 h-28 md:w-48 md:h-48 lg:w-64 lg:h-64 relative">
                        <img
                            src="src/assets/faq/person.png" // Ruta de la imagen ilustrativa
                            alt="Ilustración de persona con preguntas" // Descripción accesible
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Contenedor rosa con el mensaje informativo */}
                <div className="bg-pink-300 rounded-xl md:rounded-[40px] p-4 md:p-6 lg:p-8 text-center flex-1 flex flex-col items-center gap-4">

                    {/* Mensaje principal */}
                    <p className="text-sm md:text-lg lg:text-2xl leading-relaxed text-black">
                        En Make The Difference estamos comprometidos con nuestro público,
                        si tienes alguna pregunta estaremos dispuestos a aclarar tus inquietudes.
                    </p>

                    {/* Botón para realizar más preguntas */}
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-pink-800 rounded-full
                        px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg
                        transition-all duration-300 transform hover:scale-105"
                    >
                        ¿Otra duda?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
