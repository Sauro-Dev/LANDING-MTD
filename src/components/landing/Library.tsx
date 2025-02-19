import { FC } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Banner from './library/Banner.tsx';
import GoggleDriveFolders from './library/GoogleDriveFolders.tsx';

const Library: FC = () => {

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Banner />
            <GoggleDriveFolders />
            <Footer />
        </div>
    );
};

export default Library;