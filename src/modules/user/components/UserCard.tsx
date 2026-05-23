import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { AppUser } from "../types/user";
import UserRoleBadge from "./UserRoleBadge";

interface UserCardProps {
  user: AppUser;
  canDelete: boolean;
  onEdit: (user: AppUser) => void;
  onDelete: (user: AppUser) => void;
}

export default function UserCard({
  user,
  canDelete,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <HiOutlineUserCircle size={40} className="text-gray-600 shrink-0" />
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            aria-label="Edit user"
            onClick={() => onEdit(user)}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-700 transition"
          >
            <HiOutlinePencil size={18} />
          </button>

          {canDelete && (
            <button
              type="button"
              aria-label="Hapus user"
              onClick={() => onDelete(user)}
              className="p-2 rounded-full hover:bg-gray-200 text-gray-700 transition"
            >
              <HiOutlineTrash size={18} />
            </button>
          )}
        </div>
      </div>

      <UserRoleBadge role={user.role} />
    </div>
  );
}
