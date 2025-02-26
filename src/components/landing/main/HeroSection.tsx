import { FC } from "react";
import bannerImage from "../../../assets/banner/banner principal.png";
import { motion } from "framer-motion";

/**
 * Componente HeroSection
 *
 * Sección principal de la página de inicio. Muestra un banner con un diseño optimizado
 * sin transparencia y con una mejor integración con la navbar.
 */
const HeroSection: FC = () => {
    return (
        <section className="relative w-full">
            {/* Contenedor del banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full aspect-[2000/500] overflow-hidden"
            >
                {/* Imagen del banner */}
                <img
                    src={bannerImage}
                    alt="Banner principal"
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
