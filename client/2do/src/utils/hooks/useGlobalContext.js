import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/**
 * Created this Hook to Destructuring Nested variable in Global Context.
 */
const useGlobalContext = () => {
  const { headerTitle, showLoader, filterOptions, filterOptionsModalOpen, authenticate } = useContext(GlobalContext);
  const [_headerTitle, setHeaderTitle] = headerTitle;
  const [_showLoader, setShowLoader] = showLoader;
  const [_filterOptions, filterOptionsDispatch] = filterOptions;
  const [_filterOptionsModalOpen, setFilterOptionsModalOpen] = filterOptionsModalOpen;
  const [_authenticate, setAuthenticate] = authenticate;

  const setHeaderTitleHandler = (value) => {
    setHeaderTitle(value);
  };

  const setShowLoaderHandler = (value) => {
    setShowLoader(value);
  };

  const filterOptionsDispatchHandler = (value) => {
    filterOptionsDispatch(value);
  };

  const setFilterOptionsModalOpenHandler = (value) => {
    setFilterOptionsModalOpen(value);
  };

  const setAuthenticateHandler = (value) => {
    setAuthenticate(value);
  };

  const obj = {
    setHeaderTitleHandler,
    setShowLoaderHandler,
    filterOptionsDispatchHandler,
    setFilterOptionsModalOpenHandler,
    setAuthenticateHandler,
    headerTitle: _headerTitle,
    showLoader: _showLoader,
    filterOptions: _filterOptions,
    filterOptionsModalOpen: _filterOptionsModalOpen,
    authenticate: _authenticate,
  };
  return obj;
};
// *************** THIS IS PART TWO => THE SECOND STEP ***************

export default useGlobalContext;
