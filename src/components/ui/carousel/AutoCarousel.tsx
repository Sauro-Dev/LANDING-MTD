"use client";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../utils/cn";

interface CarouselProps {
    children: React.ReactNode;
    options: EmblaOptionsType;
    className?: string;
    isAutoPlay?: boolean;
}

const AutoCarousel: React.FC<CarouselProps> = ({
                                                   children,
                                                   options,
                                                   className,
                                                   isAutoPlay = false,
                                               }) => {
    const plugins = isAutoPlay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : [];

    const [emblaRef] = useEmblaCarousel(options, plugins);

    return (
        <div className={cn("overflow-hidden rounded-md", className)} ref={emblaRef}>
            {children}
        </div>
    );
};

export const SliderContainer = ({ className, children }: { className?: string; children: ReactNode }) => {
    return <div className={cn("flex", className)}>{children}</div>;
};

export const Slider: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={cn("min-w-0 flex-grow-0 flex-shrink-0 w-full h-[500px] flex items-center justify-center", className)}>
            {children}
        </div>
    );
};

export const SliderDotButton = ({
                                    className,
                                    slidesCount,
                                    onDotClick,
                                    selectedIndex
                                }: {
    className?: string;
    slidesCount: number;
    onDotClick: (index: number) => void;
    selectedIndex: number;
}) => {
    return (
        <div className={cn("flex", className)}>
            <div className="flex gap-2">
                {Array.from({ length: slidesCount }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onDotClick(index)}
                        className={`relative inline-flex p-0 m-0 w-10 h-2 rounded-full transition ${
                            index === selectedIndex ? "bg-gray-800" : "bg-gray-500/40"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default AutoCarousel;
