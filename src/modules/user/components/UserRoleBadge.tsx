import { Role, ROLE_LABEL } from "@/modules/auth/types/auth";

interface UserRoleBadgeProps {
  role: Role;
}

const ROLE_CLASS: Record<Role, string> = {
  ADMIN: "bg-[#F25C66] text-white",
  PROJECT_MANAGER: "bg-[#4FB7DE] text-white",
  TEAM_MEMBER: "bg-[#7DD957] text-white",
  CLIENT: "bg-[#E8DC6D] text-gray-900",
};

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs font-semibold
        ${ROLE_CLASS[role]}
      `}
    >
      {ROLE_LABEL[role]}
    </span>
  );
}
