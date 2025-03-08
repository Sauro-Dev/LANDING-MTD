import { FC, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import environment from "../../../enviroment.ts";
import Carousel, { Slider, SliderContainer } from "../../ui/carousel/AutoCarousel.tsx";
import useEmblaCarousel from "embla-carousel-react";

interface HistoryFile {
    idLandingFiles: number;
    fileName: string;
    fileSector: string;
}

const API_URL = `${environment.API_URL}/landing-files/all`;

const getS3ImageUrl = (fileKey: string): string => {
    return fileKey.startsWith("http") ? fileKey : `https://tu-bucket-s3.s3.amazonaws.com/${fileKey}`;
};

const TimelineSection: FC = () => {
    const [historyFiles, setHistoryFiles] = useState<HistoryFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Responsive carousel options
    const OPTIONS: EmblaOptionsType = { 
        loop: true,
        align: 'center',
        containScroll: 'trimSnaps',
        dragFree: true
    };
    
    const [, emblaApi] = useEmblaCarousel(OPTIONS);
    const [, setSelectedIndex] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: HistoryFile[]) => {
                const historyList = data.filter((file) => file.fileSector === "HISTORY");
                setHistoryFiles(historyList);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error cargando la historia:", error);
                setError("No se pudo cargar la línea de tiempo. Por favor, intente más tarde.");
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <section 
            className="relative w-full py-8 sm:py-12 md:py-16 bg-[#ED117F]" 
            aria-labelledby="timeline-heading"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2 
                    id="timeline-heading" 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-white"
                >
                    Línea de Tiempo
                </h2>
                
                {error && (
                    <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg" role="alert">
                        {error}
                    </div>
                )}
                
                <div className="w-full mx-auto">
                    <Carousel 
                        options={OPTIONS} 
                        isAutoPlay={true} 
                        className="w-full mx-auto"
                        aria-label="Galería de imágenes de la línea de tiempo"
                    >
                        <SliderContainer className="gap-4">
                            {isLoading ? (
                                <Slider className="w-full flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-center text-white">Cargando trayectoria...</p>
                                    </div>
                                </Slider>
                            ) : historyFiles.length > 0 ? (
                                historyFiles.map((file, index) => (
                                    <Slider 
                                        key={file.idLandingFiles} 
                                        className="w-full flex-shrink-0"
                                    >
                                        <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] px-4 sm:px-8 md:px-12">
                                            <img
                                                src={getS3ImageUrl(file.fileName)}
                                                alt={`Imagen de trayectoria ${index + 1}`}
                                                className="w-auto h-full object-contain max-w-full rounded-lg shadow-lg"
                                                loading={index < 2 ? "eager" : "lazy"}
                                            />
                                        </div>
                                    </Slider>
                                ))
                            ) : (
                                <Slider className="w-full flex items-center justify-center min-h-[300px]">
                                    <p className="text-center text-white p-8 bg-[#48C3E6]/20 rounded-lg">
                                        No hay imágenes disponibles en este momento.
                                    </p>
                                </Slider>
                            )}
                        </SliderContainer>
                    </Carousel>
                </div>
                
                {/* Navigation dots indicator with improved visibility */}
                {historyFiles.length > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        {historyFiles.map((_, index) => (
                            <button
                                key={index}
                                className="w-4 h-4 rounded-full bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label={`Ir a la imagen ${index + 1}`}
                                onClick={() => emblaApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TimelineSection;