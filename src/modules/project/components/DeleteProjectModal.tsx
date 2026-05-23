"use client";

import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectModal({
  open,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Hapus Proyek</h2>
      <p className="text-gray-700">
        Apakah anda yakin ingin menghapus Proyek ini?
      </p>

      <div className="flex items-center justify-end gap-3 mt-6">
        <Button
          text="Batal"
          variant="success"
          fullWidth={false}
          onClick={onClose}
        />

        <Button
          text="Hapus"
          variant="primary"
          fullWidth={false}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
}
