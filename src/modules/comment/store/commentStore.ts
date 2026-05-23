import { create } from "zustand";

import { Comment, CommentPayload } from "../types/comment";

interface CommentState {
  comments: Comment[];
  addComment: (data: CommentPayload) => void;
  deleteComment: (commentId: string) => void;
}

const initialComments: Comment[] = [
  {
    id: "c-1",
    projectId: "p-1",
    authorId: "u-2",
    authorName: "Budi Santoso",
    content: "Sudah cek mockup homepage, secara overall sudah oke.",
    attachments: [],
    createdAt: "2026-11-10T10:00:00Z",
  },
  {
    id: "c-2",
    projectId: "p-1",
    authorId: "u-3",
    authorName: "Citra Lestari",
    content: "Tolong review bagian analytics ya.",
    attachments: [],
    createdAt: "2026-11-11T14:00:00Z",
  },
];

export const useCommentStore = create<CommentState>((set) => ({
  comments: initialComments,

  addComment: (data) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          id: `c-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
    })),
}));
