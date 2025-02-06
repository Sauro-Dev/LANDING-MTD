import { FC } from 'react';
import Navbar from "../common/Navbar.tsx";
import TeamSection from "./us/TeamSection.tsx";
import CollaboratorSection from "./us/CollaboratorSection.tsx";
import MissionVisionSection from "./us/MissionVisionSection.tsx";
import HistoryAchievementsSection from "./us/HistoryAchievementsSection.tsx";
import TimelineSection from "./us/TimelineSection.tsx";
import Footer from "../common/Footer.tsx";


const AboutUs: FC = () => {
    return (
        <div className="min-h-screen pt-16">
            <Navbar />
            <TeamSection />
            <CollaboratorSection />
            <MissionVisionSection />
            <HistoryAchievementsSection />
            <TimelineSection />
            <Footer />
        </div>
    );
};

export default AboutUs;