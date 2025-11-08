"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useBooks } from "@/lib/use-books";
import { DashboardHeader } from "@/components/dashboard-header";
import { BookForm } from "@/components/book-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;
  const { user, isLoading: authLoading } = useAuth();
  const { books, isLoading: booksLoading } = useBooks();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
      return;
    }

    const foundBook = books.find((b) => b.id === Number(bookId));
    if (!booksLoading && !foundBook) {
      router.push("/dashboard");
      return;
    }

    setBook(foundBook);
  }, [user, authLoading, bookId, books, booksLoading, router]);

  if (authLoading || booksLoading || !user || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          ダッシュボードに戻る
        </Link>

        <div className="flex justify-center">
          <BookForm bookId={Number(bookId)} initialBook={book} />
        </div>
      </main>
    </div>
  );
}
