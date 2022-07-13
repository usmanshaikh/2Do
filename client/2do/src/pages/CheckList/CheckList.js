import React from "react";
import CheckListCard from "../../components/Cards/CheckListCard/CheckListCard";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./CheckList.scss";

const CheckList = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  return (
    <>
      <div className="checkListPageWrapper">
        <CheckListCard />
      </div>
    </>
  );
};

export default CheckList;
