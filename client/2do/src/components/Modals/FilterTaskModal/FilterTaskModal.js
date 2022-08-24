import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle, Icon, List, ListItem, ListItemText } from "@mui/material";
import constants from "../../../utils/constants";
import { useNavigateWithParams, useGlobalContext } from "../../../utils/hooks";
import { unslugify } from "../../../utils/Helpers";
import "./FilterTaskModal.scss";

const MSG = constants.message;

const CATEGORY_ITEM = [
  {
    label: "personal",
    id: 1,
  },
  {
    label: "home",
    id: 2,
  },
  {
    label: "office",
    id: 3,
  },
];

const FILTER_ITEM = [
  {
    label: MSG.FITER_BY_ALL,
    id: 1,
  },
  {
    label: MSG.FITER_BY_PENDING,
    id: 2,
  },
  {
    label: MSG.FITER_BY_COMPLETED,
    id: 3,
  },
];

/**
 *
 * @param {{ onFilter: () }} props
 */

const FilterTaskModal = (props) => {
  const { onClose, open, onFilter } = props;
  const { CFBY_state } = useGlobalContext();
  const [categoryBy, setCategoryBy] = useState(unslugify(CFBY_state.categoryBy));
  const [filterBy, setFilterBy] = useState(unslugify(CFBY_state.filterBy));
  const location = useLocation();
  const { navigateWithParams } = useNavigateWithParams();

  const onFilterHandler = () => {
    const payload = {
      categoryBy,
      filterBy,
    };
    navigateWithParams(location.pathname, categoryBy, filterBy);
    onFilter(payload);
    onClose();
  };

  const onCancelHandler = () => {
    onClose();
  };

  const categoryByHandler = (data) => {
    setCategoryBy(data);
  };

  const filterByHandler = (data) => {
    setFilterBy(data);
  };

  return (
    <>
      <Dialog
        className="filterTaskModalComponentWrapper commonModalWrapper"
        onClose={onClose}
        open={open}
        fullWidth={true}>
        <DialogTitle className="modalHeading">Category By</DialogTitle>
        <List>
          {CATEGORY_ITEM.map((item) => (
            <ListItem key={item.id} button onClick={() => categoryByHandler(item.label)}>
              <ListItemText className="filterName" primary={item.label} />
              {categoryBy === item.label && <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>}
            </ListItem>
          ))}
        </List>
        <DialogTitle className="modalHeading">Filter By</DialogTitle>
        <List>
          {FILTER_ITEM.map((item) => (
            <ListItem key={item.id} button onClick={() => filterByHandler(item.label)}>
              <ListItemText className="filterName" primary={item.label} />
              {filterBy === item.label && <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>}
            </ListItem>
          ))}
        </List>
        <DialogActions className="actionBtnFlexContainer">
          <Button onClick={onCancelHandler} className="cancelBtn actionBtn">
            Cancel
          </Button>
          <Button variant="contained" onClick={onFilterHandler} className="filterBtn actionBtn successBtn">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterTaskModal;
