import { FC } from 'react';
import bannerImage from '../../../assets/banner/banner principal.png';

const HeroSection: FC = () => {
    return (
        <section className="pt-16">
            {/* Sección para que el banner no quede detrás del navbar */}
            <div className="relative w-full aspect-[2000/600] overflow-hidden">
                <img
                    src={bannerImage}
                    alt="Banner principal"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default HeroSection;
