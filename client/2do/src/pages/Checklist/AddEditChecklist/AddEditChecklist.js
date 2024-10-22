import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useModal } from "mui-modal-provider";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { TextField, Checkbox, Icon, Button } from "@mui/material";
import { ConfirmationModal, SuccessModal } from "../../../components/Modals";
import { hideFooter, showFooter } from "../../../utils/Helpers";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChecklistAPI } from "../../../api";
import ChooseColor from "../../../components/ChooseColor/ChooseColor";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ChooseCategory from "../../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../../components/SetDateTime/SetDateTime";
import constants from "../../../utils/constants";
import GetAlert from "../../../components/GetAlert/GetAlert";
import MarkAsComplete from "../../../components/MarkAsComplete/MarkAsComplete";
import "./AddEditChecklist.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const label = { inputProps: { "aria-label": "Checkbox" } };

const validationSchema = yup.object({
  title: yup.string().required(MSG.TITLE_REQUIRED),
});

const AddEditChecklist = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState("false");
  const [checklist, setChecklist] = useState();
  const [compState, setCompState] = useState({});
  const { showModal } = useModal();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      checklistItems: [
        {
          isChecked: false,
          text: "",
          id: 1,
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const initialState = {
        message: MSG.CREATE_CHECKLIST,
        onConfirm: () => submitFormHandler(),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  useEffect(() => {
    resetAllData();
    checkIfEdit();
  }, [searchParams]);

  const resetAllData = () => {
    // Because we are using same component so manually resetting the component
    setChecklist(null);
    setCompState(null);
    formik.setFieldValue("title", "");
    formik.setFieldValue("checklistItems", []);
  };

  const checkIfEdit = () => {
    const checklistId = searchParams.get("checklistId");
    const isEdit = searchParams.get("edit");
    let isEditBoolean;
    if (isEdit === "true") isEditBoolean = true;
    else isEditBoolean = false;
    setIsEdit(isEditBoolean);
    isEditBoolean && getChecklist(checklistId);
  };

  const getChecklist = (checklistId) => {
    ChecklistAPI.getChecklist(checklistId)
      .then((res) => {
        setChecklist(res);
        const defaultCompValues = {
          title: res.title,
          category: res.category,
          cardColor: res.cardColor,
          dateAndTime: res.dateAndTime,
          alert: res.alert,
          isCompleted: res.isCompleted,
        };
        setCompState(defaultCompValues);
        formik.setFieldValue("title", res.title);
        formik.setFieldValue("checklistItems", res.checklistItems);
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const updateCompState = (data) => {
    setCompState((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const submitFormHandler = () => {
    const formValue = formik.values;
    const checklistId = searchParams.get("checklistId");
    compState.title = formValue.title;
    compState.checklistItems = JSON.parse(JSON.stringify(formValue.checklistItems));
    compState.checklistItems.map((v) => delete v.id);
    if (isEdit) {
      ChecklistAPI.updateChecklist(compState, checklistId)
        .then((res) => {
          const initialState = {
            message: MSG.CHANGES_SAVED,
            onClose: () => navigateTo(),
          };
          showModal(SuccessModal, initialState, { destroyOnClose: true });
        })
        .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
    } else {
      compState.isCompleted = false;
      ChecklistAPI.createChecklist(compState)
        .then((res) => {
          const initialState = {
            message: MSG.CHECKLIST_CREATED,
            onClose: () => navigateTo(),
          };
          showModal(SuccessModal, initialState, { destroyOnClose: true });
        })
        .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
    }
  };

  const onDeleteHandler = () => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => confirmDeleteChecklistHandler(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const confirmDeleteChecklistHandler = () => {
    const checklistId = searchParams.get("checklistId");
    ChecklistAPI.deleteChecklist(checklistId)
      .then((res) => {
        const initialState = {
          message: MSG.CHECKLIST_DELETED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const navigateTo = () => {
    navigate(`/${ROUTE.CHECKLIST}`);
  };

  const onRemoveItemHandler = (arrayHelper, index) => {
    arrayHelper.remove(index);
  };

  const onAddItemHandler = (arrayHelper) => {
    const path = formik.values.checklistItems;
    let currentIdx = 1;
    if (path.length) currentIdx = path[path.length - 1].id + 1;
    const newField = {
      isChecked: false,
      text: "",
      id: currentIdx,
    };
    arrayHelper.push(newField);
  };

  const onCheckboxHandler = (checklistItem, index) => {
    formik.values.checklistItems.map((item) => {
      if (item.id === checklistItem.id) {
        if (item.isChecked) {
          item.isChecked = false;
          formik.setFieldValue(`checklistItems.${index}.isChecked`, false);
        } else {
          item.isChecked = true;
          formik.setFieldValue(`checklistItems.${index}.isChecked`, true);
        }
      }
    });
  };

  return (
    <>
      {(checklist || !isEdit) && (
        <div className="addChecklistPageWrapper">
          <div className="cardWrapper">
            <div className="formWrapper">
              <form onSubmit={formik.handleSubmit}>
                <div className="commonInputWrap">
                  <span className="commonLabel">Title</span>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="title"
                    name="title"
                    autoComplete="off"
                    className="commonInputFormControl"
                    placeholder="Enter Title"
                    value={formik.values.title}
                    onFocus={hideFooter}
                    onBlur={showFooter}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <div className="checkboxListWrap">
                    <FormikProvider value={formik}>
                      <FieldArray
                        name="checklistItems"
                        render={(arrayHelper) => (
                          <>
                            {formik.values.checklistItems && formik.values.checklistItems.length > 0
                              ? formik.values.checklistItems.map((checklistItem, index) => (
                                  <div className="listItemWrap" key={checklistItem.id}>
                                    <div className="flexContainer">
                                      <div className="flexItemOne">
                                        <Checkbox
                                          checked={checklistItem.isChecked}
                                          {...label}
                                          onChange={() => onCheckboxHandler(checklistItem, index)}
                                        />
                                      </div>
                                      <div className="flexItemTwo">
                                        <TextField
                                          name={`checklistItems.${index}.text`}
                                          value={checklistItem.text}
                                          fullWidth
                                          multiline
                                          placeholder="Add Item"
                                          variant="standard"
                                          onFocus={hideFooter}
                                          onBlur={showFooter}
                                          onChange={formik.handleChange}
                                        />
                                      </div>
                                      <div className="flexItemThree">
                                        <Icon
                                          className="material-icons-round closeIcon"
                                          onClick={() => onRemoveItemHandler(arrayHelper, index)}>
                                          close
                                        </Icon>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                            <div className="addItemWrap">
                              <Button className="addItemBtn" onClick={() => onAddItemHandler(arrayHelper)}>
                                <Icon className="addIcon">add</Icon>
                                <span className="label">Add new item</span>
                              </Button>
                            </div>
                          </>
                        )}
                      />
                    </FormikProvider>
                  </div>
                </div>
                <ChooseCategory
                  isEdit={isEdit}
                  category={checklist?.category}
                  onChooseCategory={(data) => updateCompState(data)}
                />
                <SetDateTime
                  isEdit={isEdit}
                  dateAndTime={checklist?.dateAndTime}
                  onSetDateTime={(data) => updateCompState(data)}
                />
                <GetAlert isEdit={isEdit} alert={checklist?.alert} onAlert={(data) => updateCompState(data)} />
                <ChooseColor
                  isEdit={isEdit}
                  cardColor={checklist?.cardColor}
                  onChooseColor={(data) => updateCompState(data)}
                />
                {isEdit && (
                  <MarkAsComplete
                    isEdit={isEdit}
                    isCompleted={checklist?.isCompleted}
                    onChangeStatus={(data) => updateCompState(data)}
                  />
                )}
                {isEdit && <CustomButton name="Delete" color="danger" onClick={onDeleteHandler} />}
                <CustomButton name="Done" color="blue" type="submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditChecklist;
