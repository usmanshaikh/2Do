import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { ConfirmationModal } from "../../../components/Modals";
import { hideFooter, showFooter } from "../../../utils/Helpers";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { TaskAPI } from "../../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import constants from "../../../utils/constants";
import ChooseColor from "../../../components/ChooseColor/ChooseColor";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ChooseCategory from "../../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../../components/SetDateTime/SetDateTime";
import GetAlert from "../../../components/GetAlert/GetAlert";
import "./AddEditTask.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  description: yup.string().required(MSG.DESCRIPTION_REQUIRED),
});

const AddEditTask = () => {
  const navigate = useNavigate();
  const [compState, setCompState] = useState({});
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState("false");
  const [task, setTask] = useState();
  const { showModal } = useModal();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const initialState = {
        message: MSG.CREATE_TASK,
        onConfirm: () => submitFormHandler(),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  useEffect(() => {
    checkIfEdit();
  }, []);

  const checkIfEdit = () => {
    const taskId = searchParams.get("taskId");
    const isEdit = searchParams.get("edit");
    let isEditBoolean;
    if (isEdit === "true") isEditBoolean = true;
    else isEditBoolean = false;
    setIsEdit(isEditBoolean);
    isEditBoolean && getTask(taskId);
  };

  const getTask = (taskId) => {
    TaskAPI.getTask(taskId)
      .then((res) => {
        setTask(res);
        const defaultCompValues = {
          title: res.title,
          category: res.category.id,
          cardColor: res.cardColor.id,
          dateAndTime: res.dateAndTime,
          alert: res.alert,
          isCompleted: res.isCompleted,
        };
        setCompState(defaultCompValues);
        formik.setFieldValue("description", res.title);
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
    const taskId = searchParams.get("taskId");
    compState.title = formik.values.description;
    TaskAPI.updateTask(compState, taskId)
      .then((res) => {
        const msg = "Your changes have been saved";
        snackbarAlert.showSnackbarAlert({ msg });
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onDeleteHandler = () => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => confirmDeleteTaskHandler(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const confirmDeleteTaskHandler = () => {
    const taskId = searchParams.get("taskId");
    TaskAPI.deleteTask(taskId)
      .then((res) => {
        const msg = "Task deleted successfully";
        snackbarAlert.showSnackbarAlert({ msg, duration: 2000 });
        setTimeout(() => {
          navigate(`/${ROUTE.TASK}`);
        }, 2000);
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  return (
    <>
      {task && (
        <div className="addTaskPageWrapper">
          <div className="cardWrapper">
            <div className="formWrapper">
              <form onSubmit={formik.handleSubmit}>
                <div className="commonInputWrap">
                  <span className="commonLabel">description</span>
                  <TextField
                    fullWidth
                    multiline
                    id="description"
                    name="description"
                    autoComplete="off"
                    className="commonInputFormControl"
                    placeholder="Enter Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onFocus={hideFooter}
                    onBlur={showFooter}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </div>
                <ChooseCategory
                  isEdit={isEdit}
                  category={task?.category}
                  onChooseCategory={(data) => updateCompState(data)}
                />
                <SetDateTime
                  isEdit={isEdit}
                  dateAndTime={task?.dateAndTime}
                  onSetDateTime={(data) => updateCompState(data)}
                />
                <GetAlert isEdit={isEdit} alert={task?.alert} onAlertTask={(data) => updateCompState(data)} />
                <ChooseColor
                  isEdit={isEdit}
                  cardColor={task?.cardColor}
                  onChooseColor={(data) => updateCompState(data)}
                />
                <CustomButton name="Delete" color="danger" onClick={onDeleteHandler} />
                <CustomButton name="Done" color="blue" type="submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditTask;
