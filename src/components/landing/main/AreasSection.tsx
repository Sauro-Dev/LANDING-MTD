import { FC } from "react";
import { useNavigate } from "react-router-dom";

const AreasSection: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative py-16 bg-white flex flex-col items-center justify-center overflow-hidden">
            {/* Contenedor principal */}
            <div className="container mx-auto flex flex-row items-center justify-center gap-36 px-4 md:px-16 text-center">
                {/* Texto y botón */}
                <div className="max-w-lg space-y-6 flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-black">HAZ LA DIFERENCIA</h2>
                    <p className="text-4xl font-medium text-black leading-snug">
                        ¡En Make The Difference buscamos alguien como tú!
                    </p>
                    <button
                        className="bg-pink-600 text-white font-extrabold py-5 px-10 rounded-2xl text-5xl shadow-xl hover:bg-pink-700 transition-all"
                        onClick={() => navigate("/volunteer-form")}
                    >
                        ¡ÚNETENOS!
                    </button>
                </div>

                {/* Imagen */}
                <div className="w-full max-w-sm flex justify-center">
                    <img
                        src="/src/assets/faq/alumn.png"
                        alt="Estudiante Make The Difference"
                        className="w-full object-contain drop-shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default AreasSection;
