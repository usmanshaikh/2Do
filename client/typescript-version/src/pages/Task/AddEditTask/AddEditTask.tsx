import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, TextField } from "@mui/material";
import { useModal } from "mui-modal-provider";
import {
  ConfirmationModal,
  SuccessModal,
  ColorPicker,
  CustomButton,
  ChooseCategory,
  DateTimeSelector,
  AlertToggle,
  MarkAsComplete,
} from "../../../components";
import { hideFooter, showFooter } from "../../../utils/helpers";
import { taskApi } from "../../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MSG, ROUTES } from "../../../utils/constants";
import { TaskResponse } from "../../../api/types";
import { useAppDispatch } from "../../../hooks";
import { showSnackbar } from "../../../store/slices";
import moment, { Moment } from "moment";
import "./AddEditTask.scss";

interface FormValues {
  title: string;
  category: string;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required(MSG.VALIDATION.DESCRIPTION.REQUIRED),
  category: yup.string().required(),
  cardColor: yup.string().required(),
  dateAndTime: yup.mixed<Moment | string | Date>().required(),
  alert: yup.boolean().required(),
  isCompleted: yup.boolean().required(),
});

const AddEditTask = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [task, setTask] = useState<TaskResponse | null>(null);
  const { showModal } = useModal();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      category: "",
      cardColor: "#f96060",
      dateAndTime: moment().toDate(),
      alert: true,
      isCompleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const initialState = {
        message: MSG.USER_FEEDBACK.TASK.CREATE_CONFIRMATION,
        onConfirm: () => handleFormSubmit(),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  useEffect(() => {
    const taskId = searchParams.get("taskId");
    const editMode = searchParams.get("edit") === "true";
    setIsEdit(editMode);
    if (editMode && taskId) {
      fetchTask(taskId);
    } else {
      formik.resetForm();
    }
  }, [searchParams]);

  const fetchTask = async (taskId: string) => {
    try {
      const { data } = await taskApi.getTask(taskId);
      setTask(data);
      formik.setValues({
        title: data.title,
        category: data.category.id,
        cardColor: data.cardColor,
        dateAndTime: moment(data.dateAndTime).toDate(),
        alert: data.alert,
        isCompleted: data.isCompleted,
      });
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleUpdateFormikField = (key: string, data: Date | boolean | string) => {
    formik.setFieldValue(key, data);
  };

  const handleFormSubmit = async () => {
    let payload = { ...formik.values };
    console.log({ payload });
    try {
      if (isEdit) {
        const id = searchParams.get("taskId") as string;
        await taskApi.updateTask({ ...formik.values, id });
        const initialState = {
          message: MSG.USER_FEEDBACK.CHANGES_SAVED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      } else {
        await taskApi.createTask({ ...formik.values });
        const initialState = {
          message: MSG.USER_FEEDBACK.TASK.CREATED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleDelete = () => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => handleConfirmDeleteTask(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const handleConfirmDeleteTask = async () => {
    const taskId = searchParams.get("taskId") as string;
    try {
      await taskApi.deleteTask(taskId);
      const initialState = {
        message: MSG.USER_FEEDBACK.TASK.DELETED,
        onClose: () => navigateTo(),
      };
      showModal(SuccessModal, initialState, { destroyOnClose: true });
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const navigateTo = () => {
    navigate(`/${ROUTES.TASK}`);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await formik.validateForm(); // Validates all fields
    if (Object.keys(errors).length > 0) {
      console.log("Invalid fields:", errors);
      formik.setTouched(Object.fromEntries(Object.keys(errors).map((key) => [key, true])));
      return;
    }
    console.log("Form is valid, submitting...");
  };

  return (
    <Box className="addTaskPageWrapper">
      <Box className="cardWrapper">
        <Box className="formWrapper">
          <form onSubmit={formik.handleSubmit}>
            {/* <form onSubmit={handleCustomSubmit}> */}
            <Box className="commonInputWrap">
              <span className="commonLabel">description</span>
              <TextField
                fullWidth
                multiline
                id="title"
                name="title"
                autoComplete="off"
                className="commonInputFormControl"
                placeholder="Enter Description"
                value={formik.values.title}
                onChange={formik.handleChange}
                onFocus={hideFooter}
                onBlur={showFooter}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
            <ChooseCategory
              isEdit={isEdit}
              category={task?.category}
              onSelectCategory={(data: string) => {
                handleUpdateFormikField("category", data);
              }}
            />
            <DateTimeSelector
              isEdit={isEdit}
              dateAndTime={task?.dateAndTime}
              onSetDateTime={(data: Date) => {
                handleUpdateFormikField("dateAndTime", data);
              }}
            />
            <AlertToggle
              isEdit={isEdit}
              alert={task?.alert}
              onAlertChange={(data: boolean) => {
                handleUpdateFormikField("alert", data);
              }}
            />
            <ColorPicker
              isEdit={isEdit}
              cardColor={task?.cardColor}
              onChooseColor={(data: string) => {
                handleUpdateFormikField("cardColor", data);
              }}
            />
            {isEdit && (
              <MarkAsComplete
                isEdit={isEdit}
                isCompleted={task?.isCompleted}
                onChangeStatus={(data: boolean) => {
                  handleUpdateFormikField("isCompleted", data);
                }}
              />
            )}
            {isEdit && <CustomButton name="Delete" color="danger" onClick={handleDelete} />}
            <CustomButton name="Done" color="blue" type="submit" />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEditTask;
