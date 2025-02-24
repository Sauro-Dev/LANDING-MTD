import { FC } from 'react';
import Navbar from "../common/Navbar.tsx";
import HeroSection from "./main/HeroSection.tsx";
import AreasSection from "./main/AreasSection.tsx";
import JoinChange from "./main/JoinChange.tsx";
import FAQSection from "./main/FAQSection.tsx";
import CertificationsSection from "./main/CerttificationSection.tsx";
import Footer from "../common/Footer.tsx";
import AreasCarousel from "./main/AreasCarousel.tsx";


const Home: FC = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <AreasSection />
            <JoinChange />
            <AreasCarousel />
            <FAQSection />
            <CertificationsSection />
            <Footer />
        </div>
    );
};
export default Home;