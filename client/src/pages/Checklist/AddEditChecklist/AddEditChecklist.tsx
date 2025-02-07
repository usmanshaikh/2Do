import { useEffect, useState } from "react";
import * as yup from "yup";
import { useModal } from "mui-modal-provider";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { TextField, Checkbox, Icon, Button, Box, Typography } from "@mui/material";
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
import { getAxiosErrorMessage, hideFooter, showFooter } from "../../../utils/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checklistApi } from "../../../api";
import { MSG, ROUTES } from "../../../utils/constants";
import moment, { Moment } from "moment";
import { ChecklistItem, ChecklistResponse } from "../../../api/types";
import { useAppDispatch } from "../../../hooks";
import { showSnackbar } from "../../../store/slices";
import "./AddEditChecklist.scss";

interface FormValues {
  title: string;
  checklistItems: ChecklistItem[];
  category: string;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required(MSG.VALIDATION.TITLE.REQUIRED),
  checklistItems: yup.array().of(
    yup.object().shape({
      isChecked: yup.boolean(),
      text: yup.string(),
      id: yup.string(),
    })
  ),
  category: yup.string().required(),
  cardColor: yup.string().required(),
  dateAndTime: yup.mixed<Moment | string | Date>().required(),
  alert: yup.boolean().required(),
  isCompleted: yup.boolean().required(),
});

const AddEditChecklist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showChecklistItemReqMsg, setShowChecklistItemReqMsg] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<ChecklistResponse | null>(null);
  const { showModal } = useModal();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      checklistItems: [],
      category: "",
      cardColor: "#f96060",
      dateAndTime: moment().toDate(),
      alert: true,
      isCompleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const initialState = {
        message: MSG.USER_FEEDBACK.CHECKLIST.CREATED,
        onConfirm: () => handleFormSubmit(),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  useEffect(() => {
    const checklistId = searchParams.get("checklistId");
    const editMode = searchParams.get("edit") === "true";
    setIsEdit(editMode);
    if (editMode && checklistId) {
      fetchChecklist(checklistId);
    } else {
      formik.resetForm();
    }
  }, [searchParams]);

  const fetchChecklist = async (checklistId: string) => {
    try {
      const { data } = await checklistApi.getChecklist(checklistId);
      const checklist = data.data;
      setChecklist(checklist);
      formik.setValues({
        title: checklist.title,
        category: checklist.category._id,
        cardColor: checklist.cardColor,
        dateAndTime: moment(checklist.dateAndTime).toDate(),
        alert: checklist.alert,
        isCompleted: checklist.isCompleted,
        checklistItems: checklist.checklistItems,
      });
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleFormSubmit = async () => {
    // Check for at least one non-empty text in checklistItems
    const hasText = formik.values.checklistItems.some((item) => item.text.trim() !== "");

    // If no items have text, show the message and prevent submission
    if (!hasText) {
      setShowChecklistItemReqMsg(true);
      return;
    } else {
      setShowChecklistItemReqMsg(false);
    }

    // Filter out items with empty text values
    const filteredChecklistItems = formik.values.checklistItems
      .filter((item) => item.text.trim() !== "")
      .map(({ _id, ...rest }) => rest); // Remove `_id` property here

    const payload = { ...formik.values, checklistItems: filteredChecklistItems };

    try {
      if (isEdit) {
        const _id = searchParams.get("checklistId") as string;
        await checklistApi.updateChecklist({ ...payload, _id });
        const initialState = {
          message: MSG.USER_FEEDBACK.CHANGES_SAVED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      } else {
        await checklistApi.createChecklist(payload);
        const initialState = {
          message: MSG.USER_FEEDBACK.CHECKLIST.CREATED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      }
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleDelete = () => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => handleConfirmDeleteChecklist(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const handleConfirmDeleteChecklist = async () => {
    try {
      const checklistId = searchParams.get("checklistId") as string;
      await checklistApi.deleteChecklist(checklistId);
      const initialState = {
        message: MSG.USER_FEEDBACK.CHECKLIST.DELETED,
        onClose: () => navigateTo(),
      };
      showModal(SuccessModal, initialState, { destroyOnClose: true });
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleUpdateFormikField = (key: string, data: any) => {
    formik.setFieldValue(key, data);
  };

  const handleCheckboxToggle = (index: number) => {
    const currentItem = formik.values.checklistItems[index];
    formik.setFieldValue(`checklistItems.${index}.isChecked`, !currentItem.isChecked);
  };

  const handleRemoveItem = (index: number) => {
    formik.setFieldValue(
      "checklistItems",
      formik.values.checklistItems.filter((_, i) => i !== index)
    );
  };

  const handleAddItem = () => {
    const newItem = { isChecked: false, text: "", id: Math.random().toString() };
    formik.setFieldValue("checklistItems", [...formik.values.checklistItems, newItem]);
  };

  const handleChecklistItemChange = (index: number, value: string) => {
    formik.setFieldValue(`checklistItems.${index}.text`, value);
    const hasChecklistItemWithText = formik.values.checklistItems.some((item) => item.text.trim() !== "");
    if (hasChecklistItemWithText) setShowChecklistItemReqMsg(false);
  };

  const navigateTo = () => {
    navigate(`/${ROUTES.CHECKLIST}`);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = await formik.validateForm();
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      console.log("Invalid fields:", errors);
      formik.setTouched(Object.fromEntries(Object.keys(errors).map((key) => [key, true])));
    }

    const hasChecklistItemWithText = formik.values.checklistItems.some((item) => item.text.trim() !== "");
    if (!hasChecklistItemWithText) setShowChecklistItemReqMsg(true);
    else setShowChecklistItemReqMsg(false);

    if (hasErrors || !hasChecklistItemWithText) return;

    formik.handleSubmit();
  };

  return (
    <Box className="addOrEditChecklistPageWrapper">
      <Box className="cardWrapper">
        <Box className="formWrapper">
          <form onSubmit={handleCustomSubmit}>
            <Box className="commonInputWrap">
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
              <Box className="checkboxListWrap">
                <FormikProvider value={formik}>
                  <FieldArray name="checklistItems">
                    {() => (
                      <>
                        {formik.values.checklistItems.map((checklistItem, index) => (
                          <Box className="listItemWrap" key={checklistItem._id}>
                            <Box className="flexContainer">
                              <Checkbox
                                checked={checklistItem.isChecked}
                                inputProps={{ "aria-label": "Checkbox" }}
                                onChange={() => handleCheckboxToggle(index)}
                              />
                              <TextField
                                name={`checklistItems.${index}.text`}
                                value={checklistItem.text}
                                fullWidth
                                multiline
                                placeholder="Add Item"
                                variant="standard"
                                onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                              />
                              <Icon className="material-icons-round closeIcon" onClick={() => handleRemoveItem(index)}>
                                close
                              </Icon>
                            </Box>
                          </Box>
                        ))}
                        {showChecklistItemReqMsg && (
                          <p className="checklistItemReqMsg">At least one checklist item is required</p>
                        )}
                        <Box className="addItemWrap">
                          <Button className="addItemBtn" onClick={handleAddItem}>
                            <Icon className="addIcon">add</Icon>
                            <span className="label">Add new item</span>
                          </Button>
                        </Box>
                      </>
                    )}
                  </FieldArray>
                </FormikProvider>
              </Box>
            </Box>
            <ChooseCategory
              isEdit={isEdit}
              category={checklist?.category}
              onSelectCategory={(data: string) => {
                handleUpdateFormikField("category", data);
              }}
            />
            <DateTimeSelector
              isEdit={isEdit}
              dateAndTime={checklist?.dateAndTime}
              onSetDateTime={(data: Date) => {
                handleUpdateFormikField("dateAndTime", data);
              }}
            />
            <AlertToggle
              isEdit={isEdit}
              alert={checklist?.alert}
              onAlertChange={(data: boolean) => {
                handleUpdateFormikField("alert", data);
              }}
            />
            <ColorPicker
              isEdit={isEdit}
              cardColor={checklist?.cardColor}
              onChooseColor={(data: string) => {
                handleUpdateFormikField("cardColor", data);
              }}
            />
            {isEdit && (
              <MarkAsComplete
                isEdit={isEdit}
                isCompleted={checklist?.isCompleted}
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

export default AddEditChecklist;
