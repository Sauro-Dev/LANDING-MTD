import { FC } from 'react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TeamMemberCard role="Vicepresidente" />
                <TeamMemberCard role="Presidente" />
                <TeamMemberCard role="Tesorero" />
            </div>
        </div>
    </div>
);

export default TeamSection;