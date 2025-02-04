import { FC } from 'react';

const FAQSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <button className="mt-4 text-purple-600 font-bold">¿Otra duda?</button>
                </div>
            </div>
        </div>
    </div>
);

export default FAQSection;