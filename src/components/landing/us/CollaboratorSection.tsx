import { FC } from 'react';
import { Edit } from 'lucide-react';

const CollaboratorSection: FC = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Colaborador del mes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center">
                    <div className="w-48 h-64 bg-gray-200 rounded-lg mb-4" />
                    <h3 className="text-xl font-semibold">Nombre</h3>
                    <p className="text-gray-600">colaborador</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Motivo de ser destacado</h3>
                    <div className="bg-gray-100 p-6 rounded-lg min-h-[200px]"></div>
                    <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                        <Edit size={20} />
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default CollaboratorSection;