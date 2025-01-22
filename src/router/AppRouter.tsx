import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../components/Landing';
import AboutUs from '../components/AboutUs';
import PlayList from "../components/PlayList.tsx";
import Library from "../components/Library.tsx";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <Routes>
                    {/* Ruta principal redirige a landing */}
                    <Route path="/" element={<Navigate to="/landing" replace />} />

                    {/* Rutas principales */}
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/nosotros" element={<AboutUs />} />
                    <Route path="/playlists" element={<PlayList />} />
                    <Route path="/biblioteca" element={<Library />} />

                    {/* Placeholder routes */}
                    <Route path="/boletines" element={<div>Boletines - En construcción</div>} />

                    {/* Ruta 404 - Página no encontrada */}
                    <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;