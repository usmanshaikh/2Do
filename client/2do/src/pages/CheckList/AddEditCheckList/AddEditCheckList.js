import React, { useState } from "react";
import * as yup from "yup";
import { useModal } from "mui-modal-provider";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { TextField, Checkbox, Icon, Button } from "@mui/material";
import ChooseColor from "../../../components/ChooseColor/ChooseColor";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ChooseCategory from "../../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../../components/SetDateTime/SetDateTime";
import * as Msg from "../../../utils/constants/message.constants";
import GetAlert from "../../../components/GetAlert/GetAlert";
import ConfirmationModal from "../../../components/Modals/ConfirmationModal/ConfirmationModal";
import { hideFooter, showFooter } from "../../../utils/Helpers/Helpers";
import "./AddEditChecklist.scss";

const label = { inputProps: { "aria-label": "Checkbox" } };

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddEditChecklist = () => {
  const [cardColor, setCardColor] = useState();
  const [alertTask, setAlertTask] = useState();
  const [category, setCategory] = useState();
  const [setDateTime, setSetDateTime] = useState();
  const { showModal } = useModal();

  const formik = useFormik({
    initialValues: {
      title: "",
      checklistItems: [
        {
          checked: false,
          data: "",
          id: 1,
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const initialState = {
        message: Msg.CREATE_CHECKLIST,
        onConfirm: (data) => submitFormHandler(data),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  const submitFormHandler = (data) => {
    const payload = {
      cardColor: {
        ...cardColor,
      },
      category: {
        ...category,
      },
      ...formik.values,
      alertTask,
      taskDateTime: setDateTime,
    };
    console.log({ payload });
  };

  const onAddChecklistHandler = () => {};

  const onDeleteHandler = (data) => {
    const initialState = {
      message: Msg.CONFIRMATION_DELETE,
      onConfirm: () => confirmDeleteTaskHandler(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const confirmDeleteTaskHandler = () => {
    console.log("confirmDeleteTaskHandler");
  };

  const onRemoveItemHandler = (arrayHelper, index) => {
    arrayHelper.remove(index);
  };

  const onAddItemHandler = (arrayHelper) => {
    const path = formik.values.checklistItems;
    let currentIdx = 1;
    if (path.length) currentIdx = path[path.length - 1].id + 1;
    const newField = {
      checked: false,
      data: "",
      id: currentIdx,
    };
    arrayHelper.push(newField);
  };

  const onCheckboxHandler = (checklistItem, index) => {
    formik.values.checklistItems.map((item) => {
      if (item.id === checklistItem.id) {
        if (item.checked) {
          item.checked = false;
          formik.setFieldValue(`checklistItems.${index}.checked`, false);
        } else {
          item.checked = true;
          formik.setFieldValue(`checklistItems.${index}.checked`, true);
        }
      }
    });
  };

  return (
    <>
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
                                        checked={checklistItem.checked}
                                        {...label}
                                        onChange={() => onCheckboxHandler(checklistItem, index)}
                                      />
                                    </div>
                                    <div className="flexItemTwo">
                                      <TextField
                                        name={`checklistItems.${index}.data`}
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
              <ChooseCategory onChooseCategory={(data) => setCategory(data)} />
              <SetDateTime onSetDateTime={(data) => setSetDateTime(data)} />
              <GetAlert onAlertTask={(data) => setAlertTask(data)} />
              <ChooseColor onChooseColor={(data) => setCardColor(data)} />
              <CustomButton name="Delete" color="danger" onClick={onDeleteHandler} />
              <CustomButton name="Done" color="blue" type="submit" onClick={onAddChecklistHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditChecklist;
