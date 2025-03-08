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
        const namePart = key.includes('_') ? key.split('_').slice(1).join('_') : key;
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
                console.error(err);
                if (err.message.includes("Failed to fetch")) {
                    setError("No se pudo conectar con el servidor.");
                } else {
                    setError(err.message);
                }
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
        return `${environment.API_URL}/landing-files/download/${file.idLandingFiles}`;
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

    if (error || files.length === 0) {
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
                    {error ? error : (type === 'noticias' ? 'No hay noticias disponibles' : 'No hay revistas disponibles')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            {files.map(file => {
                    const displayName = file.displayName || cleanFileName(file.fileName);
                    return (
                        <div
                            key={file.idLandingFiles}
                            className="flex flex-col items-center animate-fadeInUp transition transform duration-500 hover:scale-105 w-full max-w-sm"
                        >
                            <div
                                className="w-full aspect-[3/4] relative cursor-pointer border-2 border-black rounded-lg overflow-hidden shadow-lg"
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
                                    className="w-full h-full object-cover"
                                    />
                                ) : file.fileTypes === 'application/pdf' ? (
                                    <div className="w-full h-full flex items-center justify-center bg-white">
                                        <Document
                                            file={getPdfUrl(file)}
                                            loading="Cargando PDF..."
                                        >
                                            <Page
                                                pageNumber={1}
                                                width={300}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                            />
                                        </Document>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span className="text-gray-700">Vista previa no disponible</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 text-center w-full">
                                <h3 className="text-lg font-bold">
                                    {type === 'noticias' ? 'Noticia Destacada' : 'Revista Informativa'}
                                </h3>
                                <p className="text-gray-600 truncate max-w-full">{displayName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

                        {/* Modal del visor PDF */}
                        {selectedFile && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-6 md:p-8 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                    <div
                        className="bg-white rounded-lg w-full max-w-5xl relative shadow-xl overflow-hidden"
                        style={{ maxHeight: '90vh' }}
                    >
                        {/* Navbar del visor PDF */}
                        <div className="bg-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-t-lg w-full border-b">
                            <h2 className="text-lg sm:text-xl font-semibold truncate max-w-full sm:max-w-md md:max-w-xl mb-2 sm:mb-0">
                                {type === 'noticias' ? 'Noticia' : 'Revista'} - {cleanFileName(selectedFile.fileName)}
                            </h2>
                            <div className="flex items-center space-x-4 self-end sm:self-auto">
                                <button
                                    onClick={() => downloadFile(selectedFile)}
                                    className="transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#ED117F] focus:ring-opacity-50"
                                    title="Descargar"
                                    aria-label="Descargar PDF"
                                >
                                    <img src="/download.png" alt="Descargar" className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={closePdfViewer}
                                    className="text-black font-bold px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    aria-label="Cerrar visor de PDF"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>

                        {/* Contenedor scrollable para el PDF */}
                        <div
                            className="overflow-y-auto flex justify-center p-2 sm:p-4 bg-gray-50"
                            style={{ maxHeight: 'calc(90vh - 160px)' }}
                        >
                            <Document
                                file={getPdfUrl(selectedFile)}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ED117F]"></div>
                                        <p className="mt-4 text-gray-600">Cargando PDF...</p>
                                    </div>
                                }
                                error={
                                    <div className="text-center py-10 text-red-500">
                                        Error al cargar el PDF. Intente descargar el archivo.
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    width={Math.min(window.innerWidth * 0.8, 700)}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="border border-gray-300 shadow-md"
                                />
                            </Document>
                        </div>

                        {/* Footer de navegación */}
                        <div className="px-4 sm:px-8 py-3 sm:pb-4 flex justify-between items-center border-t bg-gray-100">
                            <button
                                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                disabled={pageNumber <= 1}
                                className="px-3 sm:px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                                aria-label="Página anterior"
                            >
                                Anterior
                            </button>
                            <span className="text-base sm:text-lg">
                                Página {pageNumber} de {numPages || 1}
                            </span>
                            <button
                                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                disabled={pageNumber >= numPages}
                                className="px-3 sm:px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                                aria-label="Página siguiente"
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
