"use client";
import React from "react";
import Slider, {LazyLoadTypes} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ScrollShadow} from "@nextui-org/scroll-shadow";


const Carousel: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const settings = {
        centerMode: true,
        centerPadding: "240px",
        slidesToShow: 1,
        adaptiveHeight: true,
        accessibility: true,
        arrows: true,
        swipe: true,
        lazyLoad: "ondemand" as LazyLoadTypes,
        infinite: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {React.Children.map(children, (child) => (
                    <div className="w-full lg:p-16 p-3">{child}</div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;