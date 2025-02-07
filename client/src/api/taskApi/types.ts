export interface TaskResponse {
  _id: string;
  title: string;
  category: { categoryName: string; cardColor: string; _id: string };
  cardColor: string;
  dateAndTime: string;
  alert: boolean;
  isCompleted: boolean;
  type: string;
  createdBy: string;
}

export interface TaskAllPayload {
  category: string;
  isCompleted?: boolean | null | undefined;
}

export interface ChangeTaskStatusPayload {
  _id: string;
  isCompleted: boolean;
}

export interface CreateTaskPayload {
  title: string;
  category: string;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  _id: string;
}
