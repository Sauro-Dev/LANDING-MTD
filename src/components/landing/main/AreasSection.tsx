import { FC } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente AreasSection
 *
 * Sección que motiva a los usuarios a unirse a Make The Difference.
 * Contiene un mensaje inspirador y un botón de llamada a la acción para el formulario de voluntariado.
 */
const AreasSection: FC = () => {
    const navigate = useNavigate(); // Hook para la navegación dentro de la página

    return (
        <div className="relative py-12 bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 md:px-12 text-center">

                {/* Sección de texto con título, mensaje y botón */}
                <div className="max-w-lg space-y-6 flex flex-col items-center">
                    {/* Título principal */}
                    <h2 className="text-4xl font-bold text-black">HAZ LA DIFERENCIA</h2>

                    {/* Mensaje inspirador */}
                    <p className="text-xl md:text-4xl font-medium text-black leading-snug">
                        ¡En Make The Difference buscamos alguien como tú!
                    </p>

                    {/* Botón de llamada a la acción que redirige al formulario de voluntariado */}
                    <button
                        className="bg-pink-600 text-white font-extrabold py-3 px-6 rounded-full text-3xl shadow-md md:py-5 md:px-10 md:rounded-2xl md:text-5xl md:shadow-xl hover:bg-pink-700 transition-all"
                        onClick={() => navigate("/volunteer-form")}
                    >
                        ¡ÚNETENOS!
                    </button>
                </div>

                {/* Imagen decorativa (visible solo en pantallas grandes) */}
                <div className="w-1/2 max-w-sm lg:flex hidden justify-center">
                    <img
                        src="/src/assets/faq/alumn.png" // Ruta de la imagen
                        alt="Estudiante Make The Difference" // Descripción para accesibilidad
                        className="w-full object-cover drop-shadow-lg rounded-md"
                        style={{ maskImage: "linear-gradient(black 80%, transparent)" }} // Efecto degradado en la imagen
                    />
                </div>
            </div>
        </div>
    );
};

export default AreasSection;
