import { FC } from 'react';
import PublicationCards from './PublicationCards';

interface ContentDisplayProps {
    type: string; // "noticias" o "revistas"
}

const ContentDisplay: FC<ContentDisplayProps> = ({ type }) => {
    return (
        <div className="container mx-auto px-4 pb-16">
            <PublicationCards type={type} />
        </div>
    );
};

export default ContentDisplay;
