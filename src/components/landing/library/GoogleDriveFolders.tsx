import { FC, useEffect, useState } from "react";
import driveFolder from "../../../assets/library/drivefolder.png";
import readingGirl from "../../../assets/library/chicaleyendo.png"; // Imagen de la chica leyendo

const API_KEY = "AIzaSyByqLVx-zkF_0leNc4uwXBiGLLSdB2L2lc"; // Tu API Key
const FOLDER_ID = "1WacAVstGYV6XnRiIw4L55BeuwtYFDa8T"; // ID de la carpeta

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
}

const GoogleDriveFolders: FC = () => {
    const [folders, setFolders] = useState<DriveFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message);
                }

                const filteredFolders = data.files.filter(
                    (file: DriveFile) => file.mimeType === "application/vnd.google-apps.folder"
                );

                setFolders(filteredFolders);
            } catch (error: any) {
                setError(error.message);
                console.error("Error fetching Google Drive folders:", error);
            }
        };

        fetchFolders();
    }, []);

    return (
        <div className="bg-[#ED117F] px-8 py-16 min-h-screen text-white flex flex-col items-center">
            {error ? (
                <p className="text-center text-yellow-300">{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {folders.map((folder) => (
                            <a
                                key={folder.id}
                                href={`https://drive.google.com/drive/u/1/folders/${folder.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center"
                            >
                                <img
                                    src={driveFolder}
                                    alt="Carpeta"
                                    className="w-20 h-20 mb-2"
                                />
                                <span className="font-semibold text-center">{folder.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Contenedor de la frase y la imagen */}
                    <div className="mt-20 flex items-center justify-center gap-6">
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
