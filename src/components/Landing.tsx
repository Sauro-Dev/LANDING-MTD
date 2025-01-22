import { FC } from 'react';
import Navbar from "./Navbar.tsx";


// Banner Principal actualizado
const HeroSection: FC = () => (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-32 mt-16">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                MAKE THE <span className="text-pink-300">DIFFERENCE</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-cyan-300">- GIRL UP</h2>
            <p className="mt-6 italic text-lg">
                "Nunca dudes que un pequeño grupo de ciudadanos comprometidos puede cambiar el mundo.
                De hecho, solo eso puede lograrlo"
            </p>
            <p className="text-sm mt-2">-Margaret Mead</p>
        </div>
    </div>
);

// Sección de Áreas
const AreasSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Área que representan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-bold">Lo que están haciendo</h3>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    </div>
);

// Sección de Valores
const ValuesSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Los valores que ellos representan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
);

// Sección FAQ
const FAQSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <button className="mt-4 text-purple-600 font-bold">¿Otra duda?</button>
                </div>
            </div>
        </div>
    </div>
);

// Sección de Certificaciones
const CertificationsSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Certificaciónes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
);

// Footer actualizado
const Footer: FC = () => (
    <footer className="bg-black text-white py-8">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="space-x-4">
                    <a href="#" className="hover:text-pink-300">Facebook</a>
                    <a href="#" className="hover:text-pink-300">Instagram</a>
                    <a href="#" className="hover:text-pink-300">Twitter</a>
                    <a href="#" className="hover:text-pink-300">TikTok</a>
                </div>
                <div className="mt-4 md:mt-0">
                    <h3 className="font-bold mb-2">CONTÁCTANOS</h3>
                    <p>example@hotmail.com</p>
                    <p>+51 111222333</p>
                </div>
            </div>
        </div>
    </footer>
);

// Componente Principal Landing actualizado
const Landing: FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <AreasSection />
            <ValuesSection />
            <FAQSection />
            <CertificationsSection />
            <Footer />
        </div>
    );
};

export default Landing;