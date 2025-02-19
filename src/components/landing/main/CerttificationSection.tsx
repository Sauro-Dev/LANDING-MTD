import { FC } from 'react';

const CertificationsSection: FC = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Certificaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                    <img src="/src/assets/faq/UNT.png" alt="UPN" className="w-full h-auto mb-4" />
                    <p className="text-lg">Ganadores de la 5ta edición Fondo UPN de Responsabilidad Social.</p>
                </div>
                <div>
                    <img src="/src/assets/faq/MDL.png" alt="Municipalidad de Lima" className="w-full h-auto mb-4" />
                    <p className="text-lg">Acreditación de la Municipalidad de Lima para la Red Metropolitana de Organizaciones Juveniles.</p>
                </div>
                <div>
                    <img src="/src/assets/faq/VOLU.png" alt="Voluntariado" className="w-full h-auto mb-4" />
                    <p className="text-lg leading-relaxed">Inscripción en la SUNARP y Acreditación del SINAVOL.<br />Reforzamos nuestro compromiso legal y operativo.</p>
                </div>
                <div>
                    <img src="/src/assets/faq/ES.png" alt="Youth Empowerment Support" className="w-full h-auto mb-4" />
                    <p className="text-lg">Organización finalista del Fondo de aceleración a iniciativas sociales Youth Empowerment Support en 2023.</p>
                </div>
            </div>
        </div>
    </div>
);

export default CertificationsSection;