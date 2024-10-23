import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/**
 * Created this Hook to Destructuring Nested variable in Global Context.
 */
const useGlobalContext = () => {
  const { showLoader, authenticate } = useContext(GlobalContext);
  const [_showLoader, setShowLoader] = showLoader;
  const [_authenticate, setAuthenticate] = authenticate;

  const setShowLoaderHandler = (value) => {
    setShowLoader(value);
  };

  const setAuthenticateHandler = (value) => {
    setAuthenticate(value);
  };

  const obj = {
    setShowLoaderHandler,
    setAuthenticateHandler,
    showLoader: _showLoader,
    authenticate: _authenticate,
  };
  return obj;
};
// *************** THIS IS PART TWO => THE SECOND STEP ***************

export default useGlobalContext;
