"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  HiOutlineSquares2X2,
  HiOutlineFolder,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { removeToken } from "@/modules/auth/utils/auth";
import { ROLE_LABEL } from "@/modules/auth/types/auth";
import LogoutModal from "@/modules/auth/components/LogoutModal";

import { useNotificationStore } from "@/modules/notification/store/notificationStore";
import NotificationModal from "@/modules/notification/components/NotificationModal";

interface NavTabProps {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}

function NavTab({ href, active, icon, label }: NavTabProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center gap-2
        p-2 px-6
        rounded-full
        text-sm font-semibold
        transition
        ${
          active
            ? "bg-[#2b2b2b] text-white"
            : "bg-white text-[#2b2b2b] hover:bg-gray-100"
        }
      `}
    >
      {icon}
      {label}
    </Link>
  );
}

interface IconButtonProps {
  onClick?: () => void;
  ariaLabel: string;
  badge?: number;
  children: React.ReactNode;
}

function IconButton({ onClick, ariaLabel, badge, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="
        relative
        w-10 h-10
        rounded-full
        bg-white
        text-[#2b2b2b]
        flex items-center justify-center
        hover:bg-gray-100
        transition
      "
    >
      {children}

      {typeof badge === "number" && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#F25C66] text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    removeToken();
    router.replace("/auth/login");
  };

  const brandLabel = user ? ROLE_LABEL[user.role] : "Project Manager";

  return (
    <>
      <header className="bg-[#F25C66] px-[50px] py-4 flex items-center justify-between">
        <h1 className="text-white text-lg font-bold">{brandLabel}</h1>

        <nav className="flex items-center gap-2">
          <NavTab
            href="/dashboard"
            active={pathname.startsWith("/dashboard")}
            icon={<HiOutlineSquares2X2 size={18} />}
            label="Dashboard"
          />

          <NavTab
            href="/proyek"
            active={pathname.startsWith("/proyek")}
            icon={<HiOutlineFolder size={18} />}
            label="Proyek"
          />

          {user?.role === "ADMIN" && (
            <NavTab
              href="/pengguna"
              active={pathname.startsWith("/pengguna")}
              icon={<HiOutlineUsers size={18} />}
              label="Pengguna"
            />
          )}

          <IconButton
            ariaLabel="Notifikasi"
            badge={unreadCount}
            onClick={() => setNotifOpen(true)}
          >
            <HiOutlineBell size={18} />
          </IconButton>

          <IconButton
            ariaLabel="Logout"
            onClick={() => setLogoutOpen(true)}
          >
            <HiOutlineArrowRightOnRectangle size={18} />
          </IconButton>
        </nav>
      </header>

      <NotificationModal
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
