import {
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
  RegisterPayload,
  LoginPayload,
  ResetPasswordPayload,
} from "./authApi/types";
import { CategoriesWithTaskAndChecklistCount, CategoryResponse, CategoryPayload } from "./categoryApi/types";
import {
  ChecklistItem,
  ChecklistResponse,
  ChecklistAllPayload,
  UpdateChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
} from "./checklistApi/types";
import { TaskResponse, ChangeTaskStatusPayload, CreateTaskPayload, UpdateTaskPayload } from "./taskApi/types";
import { UserResponse, StatisticReportResponse } from "./userApi/types";

type NoContentResponse = void;

export type {
  NoContentResponse,
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
  CategoryResponse,
  CategoriesWithTaskAndChecklistCount,
  ChecklistItem,
  ChecklistResponse,
  TaskResponse,
  UserResponse,
  StatisticReportResponse,
  RegisterPayload,
  LoginPayload,
  ResetPasswordPayload,
  CategoryPayload,
  ChecklistAllPayload,
  UpdateChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
  ChangeTaskStatusPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
};
