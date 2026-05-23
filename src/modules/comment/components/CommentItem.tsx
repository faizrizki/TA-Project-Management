import {
  HiOutlineUserCircle,
  HiOutlinePaperClip,
  HiOutlineTrash,
} from "react-icons/hi2";

import { Comment } from "../types/comment";

interface CommentItemProps {
  comment: Comment;
  canDelete: boolean;
  onDelete: (id: string) => void;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

export default function CommentItem({
  comment,
  canDelete,
  onDelete,
}: CommentItemProps) {
  return (
    <div className="flex items-start gap-3">
      <HiOutlineUserCircle size={36} className="text-gray-600 shrink-0" />

      <div className="flex-1 bg-white rounded-2xl px-4 py-3 border border-gray-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900">
              {comment.authorName}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(comment.createdAt)}
            </span>
          </div>

          {canDelete && (
            <button
              type="button"
              aria-label="Hapus komentar"
              onClick={() => onDelete(comment.id)}
              className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              <HiOutlineTrash size={14} />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-800 whitespace-pre-wrap">
          {comment.content}
        </p>

        {comment.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {comment.attachments.map((att) => (
              <a
                key={att.id}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1
                  px-3 py-1.5
                  rounded-full
                  bg-gray-100 hover:bg-gray-200
                  text-xs text-gray-800
                  transition
                "
              >
                <HiOutlinePaperClip size={14} />
                <span className="font-medium">{att.name}</span>
                <span className="text-gray-500">({formatBytes(att.size)})</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
