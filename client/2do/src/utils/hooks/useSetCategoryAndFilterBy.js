import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useGlobalContext from "./useGlobalContext";

/**
 * Created this Hook to set (Header Title, categoryBy and filterBy) automatically. It will not return any value.
 */
const useSetCategoryAndFilterBy = () => {
  const { setHeaderTitleHandler, CFBY_dispatchHandler } = useGlobalContext();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryBy = searchParams.get("categoryBy");
    const filterBy = searchParams.get("filterBy");
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
