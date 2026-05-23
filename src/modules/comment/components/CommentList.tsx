"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/modules/auth/store/authStore";

import { useCommentStore } from "../store/commentStore";
import { Attachment } from "../types/comment";

import { recordEvent } from "@/modules/activity/utils/recordEvent";

import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface CommentListProps {
  projectId: string;
}

export default function CommentList({ projectId }: CommentListProps) {
  const user = useAuthStore((s) => s.user);

  const allComments = useCommentStore((s) => s.comments);
  const addComment = useCommentStore((s) => s.addComment);
  const deleteComment = useCommentStore((s) => s.deleteComment);

  const comments = useMemo(
    () =>
      allComments
        .filter((c) => c.projectId === projectId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [allComments, projectId]
  );

  const handleSubmit = async (content: string, attachments: Attachment[]) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap
    // ------------------------------------------------------------
    // POST http://localhost:8000/api/projects/{projectId}/comments
    // Body (multipart/form-data jika ada lampiran):
    //   content: string
    //   attachments[]: File
    // Atau JSON: { content, attachments: [] }
    // Success (201):
    //   { success: true, data: { id, projectId, authorId, authorName,
    //     content, attachments: [{id, name, size, url}], createdAt } }
    // ------------------------------------------------------------
    // import { createComment } from "../services/commentServices";
    // const formData = new FormData();
    // formData.append("content", content);
    // attachments.forEach((a, i) => formData.append(`attachments[${i}]`, a.file));
    // try { await createComment(formData); }
    // catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    addComment({
      projectId,
      authorId: user?.id ?? "anon",
      authorName: user?.name ?? "Anonim",
      content,
      attachments,
    });

    recordEvent({
      message: "menambahkan komentar baru",
      notify: {
        title: "Komentar baru",
        message: content.slice(0, 80) || "Lampiran ditambahkan",
        kind: "COMMENT",
      },
    });
    // ===== END DUMMY =====
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Komentar</h2>

      <div className="bg-[#F6F6F6] rounded-[20px] p-6 md:p-7 space-y-4">
        <CommentForm onSubmit={handleSubmit} />

        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 pl-12">Belum ada komentar.</p>
        ) : (
          comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              canDelete={c.authorId === user?.id}
              onDelete={deleteComment}
            />
          ))
        )}
      </div>
    </section>
  );
}
