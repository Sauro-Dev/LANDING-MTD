import {FC, useState} from 'react';
import Navbar from '../common/Navbar.tsx';
import Footer from "../common/Footer.tsx";
import spotifyLogo from "../../assets/logos/spotify-logo.svg";


const playlistsData = [
    {
        id: '02IIpD4fdzXj3YNImNAHna',
        // title: 'Playlist 1', // No mostraremos el título
        embedUrl:
            'https://open.spotify.com/embed/playlist/02IIpD4fdzXj3YNImNAHna?utm_source=generator&theme=0',
        directUrl: 'https://open.spotify.com/playlist/02IIpD4fdzXj3YNImNAHna',
    },
    {
        id: '1WCRwQ0f4yT8tuIUUxP5m1',
        // title: 'Playlist 2',
        embedUrl:
            'https://open.spotify.com/embed/playlist/1WCRwQ0f4yT8tuIUUxP5m1?utm_source=generator&theme=0',
        directUrl: 'https://open.spotify.com/playlist/1WCRwQ0f4yT8tuIUUxP5m1',
    },
];

const PlayList: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentPlaylist = playlistsData[currentIndex];
    const showArrows = playlistsData.length > 1;

    // Retroceder
    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((idx) => idx - 1);
    };

    // Avanzar
    const goNext = () => {
        if (currentIndex < playlistsData.length - 1) setCurrentIndex((idx) => idx + 1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            {/* Aplica la fuente league spartan en todo el contenido */}
            <main className="flex-grow pt-24 pb-8 font-league-spartan">
                {/* Encabezado, elimínalo si no lo deseas */}
                <h1 className="text-2xl font-league-spartan mb-6 text-center">
                    Playlists Recomendadas
                </h1>

                {/* Contenedor relativo para las flechas y el iframe */}
                <div className="relative flex flex-col items-center">
                    {/* Flecha Izquierda (se muestra si hay +1 playlist) */}
                    {showArrows && (
                        <button
                            onClick={goPrev}
                            className="
                absolute
                z-10
                left-[57rem]
                top-1/2
                transform
                -translate-y-1/2
                bg-primary
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                shadow
                hover:bg-pink-600
              "
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 16.293a1 1 0 01-1.414 0l-5-5a1
                     1 0 010-1.414l5-5a1 1 0 011.414
                     1.414L8.414 10l3.879 3.879a1 1
                     0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Flecha Derecha (se muestra si hay +1 playlist) */}
                    {showArrows && (
                        <button
                            onClick={goNext}
                            className="
                absolute
                z-10
                right-[57rem]
                top-1/2
                transform
                -translate-y-1/2
                bg-primary
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                shadow
                hover:bg-pink-600
              "
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 16.293a1 1 0
                     001.414 0l5-5a1 1 0
                     000-1.414l-5-5a1 1 0
                     10-1.414 1.414L11.586 10l-3.879
                     3.879a1 1 0 000 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}

                    {/* No mostramos currentPlaylist.title */}
                    {/* Iframe */}
                    <iframe
                        className="rounded-md"
                        style={{
                            width: '350px',
                            height: '352px',
                            borderRadius: '12px',
                        }}
                        src={currentPlaylist.embedUrl}
                        frameBorder="0"
                        allowFullScreen={false}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>

                    {/* Botón Escuchar en Spotify */}
                    <a
                        href={currentPlaylist.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              mt-4
              inline-flex
              items-center
              bg-secondary
              text-black
              px-4
              py-2
              rounded
              hover:bg-pink-600
              transition-colors
            "
                    >
                        <img
                            src={spotifyLogo}
                            alt="Spotify Logo"
                            className="w-5 h-5 mr-2"
                        />
                        Escuchar en Spotify
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PlayList;