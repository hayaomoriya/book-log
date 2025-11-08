"use client";

import Link from "next/link";
import type { Book } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";

interface BookCardProps {
  book: Book;
  onDelete: () => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary/30">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* 本の情報 */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
                  {book.title}
                </h3>
              </div>

              {book.completedDate && (
                <div className="text-xs text-muted-foreground">
                  読了日:{" "}
                  {new Date(book.completedDate).toLocaleDateString("ja-JP")}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                href={`/dashboard/edit/${book.id.toString()}`}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 bg-transparent"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">編集</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
