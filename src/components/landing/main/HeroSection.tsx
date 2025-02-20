import { FC } from 'react';
import bannerImage from '../../../assets/banner/banner principal.png';

const HeroSection: FC = () => {
    return (
        <section className="">
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
