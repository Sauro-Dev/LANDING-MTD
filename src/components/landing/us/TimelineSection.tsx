import { FC } from "react";

const TimelineSection: FC = () => (
    <div className=" bg-white mb-[100px]">
        <div className="container mx-auto px-8 ">
            <div className="relative w-full">
                <img
                    src="/src/assets/faq/timeline.png"
                    alt="Línea de Tiempo"
                    className="w-full h-[700px] object-cover rounded-[50px] shadow-lg"
                />
            </div>
        </div>
    </div>
);

export default TimelineSection;
