import { useAuthStore } from "@/modules/auth/store/authStore";
import { useActivityStore } from "../store/activityStore";

import { useNotificationStore } from "@/modules/notification/store/notificationStore";
import { NotificationKind } from "@/modules/notification/types/notification";

interface RecordEventArgs {
  message: string;
  notify?: {
    title: string;
    message: string;
    kind: NotificationKind;
  };
}

export function recordEvent({ message, notify }: RecordEventArgs) {
  const user = useAuthStore.getState().user;

  useActivityStore.getState().add({
    actorId: user?.id ?? "system",
    actorName: user?.name ?? "System",
    message,
  });

  if (notify) {
    useNotificationStore.getState().push(notify);
  }
}
