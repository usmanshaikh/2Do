export interface TaskResponse {
  title: string;
  category: { categoryName: string; cardColor: string; id: string };
  cardColor: string;
  dateAndTime: string;
  alert: boolean;
  isCompleted: boolean;
  type: string;
  createdBy: string;
  id: string;
}

export interface TaskAllPayload {
  category: string;
  isCompleted: boolean;
  dateAndTime?: string;
}

export interface ChangeTaskStatusPayload {
  id: string;
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

export interface UpdateTaskPayload {
  title: string;
  category: string;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
  id?: string;
}
