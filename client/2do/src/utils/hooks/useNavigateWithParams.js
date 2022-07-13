import { createSearchParams, useNavigate } from "react-router-dom";
import { slugify } from "../Helpers/Helpers";

/**
 * Created this Hook to Navigate With Query Params (categoryBy, filterBy).
 */
const useNavigateWithParams = () => {
  const navigate = useNavigate();

  const navigateWithParams = (url, categoryBy, filterBy) => {
    navigate({
      pathname: url,
      search: createSearchParams({
        categoryBy: slugify(categoryBy.toLowerCase()),
        filterBy: slugify(filterBy.toLowerCase()),
      }).toString(),
    });
  };

  return { navigateWithParams };
};

export default useNavigateWithParams;
