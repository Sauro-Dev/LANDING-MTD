import { FC, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import environment from '../../../enviroment';

interface PublicationCardsProps {
    type: string; // "noticias" o "revistas"
}

interface LandingFile {
    idLandingFiles: number;
    fileName: string;
    fileTypes: string;
    fileSector: string;
    normalizedSector?: string;
}

const PublicationCards: FC<PublicationCardsProps> = ({ type }) => {
    const [files, setFiles] = useState<LandingFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // Estados para el visor PDF
    const [selectedFile, setSelectedFile] = useState<LandingFile | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        fetch(`${environment.API_URL}/landing-files/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los archivos');
                }
                return response.json();
            })
            .then((data: LandingFile[]) => {
                const normalizedFiles = data.map(file => ({
                    ...file,
                    normalizedSector:
                        file.fileSector === "NEWS"
                            ? "noticias"
                            : file.fileSector === "MAGAZINE"
                                ? "revistas"
                                : file.fileSector.toLowerCase()
                }));
                const filtered = normalizedFiles.filter(file =>
                    file.normalizedSector === type.toLowerCase()
                );
                setFiles(filtered);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [type]);

    const openPdfViewer = (file: LandingFile) => {
        setSelectedFile(file);
        setPageNumber(1);
    };

    const closePdfViewer = () => {
        setSelectedFile(null);
        setNumPages(0);
        setPageNumber(1);
    };

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    };

    if (loading) {
        return <div className="text-center py-8 animate-fade-in">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center py-8 animate-fade-in">Error: {error}</div>;
    }

    if (files.length === 0) {
        return <div className="text-center py-8 animate-fade-in">No hay {type} disponibles.</div>;
    }

    return (
        <>
            {/* Contenedor de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {files.map(file => {
                    const displayName = file.fileName.includes('_')
                        ? file.fileName.split('_').slice(1).join('_')
                        : file.fileName;
                    return (
                        <div
                            key={file.idLandingFiles}
                            className="flex flex-col items-center animate-fadeInUp transition transform duration-500 hover:scale-105"
                        >
                            <div
                                className="w-full max-w-md aspect-[3/4] relative cursor-pointer"
                                onClick={() => {
                                    if (file.fileTypes === 'application/pdf') {
                                        openPdfViewer(file);
                                    }
                                }}
                            >
                                {file.fileTypes.startsWith('image/') ? (
                                    <img
                                        src={`${environment.API_URL}/landing-files/${file.idLandingFiles}`}
                                        alt={type === 'noticias' ? 'Portada de la noticia' : 'Portada de la revista'}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                    />
                                ) : file.fileTypes === 'application/pdf' ? (
                                    <div>
                                        <Document
                                            file={`${environment.API_URL}/landing-files/${file.idLandingFiles}`}
                                            loading="Cargando PDF..."
                                        >
                                            <Page
                                                pageNumber={1}
                                                width={350}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                            />
                                        </Document>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                                        <span className="text-gray-700">Vista previa no disponible</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-bold">
                                    {type === 'noticias' ? 'Noticia Destacada' : 'Revista Informativa'}
                                </h3>
                                <p className="text-gray-600">{displayName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fade-in">
                    <div
                        className="bg-white rounded-lg w-full max-w-6xl relative shadow-xl"
                        style={{ maxHeight: '80vh' }}
                    >
                        {/* Navbar del visor PDF */}
                        <div className="bg-gray-100 p-4 flex justify-between items-center rounded-t-lg w-full border-b">
                            <h2 className="text-xl font-semibold">
                                {type === 'noticias' ? 'Noticia' : 'Revista'} -{" "}
                                {selectedFile.fileName.includes('_')
                                    ? selectedFile.fileName.split('_').slice(1).join('_')
                                    : selectedFile.fileName}
                            </h2>
                            <button
                                onClick={closePdfViewer}
                                className="text-black font-bold px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>

                        {/* Contenedor scrollable para el PDF */}
                        <div
                            className="overflow-y-auto flex justify-center p-4"
                            style={{ maxHeight: 'calc(80vh - 140px)' }}
                        >
                            <Document
                                file={`${environment.API_URL}/landing-files/${selectedFile.idLandingFiles}`}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading="Cargando PDF..."
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    width={700}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </Document>
                        </div>

                        {/* Footer de navegación */}
                        <div className="px-8 pb-4 flex justify-between items-center border-t">
                            <button
                                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                disabled={pageNumber <= 1}
                                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="text-lg">
                Página {pageNumber} de {numPages}
              </span>
                            <button
                                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                disabled={pageNumber >= numPages}
                                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PublicationCards;
