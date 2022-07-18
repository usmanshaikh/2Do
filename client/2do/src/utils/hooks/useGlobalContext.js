import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/**
 * Created this Hook to Destructuring Nested variable in Global Context.
 */
const useGlobalContext = () => {
  const { headerTitle, CFBY_state, authenticate } = useContext(GlobalContext);
  const [_headerTitle, setHeaderTitle] = headerTitle;
  const [_CFBY_state, CFBY_dispatch] = CFBY_state;
  const [_authenticate, setAuthenticate] = authenticate;

  const setHeaderTitleHandler = (value) => {
    setHeaderTitle(value);
  };

  const CFBY_dispatchHandler = (value) => {
    CFBY_dispatch(value);
  };

  const setAuthenticateHandler = (value) => {
    setAuthenticate(value);
  };

  const obj = {
    setHeaderTitleHandler,
    CFBY_dispatchHandler,
    setAuthenticateHandler,
    headerTitle: _headerTitle,
    CFBY_state: _CFBY_state,
    authenticate: _authenticate,
  };
  return obj;
};

export default useGlobalContext;
