import { FC } from "react";
import bookLogo from '../../../assets/library/iconolibro.png';

const Banner: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 bg-white">
            <h2 className="text-5xl font-bold text-pink-600 mb-4">BIBLIOTECA</h2>
            <img
                src={bookLogo}
                alt="Libro abierto"
                className="w-64 h-64 mb-6"
            />
        </div>
    );
};

export default Banner;
