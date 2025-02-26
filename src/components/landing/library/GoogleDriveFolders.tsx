import { FC, useEffect, useState } from "react";
import driveFolder from "../../../assets/library/drivefolder.png";
import readingGirl from "../../../assets/library/chicaleyendo.png"; // Imagen decorativa de una chica leyendo

// Claves de la API de Google Drive
const API_KEY = "AIzaSyByqLVx-zkF_0leNc4uwXBiGLLSdB2L2lc"; // Clave de API para autenticación
const FOLDER_ID = "1WacAVstGYV6XnRiIw4L55BeuwtYFDa8T"; // ID de la carpeta de Google Drive

// Interfaz que define la estructura de un archivo o carpeta en Google Drive
interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
}

/**
 * Componente GoogleDriveFolders
 *
 * Este componente obtiene y muestra las carpetas almacenadas en una ubicación específica de Google Drive.
 * Permite a los usuarios acceder directamente a los recursos almacenados en la nube.
 */
const GoogleDriveFolders: FC = () => {
    // Estado para almacenar las carpetas obtenidas de Google Drive
    const [folders, setFolders] = useState<DriveFile[]>([]);

    // Estado para manejar posibles errores durante la carga de datos
    const [error, setError] = useState<string | null>(null);

    /**
     * Hook useEffect para obtener los datos de las carpetas desde Google Drive al cargar el componente.
     */
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}`
                );

                // Verificar si la respuesta es válida
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Manejo de errores dentro de la respuesta de la API
                if (data.error) {
                    throw new Error(data.error.message);
                }

                // Filtrar solo las carpetas dentro de los resultados
                const filteredFolders = data.files.filter(
                    (file: DriveFile) => file.mimeType === "application/vnd.google-apps.folder"
                );

                // Actualizar el estado con las carpetas obtenidas
                setFolders(filteredFolders);
            } catch (error: any) {
                // Captura y almacenamiento del error
                setError(error.message);
                console.error("Error fetching Google Drive folders:", error);
            }
        };

        fetchFolders(); // Llamar a la función de obtención de datos
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="bg-[#ED117F] px-8 py-16 min-h-screen text-white flex flex-col items-center">
            {/* Mensaje de error si ocurre un problema al obtener las carpetas */}
            {error ? (
                <p className="text-center text-yellow-300">{error}</p>
            ) : (
                <>
                    {/* Contenedor de carpetas obtenidas de Google Drive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl animate-fade-in">
                        {folders.map((folder) => (
                            <a
                                key={folder.id}
                                href={`https://drive.google.com/drive/u/1/folders/${folder.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center animate-fade-in"
                            >
                                {/* Imagen representativa de la carpeta */}
                                <img
                                    src={driveFolder}
                                    alt="Carpeta"
                                    className="w-20 h-20 mb-2"
                                />
                                {/* Nombre de la carpeta */}
                                <span className="font-semibold text-center">{folder.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Contenedor de la frase inspiradora y la imagen decorativa */}
                    <div className="mt-20 flex items-center justify-center gap-6 animate-fade-in">
                        <p className="font-light text-2xl italic text-white text-center">
                            "Abre la puerta al conocimiento"
                        </p>
                        <img
                            src={readingGirl}
                            alt="Chica leyendo"
                            className="hidden md:block w-52 md:w-64 h-auto -mb-16"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default GoogleDriveFolders;
