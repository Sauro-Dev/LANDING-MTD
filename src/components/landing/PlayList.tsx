import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../common/Navbar.tsx';
import Footer from "../common/Footer.tsx";
import spotifyLogo from "../../assets/logos/spotify-logo.svg";

const playlistsData = [
    {
        id: '02IIpD4fdzXj3YNImNAHna',
        embedUrl:
            'https://open.spotify.com/embed/playlist/02IIpD4fdzXj3YNImNAHna?utm_source=generator&theme=0',
        directUrl: 'https://open.spotify.com/playlist/02IIpD4fdzXj3YNImNAHna',
    },
    {
        id: '1WCRwQ0f4yT8tuIUUxP5m1',
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

            {/* Sección principal con animación de entrada */}
            <main className="flex-grow pt-24 pb-8 font-league-spartan px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-2xl md:text-3xl font-league-spartan mb-6 md:mb-10 text-center">
                        Playlists Recomendadas
                    </h1>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="flex items-center justify-center gap-4">
                            {/* Flecha Izquierda */}
                            {showArrows && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={goPrev}
                                    className="z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow transition-colors shrink-0 hover:bg-pink-600"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 16.293a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l3.879 3.879a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </motion.button>
                            )}

                            {/* Contenedor animado del iframe para transiciones entre playlists */}
                            <AnimatePresence exitBeforeEnter>
                                <motion.div
                                    key={currentPlaylist.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                    className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                                >
                                    <iframe
                                        className="rounded-md w-full"
                                        style={{
                                            height: '352px',
                                            borderRadius: '12px',
                                        }}
                                        src={currentPlaylist.embedUrl}
                                        frameBorder="0"
                                        allowFullScreen={false}
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    ></iframe>
                                </motion.div>
                            </AnimatePresence>

                            {/* Flecha Derecha */}
                            {showArrows && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={goNext}
                                    className="z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow transition-colors shrink-0 hover:bg-pink-600"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.707 16.293a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L11.586 10l-3.879 3.879a1 1 0 000 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </motion.button>
                            )}
                        </div>

                        {/* Botón Escuchar en Spotify animado */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex justify-center mt-4 md:mt-6"
                        >
                            <a
                                href={currentPlaylist.directUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-secondary text-black px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                            >
                                <img
                                    src={spotifyLogo}
                                    alt="Spotify Logo"
                                    className="w-5 h-5 mr-2"
                                />
                                Escuchar en Spotify
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default PlayList;
