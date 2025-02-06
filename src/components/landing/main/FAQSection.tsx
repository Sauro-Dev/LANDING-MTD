import { FC } from 'react';
import LeafImage from '../../../assets/faq/leaf2.png';
import PersonImage from '../../../assets/faq/person.png';

const FAQSection: FC = () => (
    <div className="py-16" style={{ backgroundColor: '#F4C22E' }}>
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                    <img src={PersonImage} alt="Person" className="absolute top-10 left-0 w-32 z-10" />
                    <div className="relative">
                        <img src={LeafImage} alt="Leaf" className="w-full rounded-lg" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                            <p className="text-black font-semibold text-center mb-4">
                                En Make The diference estamos comprometidos con nuestro publico, si tienes alguna pregunta
                                estaremos dispuestos a aclarar tus inquietudes
                            </p>
                            <a
                                href="https://api.whatsapp.com/send?phone=51923411532&text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full inline-block text-center hover:bg-pink-700 transition duration-300"
                            >
                                ¿Otra duda?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default FAQSection;
