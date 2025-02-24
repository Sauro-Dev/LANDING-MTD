import React from 'react';
import { Users, GraduationCap, TrendingUp } from 'lucide-react';

const JoinChange: React.FC = () => {
    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/70 rounded-10xl blur-xl group-hover:blur-2xl transition-all" />
                        <img
                            src="/src/assets/faq/Team1.png"
                            alt="Team members"
                            className="relative drop-shadow-xl"
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-8">
                        <div className="text-right">
                            <p className="text-bl font-medium">Sé un líder</p>
                            <h2 className="text-4xl font-bold text-blue-950 text-navy-900 mt-2">
                                Únete Y Sé Parte Del Cambio
                            </h2>
                        </div>

                        {/* Features */}
                        <div className="space-y-8">
                            {/* Liderazgo */}
                            <div className="flex items-start justify-end gap-4">
                                <div className="text-right">
                                    <h3 className="font-semibold text-lg text-navy-900">Liderazgo</h3>
                                    <p className="text-gray-600 mt-1">
                                        Fomentamos el desarrollo de habilidades de liderazgo en jóvenes para que puedan guiar y transformar sus comunidades.
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>

                            {/* Educación */}
                            <div className="flex items-start justify-end gap-4">
                                <div className="text-right">
                                    <h3 className="font-semibold text-lg text-navy-900">Educación</h3>
                                    <p className="text-gray-600 mt-1">
                                        Promovemos una educación inclusiva y accesible para todos los jóvenes, creando espacios seguros y saludables donde puedan aprender y crecer.
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>

                            {/* Cambio Positivo */}
                            <div className="flex items-start justify-end gap-4">
                                <div className="text-right">
                                    <h3 className="font-semibold text-lg text-navy-900">Cambio Positivo</h3>
                                    <p className="text-gray-600 mt-1">
                                        Inspiramos a los jóvenes a ser agentes de cambio positivo en el mundo para construir un futuro más justo y equitativo.
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinChange;
