import {
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
  RegisterPayload,
  LoginPayload,
  ResetPasswordPayload,
} from "./authApi/types";
import {
  CategoriesWithTaskAndChecklistCount,
  CategoryResponse,
  CategoryPayload,
  UpdateCategoryPayload,
} from "./categoryApi/types";
import {
  ChecklistItem,
  ChecklistResponse,
  ChecklistAllPayload,
  ChangeChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
} from "./checklistApi/types";
import { TaskResponse, ChangeTaskStatusPayload, CreateTaskPayload, UpdateTaskPayload } from "./taskApi/types";
import { UserResponse, StatisticReportResponse, UpdateUserPayload } from "./userApi/types";

type NoContentResponse = void;

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface BasicResponse {
  status: string;
  message: string;
}

export type {
  ApiResponse,
  BasicResponse,
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
  UpdateUserPayload,
  RegisterPayload,
  LoginPayload,
  ResetPasswordPayload,
  CategoryPayload,
  UpdateCategoryPayload,
  ChecklistAllPayload,
  ChangeChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
  ChangeTaskStatusPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
};
