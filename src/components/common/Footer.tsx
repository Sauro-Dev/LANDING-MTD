import { FC } from 'react';
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer: FC = () => (
    <footer className="bg-black text-white py-8 px-4">
        <div className="container mx-auto">

            {/*
        flex-col en móvil (todo va uno debajo de otro).
        En escritorio (md), pasa a flex-row para alinear en fila.
      */}
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between space-y-6 md:space-y-0">

                {/* 1) Frase: móvil => primero, escritorio => segundo (md:order-2) */}
                <div className="order-1 md:order-2 text-center md:w-1/2 md:px-4">
                    <p className="italic text-gray-300 text-sm md:text-base leading-relaxed">
                        "Nunca dudes que un pequeño grupo de ciudadanos comprometidos puede cambiar el mundo.
                    </p>
                    <p className="italic text-gray-300 text-sm md:text-base leading-relaxed">
                        De hecho, solo eso puede lograrlo"
                    </p>
                    <p className="mt-2 text-gray-400 text-xs md:text-sm">- Margaret Mead</p>
                </div>

                {/* 2) Redes sociales: móvil => segundo, escritorio => primero (md:order-1) */}
                <div className="order-2 md:order-1 flex justify-center space-x-6 md:space-x-8">
                    <a
                        href="https://www.facebook.com/makethedifferenceperu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition-colors text-2xl"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.instagram.com/make.thedifference1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition-colors text-2xl"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://x.com/girlupmtd1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition-colors text-2xl"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.tiktok.com/@make.thedifference1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-300 transition-colors text-2xl"
                    >
                        <FaTiktok />
                    </a>
                </div>

                {/* 3) Contacto: móvil => tercero, escritorio => tercero igual (md:order-3) */}
                <div className="order-3 md:order-3 text-center md:text-right space-y-2">
                    <h3 className="font-bold text-lg mb-3">CONTÁCTANOS</h3>
                    <div className="space-y-1">
                        <a
                            href="mailto:contacto@makethedifferenceperu.org"
                            className="flex items-center justify-center md:justify-end hover:text-pink-300 transition-colors"
                        >
                            <MdEmail className="mr-2 text-xl" />
                            contacto@makethedifferenceperu.org
                        </a>
                    </div>
                </div>
            </div>

            {/* Derechos de autor */}
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Make The Difference. Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

export default Footer;
