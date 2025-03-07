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
    const OPTIONS: EmblaOptionsType = { loop: true };
    const [, emblaApi] = useEmblaCarousel(OPTIONS);
    const [, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data: HistoryFile[]) => {
                const historyList = data.filter((file) => file.fileSector === "HISTORY");
                setHistoryFiles(historyList);
            })
            .catch((error) => console.error("Error cargando la historia:", error));
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <section className="relative w-full py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Línea de Tiempo</h2>
                <Carousel options={OPTIONS} isAutoPlay={true} className="w-full mx-auto">
                    <SliderContainer className="gap-4">
                        {historyFiles.length > 0 ? (
                            historyFiles.map((file) => (
                                <Slider key={file.idLandingFiles} className="w-full">
                                    <img
                                        src={getS3ImageUrl(file.fileName)}
                                        alt="Trayectoria"
                                        className="w-full h-auto max-h-[500px] rounded-lg shadow-lg"
                                    />
                                </Slider>
                            ))
                        ) : (
                            <Slider className="w-full">
                                <p className="text-center text-gray-500">Cargando trayectoria...</p>
                            </Slider>
                        )}
                    </SliderContainer>
                </Carousel>
            </div>
        </section>
    );
};

export default TimelineSection;
