import { FC } from "react";
import { useNavigate } from "react-router-dom";

const AreasSection: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative py-12 bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 md:px-12 text-center">
                {/* Texto y botón */}
                <div className="max-w-lg space-y-6 flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-black">HAZ LA DIFERENCIA</h2>
                    <p className="text-xl md:text-4xl font-medium text-black leading-snug">
                        ¡En Make The Difference buscamos alguien como tú!
                    </p>
                    <button
                        className="bg-pink-600 text-white font-extrabold py-3 px-6 rounded-full text-3xl shadow-md md:py-5 md:px-10 md:rounded-2xl md:text-5xl md:shadow-xl hover:bg-pink-700 transition-all"
                        onClick={() => navigate("/volunteer-form")}
                    >
                        ¡ÚNETENOS!
                    </button>
                </div>

                {/* Imagen (visible solo en pantallas grandes) */}
                <div className="w-1/2 max-w-sm lg:flex hidden justify-center">
                    <img
                        src="/src/assets/faq/alumn.png"
                        alt="Estudiante Make The Difference"
                        className="w-full object-cover drop-shadow-lg rounded-md"
                        style={{ maskImage: "linear-gradient(black 80%, transparent)" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AreasSection;
