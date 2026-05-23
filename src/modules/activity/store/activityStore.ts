import { create } from "zustand";

import { Activity, ActivityPayload } from "../types/activity";

interface ActivityState {
  activities: Activity[];
  add: (data: ActivityPayload) => void;
}

const initialActivities: Activity[] = [
  {
    id: "a-1",
    actorId: "u-1",
    actorName: "Andi Wijaya",
    message: "membuat proyek 'Website Redesign'",
    createdAt: "2026-11-01T08:00:00Z",
  },
  {
    id: "a-2",
    actorId: "u-1",
    actorName: "Andi Wijaya",
    message: "menambahkan task 'Setup Analytics'",
    createdAt: "2026-11-05T10:30:00Z",
  },
  {
    id: "a-3",
    actorId: "u-2",
    actorName: "Budi Santoso",
    message: "mengomentari proyek 'Website Redesign'",
    createdAt: "2026-11-10T15:00:00Z",
  },
];

export const useActivityStore = create<ActivityState>((set) => ({
  activities: initialActivities,

  add: (data) =>
    set((state) => ({
      activities: [
        {
          id: `a-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString(),
        },
        ...state.activities,
      ],
    })),
}));
