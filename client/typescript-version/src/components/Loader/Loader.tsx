import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import lottieLoader from "../../assets/js/lottie/loader.json";
import "./Loader.scss";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";
import { Box } from "@mui/material";

const Loader = () => {
  const loader = useAppSelector((state: RootState) => state.loader);
  const animateRef = useRef<any>();

  useEffect(() => {
    animateRef.current = lottie.loadAnimation({
      container: document.querySelector("#lottieAnimation") as any,
      animationData: lottieLoader,
      loop: true,
      autoplay: false,
    });
    animateRef.current.setSpeed(3);
    if (loader.isLoading) startAnimation();
    else stopAnimation();
  }, [loader.isLoading]);

  const startAnimation = () => animateRef.current.play();

  const stopAnimation = () => animateRef.current.stop();

  return (
    <>
      {loader.isLoading && (
        <Box className="loaderComponentWrapper" id="LOADER_COMPONENT">
          <Box className="bg-layer">
            <Box id="lottieAnimation" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Loader;
