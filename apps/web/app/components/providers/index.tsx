"use client";

import Header from "@/components/header";
import { GlobalModal } from "@/components/modal";
import { queryClient } from "@/config/queryClient";
import { useApplyFont } from "@/hooks/useApplyFont";
import { Toaster } from "@repo/ui/components/shadcn/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useApplyFont();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="bottom-right" richColors closeButton />
          <GlobalModal />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
