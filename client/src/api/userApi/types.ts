export interface UserResponse {
  name: string;
  email: string;
  isEmailVerified: boolean;
  _id: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  _id: string;
}

export interface StatisticItem {
  label: string;
  count: number;
}

export interface StatisticReportResponse {
  taskStatistic: StatisticItem[];
  checklistStatistic: StatisticItem[];
  taskCompletedPercentage: string;
  checklistCompletedPercentage: string;
}
