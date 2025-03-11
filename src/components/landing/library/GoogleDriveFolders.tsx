import { FC, useEffect, useState } from "react";
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

    // Controla si debemos mostrar el mensaje de "No hay carpetas"
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);

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
                    // Podemos manejar distintos mensajes según el código de estado
                    if (response.status === 403) {
                        throw new Error(
                            "La clave de API no es válida o no tienes permisos suficientes."
                        );
                    } else if (response.status === 404) {
                        throw new Error(
                            "No se encontró la carpeta en Google Drive."
                        );
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
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
            }
        };

        fetchFolders(); // Llamar a la función de obtención de datos

        // Se establece un "cooldown" de 1 segundo para esperar la carga de carpetas
        const timer = setTimeout(() => {
            // Si después de 1s aún no hay carpetas y no hay error, mostramos el mensaje
            if (folders.length === 0 && !error) {
                setShowEmptyMessage(true);
            }
        }, 1000);

        // Limpiamos el timeout si el componente se desmonta antes de cumplirse el segundo
        return () => clearTimeout(timer);
    }, [error, folders.length]);

    // Si en algún momento llegan carpetas, quitamos el mensaje (en caso de que se hubiera activado)
    useEffect(() => {
        if (folders.length > 0) {
            setShowEmptyMessage(false);
        }
    }, [folders]);


    return (
        <div className="bg-[#ED117F] px-8 py-16 text-white flex flex-col items-center">
            {error ? (
                // Bloque para mostrar el ícono de error y el texto centrado
                <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4">
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
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374
              1.948 3.374h14.71c1.73 0 2.813-1.874
              1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0
              L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>

                    <p className="text-3xl font-bold">Ha ocurrido un error</p>
                    {/* Mostramos el detalle del error debajo */}
                    <p className="text-lg">{error}</p>
                </div>
            ) : showEmptyMessage ? (
                // Mensaje de "No hay carpetas" tras 1 segundo sin datos
                <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4">
                    {/* Ícono de carpeta faltante */}
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
                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0
              a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05
              a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6
              A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0
              1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                        />
                    </svg>

                    <p className="text-3xl font-bold">No hay carpetas existentes</p>
                    <p className="text-lg">
                        Intenta nuevamente más tarde o verifica la conexión con la API.
                    </p>
                </div>
            ) : (
                // Si hay carpetas, las mostramos
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl animate-fade-in">
                        {folders.map((folder) => (
                            <a
                            key={folder.id}
                            href={`https://drive.google.com/drive/u/1/folders/${folder.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center animate-fade-in"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-20 h-20 mb-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12
                                        a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0
                                        21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                    />
                                </svg>
                                <span className="font-semibold text-center">{folder.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Frase inspiradora e imagen decorativa */}
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