import { FC } from 'react';
import PublicationCards from './PublicationCards';

interface ContentDisplayProps {
    type: string; // "noticias" o "revistas"
}

const ContentDisplay: FC<ContentDisplayProps> = ({ type }) => {
    return (
        <section 
            className="w-full pb-8 sm:pb-12 lg:pb-16 max-w-7xl mx-auto"
            aria-label={type === 'noticias' ? 'Listado de noticias' : 'Listado de revistas'}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <PublicationCards type={type} />
            </div>
        </section>
    );
};

export default ContentDisplay;