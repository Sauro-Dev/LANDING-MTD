import { FC, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import environment from "../../../enviroment.ts";
import Carousel, { Slider, SliderContainer } from "../../ui/carousel/AutoCarousel.tsx";
import useEmblaCarousel from "embla-carousel-react";

interface Banner {
    idLandingFiles: number;
    fileName: string;
    fileSector: string;
}

const API_URL = `${environment.API_URL}/landing-files/all`;

const getS3ImageUrl = (fileKey: string): string => {
    return fileKey.startsWith("http") ? fileKey : `https://tu-bucket-s3.s3.amazonaws.com/${fileKey}`;
};

const HeroSection: FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const OPTIONS: EmblaOptionsType = { loop: true };
    const [, emblaApi] = useEmblaCarousel(OPTIONS);
    const [, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data: Banner[]) => {
                const bannerList = data.filter((file) => file.fileSector === "BANNER");
                setBanners(bannerList);
            })
            .catch((error) => console.error("Error cargando los banners:", error));
    }, []);


    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <section className="relative w-full">
            <Carousel options={OPTIONS} isAutoPlay={true} className="w-full mx-auto">
                <SliderContainer className="gap-2">
                    {banners.length > 0 ? (
                        banners.map((banner) => (
                            <Slider key={banner.idLandingFiles} className="w-full">
                                <img
                                    src={getS3ImageUrl(banner.fileName)}
                                    alt="Banner"
                                    className="w-full h-auto max-h-[500px]"
                                />
                            </Slider>
                        ))
                    ) : (
                        <Slider className="w-full">
                            <p className="text-center text-gray-500">Cargando banners...</p>
                        </Slider>
                    )}
                </SliderContainer>
            </Carousel>
        </section>
    );
};

export default HeroSection;
