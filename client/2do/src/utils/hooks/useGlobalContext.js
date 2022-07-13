import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/**
 * Created this Hook to Destructuring Nested variable in Global Context.
 */
const useGlobalContext = () => {
  const { headerTitle, CFBY_state } = useContext(GlobalContext);
  const [_headerTitle, setHeaderTitle] = headerTitle;
  const [_CFBY_state, CFBY_dispatch] = CFBY_state;

  const setHeaderTitleHandler = (value) => {
    setHeaderTitle(value);
  };

  const CFBY_dispatchHandler = (value) => {
    CFBY_dispatch(value);
  };

  const obj = {
    setHeaderTitleHandler,
    CFBY_dispatchHandler,
    headerTitle: _headerTitle,
    CFBY_state: _CFBY_state,
  };
  return obj;
};

export default useGlobalContext;
