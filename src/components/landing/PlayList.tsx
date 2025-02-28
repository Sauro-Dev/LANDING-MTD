import {FC, useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../common/Navbar.tsx';
import Footer from "../common/Footer.tsx";
import spotifyLogo from "../../assets/logos/spotify-logo.svg";
import environment from "../../enviroment.ts";
import { DocumentIcon } from '@heroicons/react/24/outline';

interface Playlist {
    idPlaylist: number;
    title: string;
    embedUrl: string;
    directUrl: string;
    enabled: boolean;
}

const PlayList: FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaylists = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token') || '';
            const response = await fetch(`${environment.API_URL}/playlists/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Obtenemos la respuesta como texto
            const text = await response.text();

            try {
                // Intentamos parsear como JSON
                const data = JSON.parse(text) as Playlist[];
                setPlaylists(data);
                setCurrentIndex(0);
            } catch {
                // Si falla, es un string. Lo guardamos en error
                setError(text);
            }
        } catch (err: unknown) {
            console.error('Error al obtener playlists:', err);
            if (err instanceof Error) {
                setError(`No se pudieron cargar las playlists: ${err.message}`);
            } else {
                setError('No se pudieron cargar las playlists (error desconocido).');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchPlaylists();
    }, []);

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((idx) => idx - 1);
        }
    };

    const goNext = () => {
        if (currentIndex < playlists.length - 1) {
            setCurrentIndex((idx) => idx + 1);
        }
    };

    // 1) Loading
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow pt-24 pb-8 px-4 flex items-center justify-center">
                    <p>Cargando playlists...</p>
                </main>
                <Footer />
            </div>
        );
    }

    // 2) Caso específico: el backend devolvió el texto "No se encontraron playlists habilitadas en la BD"
    //    Muestra un mensaje más amigable y consistente con boletines.
    if (error === 'No se encontraron playlists habilitadas en la BD') {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow pt-24 pb-8 px-4 flex flex-col items-center justify-center gap-4">
                    <DocumentIcon className="w-16 h-16 text-gray-500" />
                    <h2 className="text-3xl font-bold animate-fade-in">
                        No hay playlists disponibles
                    </h2>
                    <p className="text-lg animate-fade-in">
                        Intenta nuevamente más tarde
                    </p>
                </main>
                <Footer />
            </div>
        );
    }

    // 3) Error general (otro mensaje)
    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow pt-24 pb-8 px-4 flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </main>
                <Footer />
            </div>
        );
    }

    // 4) Si parseamos un array vacío, mostramos el mismo estilo de mensaje
    if (!playlists.length) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow pt-24 pb-8 px-4 flex flex-col items-center justify-center gap-4">
                    <DocumentIcon className="w-16 h-16 text-gray-500" />
                    <h2 className="text-3xl font-bold animate-fade-in">
                        No hay playlists disponibles
                    </h2>
                    <p className="text-lg animate-fade-in">
                        Intenta nuevamente más tarde
                    </p>
                </main>
                <Footer />
            </div>
        );
    }

    // 5) Hay playlists -> renderizamos
    const currentPlaylist = playlists[currentIndex];
    const showArrows = playlists.length > 1;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <main className="flex-grow pt-24 pb-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 text-center">
                        Playlists Recomendadas
                    </h1>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="flex items-center justify-center gap-4">
                            {showArrows && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={goPrev}
                                    className="z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow hover:bg-pink-600"
                                >
                                    {/* Flecha Izquierda */}
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.293 16.293a1 1 0
                                                01-1.414 0l-5-5a1 1 0
                                                010-1.414l5-5a1 1 0
                                                011.414 1.414L8.414 10l3.879
                                                3.879a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </motion.button>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPlaylist.idPlaylist}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                                >
                                    <iframe
                                        className="rounded-md w-full"
                                        style={{ height: '352px', borderRadius: '12px' }}
                                        src={currentPlaylist.embedUrl}
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {showArrows && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={goNext}
                                    className="z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow hover:bg-pink-600"
                                >
                                    {/* Flecha Derecha */}
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
                                </motion.button>
                            )}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex justify-center mt-4 md:mt-6"
                        >
                            <a
                                href={currentPlaylist.directUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-secondary text-black px-4 py-2 rounded hover:bg-pink-600"
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