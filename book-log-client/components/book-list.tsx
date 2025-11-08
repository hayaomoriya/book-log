"use client";

import Link from "next/link";
import { useBooks } from "@/lib/use-books";
import { Button } from "@/components/ui/button";
import { BookCard } from "./book-card";

export function BookList() {
  const { books, isLoading, deleteBook } = useBooks();

  if (isLoading) {
    return <div className="text-muted-foreground">読み込み中...</div>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">本の記録がありません</p>
        <Link href="/dashboard/add">
          <Button>最初の本を追加する</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={() => deleteBook(book.id)}
        />
      ))}
    </div>
  );
}
