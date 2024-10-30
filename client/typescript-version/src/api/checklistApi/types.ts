export interface ChecklistResponse {
  title: string;
  checklistItems: ChecklistItem[];
  category: { categoryName: string; cardColor: string; id: string };
  cardColor: string;
  dateAndTime: string;
  alert: boolean;
  isCompleted: boolean;
  type: string;
  createdBy: string;
  id: string;
}

export interface ChecklistItem {
  isChecked: boolean;
  text: string;
  id: string;
}

export interface ChecklistAllPayload {
  category: string;
  isCompleted?: boolean | null | undefined;
}

export interface UpdateChecklistStatusPayload {
  id: string;
  isCompleted: boolean;
}

export interface CreateChecklistPayload {
  title: string;
  checklistItems: {
    isChecked: boolean;
    text: string;
  }[];
  category: string;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
}

export interface UpdateChecklistPayload extends CreateChecklistPayload {
  id: string;
}
