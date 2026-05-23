import { HiOutlineUserCircle } from "react-icons/hi2";

import { Notification } from "../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: string) => void;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(notification.id)}
      className="
        w-full flex items-center gap-3
        px-4 py-3
        rounded-full
        bg-white border border-black
        text-left
        hover:bg-gray-50
        transition
      "
    >
      <HiOutlineUserCircle size={36} className="text-gray-700 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 truncate">
          {notification.title}
        </p>
        <p className="text-xs text-gray-600 truncate">
          {notification.message}
        </p>
      </div>

      <div className="flex flex-col items-end shrink-0 gap-1">
        <span className="text-[10px] text-gray-500">
          {formatTime(notification.createdAt)}
        </span>
        {!notification.read && (
          <span className="w-3 h-3 rounded-full bg-[#F25C66]" />
        )}
      </div>
    </button>
  );
}
