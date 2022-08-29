import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper";
import Images from "../../assets/img/Images";
import SliderContent from "./SliderContent.js";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

const SLIDER_CONTENT = [
  {
    title: "Welcome to aking",
    subTitle: "Whats going to happen tomorrow?",
    img1: Images.SliderOne,
    img2: Images.SliderBgRed,
  },
  {
    title: "Work happens",
    subTitle: "Get notified when work happens.",
    img1: Images.SliderTwo,
    img2: Images.SliderBgBlue,
  },
  {
    title: "Tasks and assign",
    subTitle: "Task and assign them to colleagues.",
    img1: Images.SliderThree,
    img2: Images.SliderBgTeal,
  },
];

const Slider = () => {
  return (
    <>
      <div className="sliderComponentWrapper">
        <Swiper
          modules={[Pagination, EffectFade]}
          effect="fade"
          slidesPerView={1}
          pagination
          speed={800}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}>
          <SwiperSlide>
            <SliderContent content={SLIDER_CONTENT} index={0} />
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent content={SLIDER_CONTENT} index={1} />
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent content={SLIDER_CONTENT} index={2} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
