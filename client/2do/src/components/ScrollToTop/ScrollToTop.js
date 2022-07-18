import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * After route change page start from top.
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default ScrollToTop;
