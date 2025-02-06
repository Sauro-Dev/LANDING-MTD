import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/landing/Home.tsx';
import AboutUs from '../components/landing/AboutUs.tsx';
import PlayList from "../components/landing/PlayList.tsx";
import Library from "../components/landing/Library.tsx";
import Newsletters from "../components/landing/Newsletters.tsx";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <Routes>
                    {/* Ruta principal redirige a landing */}
                    <Route path="/" element={<Navigate to="/home" replace />} />

                    {/* Rutas principales */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/nosotros" element={<AboutUs />} />
                    <Route path="/playlists" element={<PlayList />} />
                    <Route path="/biblioteca" element={<Library />} />
                    <Route path="/boletines" element={<Newsletters />} />

                    {/* Ruta 404 - Página no encontrada */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;