"use client";

import { useActivityStore } from "../store/activityStore";
import ActivityItem from "./ActivityItem";

interface ActivityLogProps {
  limit?: number;
}

export default function ActivityLog({ limit }: ActivityLogProps) {
  const activities = useActivityStore((s) => s.activities);

  const items = typeof limit === "number" ? activities.slice(0, limit) : activities;

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-6 text-center">
        Belum ada aktivitas.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((a) => (
        <ActivityItem key={a.id} activity={a} />
      ))}
    </ul>
  );
}
