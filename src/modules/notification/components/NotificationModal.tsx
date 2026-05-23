"use client";

import { useEffect } from "react";

import { useNotificationStore } from "../store/notificationStore";
import NotificationItem from "./NotificationItem";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  open,
  onClose,
}: NotificationModalProps) {
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);

  // ============================================================
  // TODO: Aktifkan saat backend siap
  // ------------------------------------------------------------
  // GET    http://localhost:8000/api/notifications
  //   Response: { success: true, data: [{ id, title, message, kind,
  //     read, createdAt }] }
  //
  // PATCH  http://localhost:8000/api/notifications/{id}/read
  //   Response: { success: true, data: { id, read: true } }
  //
  // PATCH  http://localhost:8000/api/notifications/read-all
  //   Response: { success: true, message: "...", data: { updated: N } }
  // ------------------------------------------------------------
  // import { fetchNotifications, markNotificationRead }
  //   from "../services/notificationServices";
  // useEffect(() => {
  //   fetchNotifications().then((res) => setNotifications(res.data.data));
  // }, []);
  // const handleClick = async (id: string) => {
  //   await markNotificationRead(id);
  //   markRead(id); // update lokal
  // };
  // ============================================================

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#F25C66] py-4 text-center">
          <h2 className="text-white text-xl font-bold">Notifikasi</h2>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              Tidak ada notifikasi.
            </p>
          ) : (
            notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={markRead}
              />
            ))
          )}
        </div>

        <div className="h-4 bg-[#F25C66]" />
      </div>
    </div>
  );
}
