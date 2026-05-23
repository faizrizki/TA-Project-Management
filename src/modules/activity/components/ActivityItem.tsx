import { HiOutlineUserCircle } from "react-icons/hi2";

import { Activity } from "../types/activity";

interface ActivityItemProps {
  activity: Activity;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li className="flex items-start gap-3">
      <HiOutlineUserCircle size={28} className="text-gray-600 shrink-0 mt-0.5" />

      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{activity.actorName}</span>{" "}
          {activity.message}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {formatTime(activity.createdAt)}
        </p>
      </div>
    </li>
  );
}
