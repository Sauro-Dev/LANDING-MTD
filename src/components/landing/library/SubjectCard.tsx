import { FC } from 'react';

interface SubjectCardProps {
    name: string;
}

const SubjectCard: FC<SubjectCardProps> = ({ name }) => (
    <div className="bg-gray-800 p-6 rounded-lg text-white flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <div className="flex space-x-4">
            <button className="hover:text-pink-300">E</button>
            <button className="hover:text-pink-300">X</button>
        </div>
    </div>
);

export default SubjectCard;