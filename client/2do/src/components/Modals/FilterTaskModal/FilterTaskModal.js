import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, Icon, List, ListItem, ListItemText } from "@mui/material";
import { useGlobalContext } from "../../../utils/hooks";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import constants from "../../../utils/constants";
import CategoryAPI from "../../../api/CategoryAPI";
import Images from "../../../assets/img/images";
import "./FilterTaskModal.scss";

const MSG = constants.message;

const FILTER_ITEM = [{ label: MSG.FITER_BY_ALL }, { label: MSG.FITER_BY_PENDING }, { label: MSG.FITER_BY_COMPLETED }];

const FilterTaskModal = (props) => {
  const { onClose, open } = props;
  const [categoryId, setCategoryId] = useState();
  const [filterBy, setFilterBy] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const { setHeaderTitleHandler, filterOptions, filterOptionsDispatchHandler, setFilterOptionsModalOpenHandler } =
    useGlobalContext();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    setFilterOptionsModalOpenHandler(true);
    getAllCategories();
  }, []);

  useEffect(() => {
    setCategoryId(filterOptions.category);
    setFilterBy(filterOptions.isCompleted);
  }, [filterOptions]);

  const getAllCategories = () => {
    CategoryAPI.allCategoriesForModal()
      .then((res) => {
        if (!filterOptions.category || !filterOptions.isCompleted) {
          let category = res[0].id;
          let isCompleted = MSG.FITER_BY_ALL;
          const dispatchPayload = { type: "setState", category, isCompleted };
          filterOptionsDispatchHandler(dispatchPayload);
        }
        setCategories(res);
        setLoading(false);
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onFilterHandler = () => {
    categories.map((val) => (val.id === categoryId ? setHeaderTitleHandler(val.categoryName) : null));
    setFilterOptionsModalOpenHandler(false);
    onClose();
  };

  const onUpdateFilterOptions = (data, type) => {
    let category = filterOptions.category;
    let isCompleted = filterOptions.isCompleted;
    switch (type) {
      case "category":
        category = data;
        setCategoryId(data);
        break;
      case "filter":
        isCompleted = data;
        setFilterBy(data);
        break;
    }
    const dispatchPayload = { type: "setState", category, isCompleted };
    filterOptionsDispatchHandler(dispatchPayload);
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    onClose();
  };

  const loadingImgContent = (
    <div className="loadingWrap">
      <img src={Images.Loading} alt="Loading" className="loadingImg" />
    </div>
  );

  const modalContent = (
    <>
      <DialogTitle className="modalHeading">Category By</DialogTitle>
      <List>
        {categories &&
          categories.map((item) => (
            <ListItem key={item.id} button onClick={() => onUpdateFilterOptions(item.id, "category")}>
              <ListItemText className="filterName" primary={item.categoryName} />
              {categoryId === item.id && <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>}
            </ListItem>
          ))}
      </List>
      <DialogTitle className="modalHeading">Filter By</DialogTitle>
      <List>
        {FILTER_ITEM.map((item) => (
          <ListItem key={item.label} button onClick={() => onUpdateFilterOptions(item.label, "filter")}>
            <ListItemText className="filterName" primary={item.label} />
            {filterBy === item.label && <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>}
          </ListItem>
        ))}
      </List>
      <DialogActions className="actionBtnFlexContainer">
        <Button onClick={onClose} className="cancelBtn actionBtn">
          Cancel
        </Button>
        <Button variant="contained" onClick={onFilterHandler} className="filterBtn actionBtn successBtn">
          Filter
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Dialog
        className="filterTaskModalComponentWrapper commonModalWrapper"
        onClose={handleClose}
        open={open}
        fullWidth={true}>
        {loading ? loadingImgContent : modalContent}
      </Dialog>
    </>
  );
};

export default FilterTaskModal;
