import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { checklistApi } from "../../api";
import { ChecklistCard, NoDataFound } from "../../components";
import { MSG, ROUTES } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { ChecklistAllPayload, ChecklistResponse } from "../../api/types";
import { showSnackbar } from "../../store/slices";
import { getAxiosErrorMessage } from "../../utils/helpers";
import "./Checklist.scss";

const Checklist = () => {
  const filter = useAppSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [checklists, setChecklists] = useState<ChecklistResponse[]>([]);

  useEffect(() => {
    filter.selectedCategory?._id && fetchChecklists();
  }, [filter]);

  const fetchChecklists = async () => {
    const payload: ChecklistAllPayload = {
      category: filter.selectedCategory?._id,
      isCompleted: filter.selectedStatus?.isCompleted,
    };
    try {
      const { data } = await checklistApi.allChecklists(payload);
      setChecklists(data.data);
    } catch (error) {
      setChecklists([]);
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleEditChecklist = (data: ChecklistResponse) => {
    const checklistId = data._id;
    navigate({
      pathname: `${location.pathname}/${ROUTES.ADD_EDIT_CHECKLIST}`,
      search: createSearchParams({
        checklistId,
        edit: "true",
      }).toString(),
    });
  };

  return (
    <>
      <Box className="checklistPageWrapper">
        {checklists.length ? (
          <ChecklistCard checklists={checklists} onEditChecklist={handleEditChecklist} />
        ) : (
          <NoDataFound />
        )}
      </Box>
    </>
  );
};

export default Checklist;
