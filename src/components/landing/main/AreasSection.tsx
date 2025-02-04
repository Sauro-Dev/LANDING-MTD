import { FC } from 'react';

const AreasSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Área que representan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-bold">Lo que están haciendo</h3>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export default AreasSection;