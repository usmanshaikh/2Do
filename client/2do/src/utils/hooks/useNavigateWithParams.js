import { createSearchParams, useNavigate } from "react-router-dom";

/**
 * Created this Hook to Navigate With Query Params (categoryId, filterBy).
 */
const useNavigateWithParams = () => {
  const navigate = useNavigate();

  const navigateWithParams = (url, categoryId, filterBy) => {
    navigate({
      pathname: url,
      search: createSearchParams({ categoryId, filterBy }).toString(),
    });
  };

  return { navigateWithParams };
};

export default useNavigateWithParams;
