import api from "@/lib/axios";
import { ActivityPayload } from "../types/activity";

export const fetchActivities = async () => {
  return await api.get("/activities");
};

export const createActivity = async (data: ActivityPayload) => {
  return await api.post("/activities", data);
};
