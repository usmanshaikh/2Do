export interface UserResponse {
  image?: {
    contentType: string;
    name: string;
    data: string;
  };
  name: string;
  email: string;
  isEmailVerified: boolean;
  id: string;
}

export interface StatisticReportResponse {
  taskStatistic: {
    label: string;
    count: number;
  }[];
  checklistStatistic: {
    label: string;
    count: number;
  }[];
}
