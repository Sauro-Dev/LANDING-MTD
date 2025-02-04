import { FC } from 'react';

const ValuesSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Los valores que ellos representan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
);

export default ValuesSection;