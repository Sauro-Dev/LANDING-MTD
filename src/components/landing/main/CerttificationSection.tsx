import { FC } from 'react';

const CertificationsSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Certificaciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
);

export default CertificationsSection;