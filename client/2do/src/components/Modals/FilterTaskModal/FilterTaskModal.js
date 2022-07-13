import React, { useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle, Icon, List, ListItem, ListItemText } from "@mui/material";
import "./FilterTaskModal.scss";

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
    label: "all tasks",
    id: 1,
  },
  {
    label: "incomplete tasks",
    id: 2,
  },
  {
    label: "completed tasks",
    id: 3,
  },
];

/**
 *
 * @param {{ onFilter: () }} props
 */

const FilterTaskModal = (props) => {
  const { onClose, open, onFilter } = props;
  const [categoryBy, setCategoryBy] = useState(CATEGORY_ITEM[0].label);
  const [filterBy, setFilterBy] = useState(FILTER_ITEM[0].label);
  const navigate = useNavigate();
  const location = useLocation();

  const onFilterHandler = () => {
    const payload = {
      categoryBy,
      filterBy,
    };
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        categoryBy: categoryBy.toLowerCase(),
        filterBy: filterBy.toLowerCase(),
      }).toString(),
    });
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
