"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut } from "lucide-react";

export function DashboardHeader() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold">読書記録</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user?.name}
          </span>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">ログアウト</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
