import { FC } from 'react';
import bannerImage from '../../../assets/banner/banner principal.png';

const HeroSection: FC = () => (
    <div className="relative bg-pink-500 min-h-screen overflow-hidden">
        {/* Banner background image */}
        <div className="absolute inset-0">
            <img
                src={bannerImage}
                alt="Background Banner"
                className="w-full h-full object-contain md:object-cover lg:object-fill"
            />
        </div>
    </div>
);;

export default HeroSection;