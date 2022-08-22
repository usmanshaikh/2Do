import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loader from "../../assets/js/lottie/loader.json";
import "./Loader.scss";

const Loader = () => {
  const animateRef = useRef();

  useEffect(() => {
    animateRef.current = lottie.loadAnimation({
      container: document.querySelector("#lottieAnimation"),
      animationData: loader,
      loop: true,
      autoplay: false,
    });
    animateRef.current.setSpeed(3);
    (function exists() {
      const ID = document.getElementById("LOADER_COMPONENT");
      if (!ID) {
        return setTimeout(exists);
      }
      const options = { attributes: true, target: true };
      function callback(mutationList, observer) {
        mutationList.forEach(function (mutation, idx) {
          if (mutation.type === "attributes" && mutation.attributeName === "class") {
            const cls = mutation.target.className.split(" ")[1];
            if (idx === 0) {
              if (cls === "show") startAnimation();
            }
            if (cls === "hide") stopAnimation();
          }
        });
      }
      const observer = new MutationObserver(callback);
      observer.observe(ID, options);
    })();
  }, []);

  const startAnimation = () => animateRef.current.play();

  const stopAnimation = () => animateRef.current.stop();

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
