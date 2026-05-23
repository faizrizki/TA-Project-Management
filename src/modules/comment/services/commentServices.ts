import api from "@/lib/axios";
import { CommentPayload } from "../types/comment";

export const fetchComments = async (projectId: string) => {
  return await api.get(`/projects/${projectId}/comments`);
};

export const createComment = async (data: CommentPayload) => {
  return await api.post(`/projects/${data.projectId}/comments`, data);
};

export const deleteComment = async (commentId: string) => {
  return await api.delete(`/comments/${commentId}`);
};
