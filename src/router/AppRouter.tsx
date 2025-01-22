import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../components/Landing';
import AboutUs from '../components/AboutUs';

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

                    {/* Placeholder routes */}
                    <Route path="/boletines" element={<div>Boletines - En construcción</div>} />
                    <Route path="/playlists" element={<div>Playlists - En construcción</div>} />
                    <Route path="/biblioteca" element={<div>Biblioteca - En construcción</div>} />

                    {/* Ruta 404 - Página no encontrada */}
                    <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;