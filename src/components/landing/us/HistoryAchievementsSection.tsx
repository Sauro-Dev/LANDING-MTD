import { FC } from 'react';

const HistoryAchievementsSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8">Historia</h2>
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <p className="text-gray-700">Contenido de la historia...</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8">Logros</h2>
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                <span>Logro destacado 1</span>
                            </li>
                            {/* Más logros */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HistoryAchievementsSection;