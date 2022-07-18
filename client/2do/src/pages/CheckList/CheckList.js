import React from "react";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import CheckListCard from "../../components/Cards/CheckListCard/CheckListCard";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./CheckList.scss";

const CheckList = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  return (
    <>
      <DatePickerControl />
      <div className="checkListPageWrapper">
        <CheckListCard />
      </div>
    </>
  );
};

export default CheckList;
