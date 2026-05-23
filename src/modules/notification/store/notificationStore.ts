import { create } from "zustand";

import { Notification, NotificationPayload } from "../types/notification";

interface NotificationState {
  notifications: Notification[];
  push: (data: NotificationPayload) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const initialNotifications: Notification[] = [
  {
    id: "n-1",
    title: "Task baru ditugaskan",
    message: "Anda mendapat task 'Setup Analytics' di proyek Website Redesign",
    kind: "TASK",
    read: false,
    createdAt: "2026-11-10T09:00:00Z",
  },
  {
    id: "n-2",
    title: "Komentar baru",
    message: "Budi Santoso mengomentari proyek Website Redesign",
    kind: "COMMENT",
    read: false,
    createdAt: "2026-11-11T14:00:00Z",
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialNotifications,

  push: (data) =>
    set((state) => ({
      notifications: [
        {
          id: `n-${Date.now()}`,
          ...data,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
