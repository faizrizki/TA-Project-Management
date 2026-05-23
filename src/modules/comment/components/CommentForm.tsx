"use client";

import { useRef, useState } from "react";

import {
  HiOutlineUserCircle,
  HiOutlinePaperClip,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
} from "react-icons/hi2";

import { Attachment } from "../types/comment";

interface CommentFormProps {
  onSubmit: (content: string, attachments: Attachment[]) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [pending, setPending] = useState<Attachment[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const next: Attachment[] = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    setPending((prev) => [...prev, ...next]);
  };

  const removePending = (id: string) => {
    setPending((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((a) => a.id !== id);
    });
  };

  const submit = () => {
    const trimmed = content.trim();
    if (!trimmed && pending.length === 0) return;

    onSubmit(trimmed, pending);

    setContent("");
    setPending([]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-start gap-3">
      <HiOutlineUserCircle size={36} className="text-gray-600 shrink-0" />

      <div className="flex-1">
        <div
          className="
            flex items-center
            bg-white border border-black
            rounded-full
            pl-5 pr-2 py-1
            gap-2
          "
        >
          <input
            type="text"
            placeholder="Tulis komentar Anda..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />

          <button
            type="button"
            aria-label="Lampirkan file"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            <HiOutlinePaperClip size={18} />
          </button>

          <button
            type="button"
            aria-label="Kirim komentar"
            onClick={submit}
            className="p-2 rounded-full bg-[#F25C66] hover:bg-[#e04550] text-white transition"
          >
            <HiOutlinePaperAirplane size={16} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {pending.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 pl-2">
            {pending.map((att) => (
              <span
                key={att.id}
                className="
                  inline-flex items-center gap-1
                  px-3 py-1
                  rounded-full
                  bg-gray-100 text-xs text-gray-800
                "
              >
                <HiOutlinePaperClip size={12} />
                {att.name}
                <button
                  type="button"
                  aria-label={`Hapus ${att.name}`}
                  onClick={() => removePending(att.id)}
                  className="ml-1 text-gray-500 hover:text-gray-900"
                >
                  <HiOutlineXMark size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
