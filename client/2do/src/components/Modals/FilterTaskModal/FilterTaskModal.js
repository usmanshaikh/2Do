import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle, Icon, List, ListItem, ListItemText } from "@mui/material";
import * as Msg from "../../../utils/constants/message.constants";
import useNavigateWithParams from "../../../utils/hooks/useNavigateWithParams";
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
    label: Msg.FITER_BY_ALL,
    id: 1,
  },
  {
    label: Msg.FITER_BY_INCOMPLETE,
    id: 2,
  },
  {
    label: Msg.FITER_BY_COMPLETED,
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
