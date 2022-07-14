import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default ScrollToTop;
