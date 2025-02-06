import { FC } from 'react';

interface TeamMemberCardProps {
    role: string;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ role }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
        <h3 className="text-xl font-semibold text-purple-600">{role}</h3>
    </div>
);

export default TeamMemberCard;