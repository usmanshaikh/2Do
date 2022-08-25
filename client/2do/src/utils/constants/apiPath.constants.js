// Auth
export const REGISTER = "auth/register";
export const LOGIN = "auth/login";
export const FORGOT_PASSWORD = "auth/forgot-password";
export const LOGOUT = "auth/logout";
export const REFRESH_TOKENS = "auth/refresh-tokens";
export const RESET_PASSWORD = "auth/reset-password";
export const VERIFY_EMAIL = "auth/verify-email";
export const SEND_VERIFICATION_EMAIL = "auth/send-verification-email";

// Task
export const ALL_TASKS = "tasks/all";
export const CHANGE_STATUS = "tasks/change-status";
export const CREATE = "tasks/create";
export const TASK = "tasks";

// Checklist
export const CHECKLIST = {
  CHECKLIST: "checklists",
  ALL: "checklists/all",
  CREATE: "checklists/create",
  CHANGE_STATUS: "checkLists/change-status",
};

// User
export const MY_PROFILE = "users/my-profile";
export const UPDATE_MY_PROFILE = "users/update-my-profile";
export const STATISTIC_REPORT = "users/statistic-report";

// Card Color
export const CARD_COLORS = "card-colors";

// Category
export const CATEGORIES = {
  ALL: "categories/all",
  CREATE: "categories/create",
  UPDATE_OR_DELETE: "categories",
  WITH_TASK_AND_CHECKLIST_COUNT: "categories/with-task-and-checklist-count",
};
