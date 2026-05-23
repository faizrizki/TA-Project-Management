"use client";

import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        <HiOutlineArrowRightOnRectangle size={56} className="text-gray-900" />

        <h2 className="text-2xl font-bold text-gray-900 mt-4">
          Keluar dari Akun?
        </h2>

        <p className="text-gray-700 mt-3">
          Anda yakin ingin keluar dari akun Anda saat ini?
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            text="Tidak"
            variant="success"
            fullWidth={false}
            onClick={onClose}
          />

          <Button
            text="Ya"
            variant="primary"
            fullWidth={false}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
