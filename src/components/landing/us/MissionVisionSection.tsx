import { FC } from 'react';

const MissionVisionSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-6">Misión</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-700 text-center">Contenido de la misión...</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-6">Visión</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-700 text-center">Contenido de la visión...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MissionVisionSection;