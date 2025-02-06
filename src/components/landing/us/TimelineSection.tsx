import { FC } from 'react';

const TimelineSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Línea de Tiempo</h2>
            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-600"></div>
                <div className="space-y-12">
                    {[2020, 2021, 2022, 2023].map((year) => (
                        <div key={year} className="relative flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-600 absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pr-8 text-right">
                                <h3 className="font-bold">{year}</h3>
                                <p className="text-gray-600">Evento importante...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default TimelineSection;