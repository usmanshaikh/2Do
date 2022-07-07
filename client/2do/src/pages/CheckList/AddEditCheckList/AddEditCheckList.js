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
import "./AddEditCheckList.scss";

const label = { inputProps: { "aria-label": "Checkbox" } };

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddEditCheckList = () => {
  const [cardColor, setCardColor] = useState();
  const [alertTask, setAlertTask] = useState();
  const [category, setCategory] = useState();
  const [setDateTime, setSetDateTime] = useState();
  const { showModal } = useModal();

  const formik = useFormik({
    initialValues: {
      title: "",
      checkListItems: [
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
        message: "Create this check list?",
        onConfirm: (data) => submitFormHandler(data),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  const submitFormHandler = (data) => {
    console.log({ data });
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

  const onAddCheckListHandler = () => {};

  const onRemoveItemHandler = (arrayHelper, index) => {
    arrayHelper.remove(index);
  };

  const onAddItemHandler = (arrayHelper) => {
    const path = formik.values.checkListItems;
    let currentIdx = 1;
    if (path.length) currentIdx = path[path.length - 1].id + 1;
    const newField = {
      checked: false,
      data: "",
      id: currentIdx,
    };
    arrayHelper.push(newField);
  };

  const onCheckboxHandler = (checkListItem, index) => {
    formik.values.checkListItems.map((item) => {
      if (item.id === checkListItem.id) {
        if (item.checked) {
          item.checked = false;
          formik.setFieldValue(`checkListItems.${index}.checked`, false);
        } else {
          item.checked = true;
          formik.setFieldValue(`checkListItems.${index}.checked`, true);
        }
      }
    });
  };

  return (
    <>
      <div className="addCheckListPageWrapper">
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
                      name="checkListItems"
                      render={(arrayHelper) => (
                        <>
                          {formik.values.checkListItems && formik.values.checkListItems.length > 0
                            ? formik.values.checkListItems.map((checkListItem, index) => (
                                <div className="listItemWrap" key={checkListItem.id}>
                                  <div className="flexContainer">
                                    <div className="flexItemOne">
                                      <Checkbox
                                        checked={checkListItem.checked}
                                        {...label}
                                        onChange={() => onCheckboxHandler(checkListItem, index)}
                                      />
                                    </div>
                                    <div className="flexItemTwo">
                                      <TextField
                                        name={`checkListItems.${index}.data`}
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
              <CustomButton name="Done" type="submit" onClick={onAddCheckListHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditCheckList;
