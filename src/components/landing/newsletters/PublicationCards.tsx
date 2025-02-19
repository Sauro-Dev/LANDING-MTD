import { FC } from 'react';

interface PublicationCardsProps {
    type: string; // "noticias" o "revistas"
}

const PublicationCards: FC<PublicationCardsProps> = ({ type }) => {
    // Ejemplo: renderizamos 3 tarjetas similares
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center">


                    <div className="w-full max-w-md aspect-[3/4] relative group cursor-pointer">
                        <img
                            src="/api/placeholder/300/400"
                            alt={type === 'noticias' ? 'Portada de la noticia' : 'Portada de la revista'}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {type === 'noticias' ? 'Ver noticia' : 'Ver revista'}
              </span>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-bold">
                            {type === 'noticias' ? 'Noticia Destacada' : 'Revista Informativa'}
                        </h3>
                        <p className="text-gray-600">
                            {type === 'noticias'
                                ? 'Mayo 15, 2024 - Título de la noticia'
                                : 'Edición Mayo 2024'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PublicationCards;
