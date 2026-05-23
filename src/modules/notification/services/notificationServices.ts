import api from "@/lib/axios";
import { NotificationPayload } from "../types/notification";

export const fetchNotifications = async () => {
  return await api.get("/notifications");
};

export const createNotification = async (data: NotificationPayload) => {
  return await api.post("/notifications", data);
};

export const markNotificationRead = async (id: string) => {
  return await api.patch(`/notifications/${id}/read`);
};

export const markAllRead = async () => {
  return await api.patch(`/notifications/read-all`);
};
