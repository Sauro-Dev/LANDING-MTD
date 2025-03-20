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
        <section className="relative w-full overflow-hidden">
            <div className="w-full">
                <Carousel options={OPTIONS} isAutoPlay={true} className="w-full">
                    <SliderContainer className="gap-0">
                        {banners.length > 0 ? (
                            banners.map((banner) => (
                                <Slider key={banner.idLandingFiles} className="w-full">
                                    <div className="relative aspect-[10/3] w-full overflow-hidden">
                                        <img
                                            src={getS3ImageUrl(banner.fileName)}
                                            alt={`Banner promocional ${banner.idLandingFiles}`}
                                            className="w-full h-full object-cover absolute inset-0"
                                            loading="lazy"
                                        />
                                    </div>
                                </Slider>
                            ))
                        ) : (
                            <Slider className="w-full">
                                <div className="flex items-center justify-center h-40 sm:h-60 md:h-80 lg:h-96 bg-gray-100 w-full">
                                    <p className="text-center text-gray-500">Cargando banners...</p>
                                </div>
                            </Slider>
                        )}
                    </SliderContainer>
                </Carousel>
            </div>
        </section>
    );
};

export default HeroSection;