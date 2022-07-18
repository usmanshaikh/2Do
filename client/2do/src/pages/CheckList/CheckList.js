import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import CheckListCard from "../../components/Cards/CheckListCard/CheckListCard";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./CheckList.scss";

const CheckList = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  return (
    <>
      <Calendar />
      <div className="checkListPageWrapper">
        <CheckListCard />
      </div>
    </>
  );
};

export default CheckList;
