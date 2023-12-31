import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className="">
      <Slider {...settings}>
        <img
          alt=""
          className="cursor-pointer"
          src="https://res.cloudinary.com/devkbqyym/image/upload/v1694435010/drinkit/banner1_hphgq0.png"
          onClick={() => {
            window.location.href = `${process.env.REACT_APP_MAINURL}/subscribes`;
          }}
        />
        <img
          alt=""
          className="cursor-pointer"
          src="https://res.cloudinary.com/devkbqyym/image/upload/v1694447595/drinkit/%EF%BC%91%EC%95%88_ssdd05.png"
          onClick={() => {
            window.location.href = `${process.env.REACT_APP_MAINURL}/chatList`;
          }}
        ></img>
        <img
          className="cursor-pointer"
          alt=""
          src="https://res.cloudinary.com/devkbqyym/image/upload/v1694435012/drinkit/banner2_jkgylc.png"
          onClick={() => {
            window.location.href = `${process.env.REACT_APP_MAINURL}/products/10`;
          }}
        />
        <img
          alt=""
          className="cursor-pointer"
          src="https://res.cloudinary.com/devkbqyym/image/upload/v1694435026/drinkit/banner4_jvvjdn.png"
          onClick={() => {
            window.location.href = `${process.env.REACT_APP_MAINURL}/products/37`;
          }}
        />
        <img
          alt=""
          className="cursor-pointer"
          src="https://res.cloudinary.com/devkbqyym/image/upload/v1694435021/drinkit/banner3_ehelva.png"
          onClick={() => {
            window.location.href = `${process.env.REACT_APP_MAINURL}/products/39`;
          }}
        />
      </Slider>
    </div>
  );
}

//사용할 이미지를 Slider 태그 안에 위치시킴
