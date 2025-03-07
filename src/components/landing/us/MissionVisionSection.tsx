import { FC, useState } from "react";

const MissionVisionSection: FC = () => {
    const [showMissionText, setShowMissionText] = useState(false);
    const [showVisionText, setShowVisionText] = useState(false);

    return (
        <div className="relative py-16 bg-white flex items-center justify-center overflow-hidden">
            {/* Wave Divider SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-[110%] h-[80px] md:h-[126px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className="fill-[#ED117F] opacity-25"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        className="fill-[#ED117F] opacity-50"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        className="fill-[#ED117F]"
                    ></path>
                </svg>
            </div>


            {/* Contenido principal */}
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 mt-8 md:mt-16">
                {/* Sección Misión */}
                <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center group mb-12 lg:mb-0">
                <h2 className="text-[50px] md:text-[70px] lg:text-[90px] font-semibold text-[#3DB6B1] leading-none tracking-tighter underline z-20">
                        Misión
                    </h2>
                    <div
                        className="relative mt-4 w-full max-w-[350px] md:max-w-[450px] h-[350px] md:h-[500px] cursor-pointer"
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
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-black p-4 md:p-6 rounded-lg shadow-lg border-4 border-[#3DB6B1] transition-all duration-500">
                                <p className="text-lg md:text-2xl font-normal text-[#3DB6B1] font-[Poppins]">
                                    Educar a los jóvenes y generar un ambiente inclusivo, saludable y confiable, que los anime a desarrollar sus habilidades y potencialidades.
                                    <br /><br />
                                    Inspirar a generar un cambio positivo en el mundo, logrando que sea descentralizado para todas las personas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección Visión */}
                <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center group">
                <h2 className="text-[50px] md:text-[70px] lg:text-[90px] font-semibold text-[#E4A62B] leading-none tracking-tighter underline z-20">
                        Visión
                    </h2>
                    <div
                        className="relative mt-4 w-full max-w-[350px] md:max-w-[450px] h-[350px] md:h-[500px] cursor-pointer"
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
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-black p-4 md:p-6 rounded-lg shadow-lg border-4 border-[#E4A62B] transition-all duration-500">
                                <p className="text-lg md:text-2xl font-normal text-[#E4A62B] font-[Poppins]">
                                    Ser una organización juvenil presente en América Latina y el Caribe, que anime y desarrolle el potencial de los jóvenes para convertirse en líderes.
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
