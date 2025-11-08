"use client";

import Link from "next/link";
import { useBooks } from "@/lib/use-books";
import { DashboardHeader } from "@/components/dashboard-header";
import { BookList } from "@/components/book-list";
import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { books } = useBooks();

  const totalBooks = books.length;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">あなたの読書記録</h1>
          <Link href="/dashboard/add">
            <Button>本を追加</Button>
          </Link>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <StatsCard
            title="全体"
            value={totalBooks}
            description="登録された本"
          />
        </div>

        {/* 本の一覧 */}
        <BookList />
      </main>
    </div>
  );
}
