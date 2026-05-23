import { ReactNode } from "react";

import AppShell from "@/shared/components/AppShell";

export default function AppGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
