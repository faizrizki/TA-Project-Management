export type NotificationKind = "INFO" | "PROJECT" | "TASK" | "COMMENT";

export interface Notification {
  id: string;
  title: string;
  message: string;
  kind: NotificationKind;
  read: boolean;
  createdAt: string;
}

export interface NotificationPayload {
  title: string;
  message: string;
  kind: NotificationKind;
}
