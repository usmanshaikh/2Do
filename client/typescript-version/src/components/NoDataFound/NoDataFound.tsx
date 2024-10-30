import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import noDataFound from "../../assets/js/lottie/noDataFound.json";
import "./NoDataFound.scss";
import { Box } from "@mui/material";

const NoDataFound = () => {
  const animateRef = useRef<any>();

  useEffect(() => {
    const element = document.querySelector("#noDataFoundAnimation");
    if (element) {
      animateRef.current = lottie.loadAnimation({
        container: element,
        animationData: noDataFound,
        loop: true,
        autoplay: true,
      });
    }
    animateRef.current.setSpeed(3);
  }, []);

  return (
    <>
      <Box className="noDataFoundComponentWrapper">
        <Box className="container">
          <Box id="noDataFoundAnimation" />
        </Box>
      </Box>
    </>
  );
};

export default NoDataFound;
