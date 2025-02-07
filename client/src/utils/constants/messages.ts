export const MESSAGES = {
  VALIDATION: {
    EMAIL: {
      REQUIRED: "Email is required",
      INVALID: "Enter a valid email",
    },
    PASSWORD: {
      REQUIRED: "Password is required",
      MIN_LENGTH: 6,
      LENGTH_ERROR: "Password should be at least 6 characters long.",
      MUST_CONTAIN: {
        LETTER: "Password must contain at least one letter.",
        NUMBER: "Password must contain at least one number.",
      },
      NOT_MATCH: "Password and Confirm Password do not match",
    },
    CONFIRM_PASSWORD: {
      REQUIRED: "Confirm password is required.",
    },
    NAME: {
      REQUIRED: "Name is required",
      ONLY_ALPHABETS: "Only alphabets are allowed for this field",
    },
    RESET_CODE: {
      REQUIRED: "Reset code is required",
      FORMAT: "Please enter the 6-digit code",
    },
    TITLE: {
      REQUIRED: "Title is required",
      ONLY_LETTERS: "Title can only contain letters",
    },
    DESCRIPTION: {
      REQUIRED: "Description is required",
    },
  },
  USER_FEEDBACK: {
    RESET_LINK_SEND: "Please check your email and click on the provided link to reset your password.",
    ACCOUNT_CREATED: "Your account has been created successfully.",
    CONFIRMATION_DELETE: "Are you sure you want to delete?",
    VERIFICATION_LINK_SENT: "A verification link has been sent to your email account.",
    CHECKLIST: {
      CREATE_CONFIRMATION: "Create this checklist?",
      DELETED: "Checklist deleted successfully.",
      CREATED: "Checklist has been created.",
    },
    TASK: {
      CREATE_CONFIRMATION: "Create this task?",
      CREATED: "Task has been created.",
      DELETED: "Task deleted successfully.",
      STATUS_CHANGED: "Task status changed to",
    },
    CATEGORY: {
      DELETED: "Category deleted successfully.",
    },
    CHANGES_SAVED: "Your changes have been saved.",
    API_FAIL: "Sorry, something went wrong. Please try again.",
    INFO_ALERT:
      "If your email is verified, you will receive email notifications reminding you of the above selected Date & Time.",
  },
  STATUSES: {
    ALL: "all",
    PENDING: "pending",
    COMPLETED: "completed",
  },
  ERROR_MESSAGE: "An error occurred. Please try again later.",
};
