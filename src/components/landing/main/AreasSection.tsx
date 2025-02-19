import { FC } from 'react';

const AreasSection: FC = () => (
    <div className="relative py-32 bg-white flex items-center justify-between container mx-auto min-h-[500px]">
        <img src="/src/assets/faq/Decore.png" alt="Decoración" className="absolute right-0 bottom-0 w-[45%] h-auto -z-10" />
        <div className="text-left w-1/2 space-y-4">
            <h2 className="text-[48px] font-bold text-black">HAZ LA DIFERENCIA</h2>
            <p className="text-[48px] font-semibold text-black leading-tight">
                ¡En Make The Difference <br />
                buscamos alguien como tú!
            </p>
            <button className="bg-pink-600 text-white font-extrabold py-4 px-12 rounded-lg text-[48px] shadow-lg hover:bg-pink-700 transition-all uppercase">
                ¡ÚNETENOS!
            </button>
        </div>
        <div className="w-1/2 flex justify-end">
            <img src="/src/assets/faq/alumn.png" alt="Estudiante Make The Difference" className="w-[350px] h-auto object-cover absolute bottom-0 right-10" />
        </div>
    </div>
);

export default AreasSection;