import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import noDataFound from "../../assets/js/lottie/noDataFound.json";
import "./NoDataFound.scss";

const NoDataFound = () => {
  const animateRef = useRef();

  useEffect(() => {
    animateRef.current = lottie.loadAnimation({
      container: document.querySelector("#noDataFoundAnimation"),
      animationData: noDataFound,
      loop: true,
      autoplay: true,
    });
    animateRef.current.setSpeed(3);
  }, []);

  return (
    <>
      <div className="noDataFoundComponentWrapper">
        <div className="container">
          <div id="noDataFoundAnimation" />
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
