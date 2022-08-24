import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useGlobalContext from "./useGlobalContext";

/**
 * Created this Hook to set (category and isCompleted) automatically. It will not return any value.
 */
const useSetCategoryAndFilterBy = () => {
  const { filterOptionsDispatch } = useGlobalContext();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    let category = searchParams.get("category");
    let isCompleted = searchParams.get("isCompleted");
    category && (category = searchParams.get("category"));
    isCompleted && (isCompleted = searchParams.get("isCompleted"));
    if (category && isCompleted) {
      const payload = { type: "setState", category, isCompleted };
      filterOptionsDispatch(payload);
    }
  }, [searchParams]);
};

export default useSetCategoryAndFilterBy;
