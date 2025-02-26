import { FC, useState } from "react";

const MissionVisionSection: FC = () => {
    // Estados para alternar entre imagen y texto
    const [showMissionText, setShowMissionText] = useState(false);
    const [showVisionText, setShowVisionText] = useState(false);

    return (
        <div className="relative py-16 bg-white flex items-center justify-center overflow-hidden">
            {/* Fondos degradados más visibles */}
            <div className="absolute inset-0 flex justify-end items-center">
                <div className="w-[500px] h-[400px] bg-[#3DB6B1] rounded-full blur-2xl opacity-70 left-80 top-[180px] absolute"></div>
                <div className="w-[500px] h-[400px] bg-yellow-400 rounded-full blur-2xl opacity-70 right-80 top-[180px] absolute"></div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                {/* Sección Misión */}
                <div className="relative w-1/2 flex flex-col items-end text-center group">
                    <h2 className="text-[90px] font-semibold text-[#3DB6B1] leading-none tracking-tighter underline z-20">
                        Misión
                    </h2>
                    <div
                        className="relative mt-4 w-[450px] h-[500px] cursor-pointer"
                        onClick={() => setShowMissionText(!showMissionText)}
                    >
                        {!showMissionText ? (
                            <>
                                <img
                                    src="/src/assets/missionVission/mision1.png"
                                    alt="Misión"
                                    className="rounded-lg w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:opacity-0"
                                />
                                <img
                                    src="/src/assets/missionVission/mision2.png"
                                    alt="Misión Hover"
                                    className="rounded-lg w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 absolute top-0 left-0 group-hover:opacity-100"
                                />
                            </>
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-black p-6 rounded-lg shadow-lg border-4 border-[#3DB6B1] transition-all duration-500">
                                <p className="text-2xl font-normal text-[#3DB6B1] font-[Poppins]">
                                    Educar a los jóvenes y generar un ambiente inclusivo, saludable y confiable, que los anime a desarrollar sus habilidades y potencialidades. <br /><br />
                                    Inspirar a generar un cambio positivo en el mundo, logrando que sea descentralizado para todas las personas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección Visión */}
                <div className="relative w-1/2 flex flex-col items-start text-center group">
                    <h2 className="text-[90px] font-semibold text-[#E4A62B] leading-none tracking-tighter underline z-20">
                        Visión
                    </h2>
                    <div
                        className="relative mt-4 w-[450px] h-[500px] cursor-pointer"
                        onClick={() => setShowVisionText(!showVisionText)}
                    >
                        {!showVisionText ? (
                            <>
                                <img
                                    src="/src/assets/missionVission/vision1.png"
                                    alt="Visión"
                                    className="rounded-lg w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:opacity-0"
                                />
                                <img
                                    src="/src/assets/missionVission/vision2.png"
                                    alt="Visión Hover"
                                    className="rounded-lg w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 absolute top-0 left-0 group-hover:opacity-100"
                                />
                            </>
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-black p-6 rounded-lg shadow-lg border-4 border-[#E4A62B] transition-all duration-500">
                                <p className="text-2xl font-normal text-[#E4A62B] font-[Poppins]">
                                    Ser una organización juvenil presente en América Latina y el Caribe, que animando y desarrollando el potencial de las y los jóvenes para convertirse en líderes, enfatice la equidad e igualdad de oportunidades para todos.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVisionSection;
