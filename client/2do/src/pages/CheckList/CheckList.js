import React from "react";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import ChecklistCard from "../../components/Cards/ChecklistCard/ChecklistCard";
import { useSetCategoryAndFilterBy } from "../../utils/hooks";
import "./Checklist.scss";

const Checklist = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  return (
    <>
      <DatePickerControl />
      <div className="checklistPageWrapper">
        <ChecklistCard />
      </div>
    </>
  );
};

export default Checklist;
