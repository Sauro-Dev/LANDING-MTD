import { FC } from 'react';


const FAQSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Preguntas Frecuentes</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                <img src="/src/assets/faq/person.png" alt="Preguntas" className="w-40 md:w-60 h-auto" />
                <div className="bg-pink-300 px-8 py-6 md:px-12 md:py-8 rounded-2xl text-center shadow-lg max-w-md">
                    <p className="text-lg leading-relaxed text-gray-800">
                        En Make The Difference estamos comprometidos con nuestro público. Si tienes alguna pregunta,
                        estaremos dispuestos a aclarar tus inquietudes.
                    </p>
                    <button className="mt-4 bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-pink-700 transition-all">
                        ¿Otra duda?
                    </button>
                </div>
            </div>
        </div>
    </div>
);
export default FAQSection;
