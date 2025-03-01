import { FC, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import environment from '../../../enviroment';

interface PublicationCardsProps {
    type: string; // "noticias" o "revistas"
}

export interface LandingFile {
    idLandingFiles: number;
    fileName: string;
    fileTypes: string;
    fileSector: string;
    normalizedSector?: string;
    displayName?: string;
}

const PublicationCards: FC<PublicationCardsProps> = ({ type }) => {
    const [files, setFiles] = useState<LandingFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // Estados para el visor PDF
    const [selectedFile, setSelectedFile] = useState<LandingFile | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isClosing, setIsClosing] = useState(false);

    // Helper para extraer el nombre real del archivo
    const cleanFileName = (fileName: string): string => {
        let key = fileName;
        if (key.startsWith('http')) {
            try {
                const urlObj = new URL(key);
                key = urlObj.pathname; // ej: "/1740758337052_CV%20Zahir%20Aredo.pdf"
                if (key.startsWith('/')) {
                    key = key.substring(1);
                }
            } catch (e) {
                const pos = key.indexOf("?");
                if (pos > 0) {
                    key = key.substring(0, pos);
                }
            }
        }
        // Quitar el prefijo timestamp (se asume que está separado por "_")
        let namePart = key.includes('_') ? key.split('_').slice(1).join('_') : key;
        return decodeURIComponent(namePart);
    };

    useEffect(() => {
        fetch(`${environment.API_URL}/landing-files/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los archivos');
                }
                return response.json();
            })
            .then((data: LandingFile[]) => {
                const normalizedFiles = data.map(file => {
                    const normalizedSector =
                        file.fileSector === "NEWS"
                            ? "noticias"
                            : file.fileSector === "MAGAZINE"
                                ? "revistas"
                                : file.fileSector.toLowerCase();
                    return {
                        ...file,
                        normalizedSector,
                        displayName: cleanFileName(file.fileName)
                    };
                });
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
        setIsClosing(true);
        setTimeout(() => {
            setSelectedFile(null);
            setNumPages(0);
            setPageNumber(1);
            setIsClosing(false);
        }, 300);
    };

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    };

    // Para PDFs, usamos el endpoint /download
    const getPdfUrl = (file: LandingFile): string => {
        return `${environment.API_URL}/landing-files/${file.idLandingFiles}/download`;
    };

    // Descarga forzada mediante fetch
    const downloadFile = (file: LandingFile) => {
        const downloadUrl = getPdfUrl(file);
        fetch(downloadUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la descarga');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.displayName || cleanFileName(file.fileName) || 'archivo.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error al descargar el archivo:', error);
            });
    };

    if (loading) {
        return <div className="text-center py-8 animate-fade-in">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center py-8 animate-fade-in">Error: {error}</div>;
    }

    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[65vh] gap-4 ">
                {type === 'noticias' ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                    </svg>
                )}

                <p className="text-3xl font-bold animate-fade-in">
                    {type === 'noticias' ? 'No hay noticias disponibles' : 'No hay revistas disponibles'}
                </p>
                <p className="text-lg animate-fade-in">
                    Intenta nuevamente más tarde
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Tarjetas de previsualización */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">

            {files.map(file => {
                    const displayName = file.displayName || cleanFileName(file.fileName);
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
                                            file={getPdfUrl(file)}
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

            {/* Modal del visor PDF */}
            {selectedFile && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                    <div
                        className="bg-white rounded-lg w-full max-w-6xl relative shadow-xl"
                        style={{ maxHeight: '80vh' }}
                    >
                        {/* Navbar del visor PDF */}
                        <div className="bg-gray-100 p-4 flex justify-between items-center rounded-t-lg w-full border-b">
                            <h2 className="text-xl font-semibold">
                                {type === 'noticias' ? 'Noticia' : 'Revista'} - {cleanFileName(selectedFile.fileName)}
                            </h2>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => downloadFile(selectedFile)}
                                    className="transition-colors hover:opacity-80"
                                    title="Descargar"
                                >
                                    <img src="/download.png" alt="Descargar" className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={closePdfViewer}
                                    className="text-black font-bold px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>

                        {/* Contenedor scrollable para el PDF */}
                        <div
                            className="overflow-y-auto flex justify-center p-4"
                            style={{ maxHeight: 'calc(80vh - 140px)' }}
                        >
                            <Document
                                file={getPdfUrl(selectedFile)}
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
