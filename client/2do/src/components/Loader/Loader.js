import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../utils/hooks";
import lottie from "lottie-web";
import loader from "../../assets/js/lottie/loader.json";
import "./Loader.scss";

const Loader = () => {
  const { showLoader } = useGlobalContext();
  const animateRef = useRef();

  useEffect(() => {
    animateRef.current = lottie.loadAnimation({
      container: document.querySelector("#lottieAnimation"),
      animationData: loader,
      loop: true,
      autoplay: false,
    });
    animateRef.current.setSpeed(3);
    if (showLoader) startAnimation();
    else stopAnimation();
  }, [showLoader]);

  const startAnimation = () => animateRef.current.play();

  const stopAnimation = () => animateRef.current.stop();

  return (
    <>
      {showLoader && (
        <div className="loaderComponentWrapper" id="LOADER_COMPONENT">
          <div className="bg-layer">
            <div id="lottieAnimation" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
