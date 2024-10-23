import React, { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ChecklistAPI } from "../../api";
import { ChecklistCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import constants from "../../utils/constants";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Filters from "../../components/Filters/Filters";
import "./Checklist.scss";

const ROUTE = constants.routePath;

const Checklist = () => {
  const filter = useSelector((state) => state.filter);
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    filter.selectedCategory?.id && fetchChecklists();
  }, [filter]);

  const fetchChecklists = async () => {
    const payload = {
      category: filter.selectedCategory?.id,
      isCompleted: filter.selectedStatus?.isCompleted,
    };
    try {
      const res = await ChecklistAPI.allChecklists(payload);
      setChecklists(res);
    } catch (err) {
      setChecklists([]);
      snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
    }
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
      <Box className="checklistPageWrapper">
        {checklists.length ? (
          <ChecklistCard checklists={checklists} editChecklist={onEditChecklistHandler} />
        ) : (
          <NoDataFound />
        )}
      </Box>
    </>
  );
};

export default Checklist;
