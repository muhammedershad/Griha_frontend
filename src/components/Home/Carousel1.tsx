import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="relative overflow-hidden w-full h-[600px]">
            {/* Image Carousel */}
            <div
                className="relative flex w-full mx-auto items-center transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {images.map((image: string, index: number) => (
                    <div key={index} className="w-full flex-shrink-0 mx-auto">
                        <img
                            className="object-cover w-full h-[600px]"
                            src={image}
                            alt={`Slide ${index}`}
                        />
                    </div>
                ))}
            </div>

            {/* Text, Quote, and Button Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-indigo-600 bg-clip-text text-transparent">
                        Architecting dreams into reality
                    </h2>

                    {/* <p className="mt-2 text-xl">
                        Upgrade your everyday with top-notch quality and style
                        for an unparalleled experience.
                    </p> */}
                </div>

                <div className="mt-4">
                    <Link to="/project">
                        <button className="px-4 py-2 bg-gradient-to-r from-[#2d63d8] to-[#02155c] opacity-100 hover:opacity-90 text-white rounded-full">
                            Explore More Projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Carousel1;
