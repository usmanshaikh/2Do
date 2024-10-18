import React, { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CategoryAPI, ChecklistAPI } from "../../api";
import { ChecklistCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { useDidMountEffect, useGlobalContext } from "../../utils/hooks";
import { filterByToBoolean } from "../../utils/Helpers";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import constants from "../../utils/constants";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import "./Checklist.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Checklist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checklists, setChecklists] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const { filterOptions, filterOptionsDispatchHandler, filterOptionsModalOpen, setHeaderTitleHandler } =
    useGlobalContext();

  useEffect(() => {
    const headerTitle = filterOptions.categoryName;
    if (headerTitle) setHeaderTitleHandler(headerTitle);
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    CategoryAPI.allCategories()
      .then((res) => {
        if (!filterOptions.category || !filterOptions.isCompleted) {
          const path = res[0];
          const categoryColor = path.cardColor.color;
          const categoryName = path.categoryName;
          const category = path.id;
          const isCompleted = MSG.FITER_BY_ALL;
          const dispatchPayload = { type: "setState", categoryColor, categoryName, category, isCompleted };
          filterOptionsDispatchHandler(dispatchPayload);
        }
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  useEffect(() => {
    if (!filterOptionsModalOpen && (filterOptions.category || filterOptions.isCompleted)) {
      allChecklists();
    }
  }, [filterOptionsModalOpen, filterOptions]);

  useDidMountEffect(() => {
    allChecklists();
  }, [selectedDate]);

  const allChecklists = () => {
    let payload = {};
    payload.category = filterOptions.category;
    payload.isCompleted = filterByToBoolean(filterOptions.isCompleted);
    if (selectedDate) payload.dateAndTime = selectedDate;
    if (!payload.category && !payload.isCompleted && !payload.selectedDate) return;
    ChecklistAPI.allChecklists(payload)
      .then((res) => {
        setChecklists(res);
        if (!res.length) setIsLoading(true);
        else setIsLoading(false);
      })
      .catch((err) => {
        setChecklists();
        setIsLoading(true);
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const onEditChecklistHandler = (data) => {
    const checklistId = data.id;
    navigate({
      pathname: `${location.pathname}/${ROUTE.ADD_EDIT_CHECKLIST}`,
      search: createSearchParams({
        checklistId,
        edit: true,
      }).toString(),
    });
  };

  return (
    <>
      <DatePickerControl onSelectDate={(data) => setSelectedDate(data)} />
      <div className="checklistPageWrapper">
        {checklists && checklists.length ? (
          <ChecklistCard checklists={checklists} editChecklist={onEditChecklistHandler} />
        ) : null}
        {isLoading && <NoDataFound />}
      </div>
    </>
  );
};

export default Checklist;
