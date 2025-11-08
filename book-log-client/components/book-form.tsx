"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateYmd } from "@/lib/utils";
import type { Book } from "@/lib/schema";
import { useBooks } from "@/lib/use-books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookFormProps {
  bookId?: Book["id"];
  initialBook?: Book;
}

export function BookForm({ bookId, initialBook }: BookFormProps) {
  const router = useRouter();
  const { books, addBook, updateBook } = useBooks();
  const [title, setTitle] = useState(initialBook?.title || "");
  const [notes, setNotes] = useState(initialBook?.notes || "");
  const [completedDate, setCompletedDate] = useState(
    initialBook?.completedDate || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("タイトルは必須です");
      return;
    }
    if (!completedDate) {
      setError("読了日は必須です");
      return;
    }

    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      const bookData = {
        title,
        notes,
        completedDate,
      };

      if (bookId && initialBook) {
        updateBook(bookId, bookData);
      } else {
        addBook(bookData);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "何か問題が発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {bookId ? "本の記録を編集" : "新しい本を追加"}
        </CardTitle>
        <CardDescription>
          読んだ本または読みたい本の情報を入力してください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトル */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                タイトル *
              </label>
              <Input
                type="text"
                placeholder="本のタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">読了日</label>
            <Input
              type="date"
              value={completedDate ? formatDateYmd(completedDate) : ""}
              onChange={(e) => {
                const dateStr = e.target.value;
                if (dateStr) {
                  setCompletedDate(dateStr);
                }
              }}
              disabled={isLoading}
            />
          </div>

          {/* メモ */}
          <div>
            <label className="text-sm font-medium mb-1 block">メモ</label>
            <textarea
              placeholder="この本の感想や印象など"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32 resize-none"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          {/* ボタン */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "保存中..." : bookId ? "更新" : "追加"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isLoading}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
