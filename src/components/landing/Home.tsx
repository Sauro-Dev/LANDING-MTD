import { FC, useEffect } from 'react';
import Navbar from "../common/Navbar.tsx";
import HeroSection from "./main/HeroSection.tsx";
import AreasSection from "./main/AreasSection.tsx";
import JoinChange from "./main/JoinChange.tsx";
import FAQSection from "./main/FAQSection.tsx";
import CertificationsSection from "./main/CertificationSection.tsx";
import Footer from "../common/Footer.tsx";
import AreasCarousel from "./main/AreasCarousel.tsx";

/**
 * Componente Home
 *
 * Página principal de la landing. Contiene la estructura general de la página de inicio,
 * incluyendo secciones clave como áreas de impacto, certificaciones, preguntas frecuentes y más.
 * Ojito porque se va a comentar que hace cada componente.
 */
const Home: FC = () => {
    // Prevenir overflow horizontal
    useEffect(() => {
        // Asegurarse de que no haya overflow horizontal
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        
        return () => {
            // Limpiar al desmontar
            document.body.style.overflowX = '';
            document.documentElement.style.overflowX = '';
        };
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden w-full">
            <Navbar />

            {/* Banner en el cual se destaca información de la ONG */}
            <HeroSection />

            {/* Componente que muestra el CalltoAction a unirse */}
            <AreasSection />

            {/* Componente que muestra las razones para unirse */}
            <JoinChange />

            {/* Carrusel de áreas de impacto con información interactiva */}
            <AreasCarousel />

            {/* Sección para realizar preguntas (Tienen que dar clic al botón) */}
            <FAQSection />

            {/* Sección de certificaciones de la ONG */}
            <CertificationsSection />

            <Footer />
        </div>
    );
};

export default Home;
