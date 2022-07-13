import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { slugify } from "../Helpers/Helpers";
import useGlobalContext from "./useGlobalContext";

/**
 * Created this Hook to set (Header Title, categoryBy and filterBy) automatically. It will not return any value.
 */
const useSetCategoryAndFilterBy = () => {
  const { setHeaderTitleHandler, CFBY_dispatchHandler } = useGlobalContext();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    let categoryBy = searchParams.get("categoryBy");
    let filterBy = searchParams.get("filterBy");
    categoryBy && (categoryBy = slugify(searchParams.get("categoryBy")));
    filterBy && (filterBy = slugify(searchParams.get("filterBy")));
    if (categoryBy && filterBy) {
      const payload = {
        type: "setState",
        categoryBy,
        filterBy,
      };
      CFBY_dispatchHandler(payload);
    }
    if (categoryBy) {
      setHeaderTitleHandler(categoryBy);
    }
  }, [searchParams]);
};

export default useSetCategoryAndFilterBy;
