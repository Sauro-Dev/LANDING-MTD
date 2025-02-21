import { FC } from 'react';
import Navbar from "../common/Navbar.tsx";
import HeroSection from "./main/HeroSection.tsx";
import AreasSection from "./main/AreasSection.tsx";
import ValuesSection from "./main/ValuesSection.tsx";
import FAQSection from "./main/FAQSection.tsx";
import CertificationsSection from "./main/CerttificationSection.tsx";
import Footer from "../common/Footer.tsx";


const Home: FC = () => {
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
export default Home;