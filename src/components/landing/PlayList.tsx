import { FC, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import Navbar from '../common/Navbar.tsx';

interface PlaylistCardProps {
    id: number;  // Cambiamos para usar solo el id
    onRemove: (id: number) => void;  // Actualizamos para pasar el id
}

// Componente Tarjeta de Playlist
const PlaylistCard: FC<PlaylistCardProps> = ({ id, onRemove }) => (
    <div className="relative bg-gray-800 aspect-square rounded-lg flex flex-col items-center justify-center text-white">
        <button
            onClick={() => onRemove(id)}
            className="absolute top-2 right-2 hover:text-pink-300"
        >
            <X size={20} />
        </button>
        <h3 className="text-2xl font-bold mb-4">PLAYLIST</h3>
        <div className="flex space-x-2">
            <span>E</span>
            <span>X</span>
        </div>
    </div>
);

// Componente Letra
const LyricsSection: FC = () => (
    <div className="bg-gray-800 aspect-[4/3] rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold text-center mb-4">LETRA</h2>
        <div className="h-full overflow-y-auto">
            <p className="text-center text-gray-300">
                Contenido de la letra de la canción...
            </p>
        </div>
    </div>
);

// Componente Principal Playlist
const PlayList: FC = () => {
    const [playlists, setPlaylists] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]);

    const handleAddPlaylist = () => {
        const newPlaylist = {
            id: playlists.length + 1,
        };
        setPlaylists([...playlists, newPlaylist]);
    };

    const handleRemovePlaylist = (id: number) => {
        setPlaylists(playlists.filter(playlist => playlist.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                {/* Botón Agregar */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleAddPlaylist}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Agregar
                    </button>
                </div>

                {/* Carousel de Playlists */}
                <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-500 p-2 rounded-full text-white hover:bg-purple-600">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-12">
                        {playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                id={playlist.id}
                                onRemove={handleRemovePlaylist}
                            />
                        ))}
                    </div>

                    <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-500 p-2 rounded-full text-white hover:bg-purple-600">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Sección de Letra */}
                <div className="mt-12 mb-8">
                    <LyricsSection />
                </div>

                {/* Footer Quote */}
                <div className="mt-12 text-center text-gray-600">
                    <p className="italic">
                        "Nunca dudes que un pequeño grupo de ciudadanos comprometidos puede
                        cambiar el mundo. De hecho, solo eso puede lograrlo"
                    </p>
                    <p className="mt-2">-Margaret Mead</p>
                </div>
            </div>

            {/* Footer Contact */}
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="space-x-4">
                            <a href="#" className="hover:text-pink-300">Facebook</a>
                            <a href="#" className="hover:text-pink-300">Instagram</a>
                            <a href="#" className="hover:text-pink-300">Twitter</a>
                            <a href="#" className="hover:text-pink-300">TikTok</a>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <h3 className="font-bold mb-2">CONTÁCTANOS</h3>
                            <p>example@hotmail.com</p>
                            <p>+51 111222333</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PlayList;