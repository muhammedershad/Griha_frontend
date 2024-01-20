import React, { useState, useEffect } from "react";

interface Props {
    images: string[];
}

const Carousel1: React.FC<Props> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);

        return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);

    return (
        <div className="relative overflow-hidden flex justify-center w-full h-[250px] md:h-[600px]">
            <div
                className="flex w-full mx-auto items-center transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {images.map((image: string, index: number) => (
                    <div key={index} className="w-full flex-shrink-0 mx-auto">
                        <img
                            className="object-cover w-full h-[250px] md:h-[50%]"
                            src={image}
                            alt={`Slide ${index}`}
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                            <p className="text-white text-lg font-bold">
                                {'sadfasdfasdf'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel1;
