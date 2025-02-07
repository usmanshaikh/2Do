export const API_PATHS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    FORGOT_PASSWORD: "auth/forgot-password",
    LOGOUT: "auth/logout",
    REFRESH_TOKENS: "auth/refresh-tokens",
    RESET_PASSWORD: "auth/reset-password",
    VERIFY_EMAIL: "auth/verify-email",
    SEND_VERIFICATION_EMAIL: "auth/send-verification-email",
  },
  TASK: {
    TASK: "tasks",
    ALL: "tasks/all",
    CREATE: "tasks/create",
    CHANGE_STATUS: "tasks/change-status",
  },
  CHECKLIST: {
    CHECKLIST: "checklists",
    ALL: "checklists/all",
    CREATE: "checklists/create",
    CHANGE_STATUS: "checklists/change-status",
  },
  USER: {
    USER: "users",
    STATISTIC_REPORT: "users/statistic-report",
  },
  CATEGORY: {
    CATEGORIES: "categories",
    ALL: "categories/all",
    CREATE: "categories/create",
    WITH_TASK_AND_CHECKLIST_COUNT: "categories/with-task-and-checklist-count",
  },
};
