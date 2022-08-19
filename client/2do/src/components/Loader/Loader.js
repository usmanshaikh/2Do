import React, { useEffect } from "react";
import lottie from "lottie-web";
import loader from "../../assets/js/lottie/loader.json";
import "./Loader.scss";

const Loader = () => {
  useEffect(() => {
    let animate = lottie.loadAnimation({
      container: document.querySelector("#lottieAnimation"),
      animationData: loader,
    });
    animate.setSpeed(3);
  }, []);

  return (
    <>
      <div className="loaderComponentWrapper" id="LOADER_COMPONENT">
        <div className="bg-layer">
          <div id="lottieAnimation" />
        </div>
      </div>
    </>
  );
};

export default Loader;
