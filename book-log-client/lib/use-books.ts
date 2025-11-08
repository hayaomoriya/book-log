"use client";

import { useEffect, useState } from "react";
import { Result, ok, err } from "neverthrow";

import { type Book } from "./schema";
import {
  listBooks as listBooksApi,
  addBook as addBookApi,
  getBook as getBookApi,
  updateBook as updateBookApi,
  deleteBook as deleteBookApi,
} from "./api/book";
import { useAuth } from "./auth-context";

export function useBooks() {
  const { user, getToken } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenResult = getToken();
    if (tokenResult.isErr()) {
      setBooks([]);
      setIsLoading(false);
      return;
    }
    listBooksApi(tokenResult.value).then((result) => {
      if (result.isOk()) {
        setBooks(result.value);
      } else {
        setBooks([]);
      }
      setIsLoading(false);
    });
  }, [user]);

  const addBook = (book: Omit<Book, "id">) => {
    const tokenResult = getToken();
    if (tokenResult.isErr()) {
      console.error(tokenResult.error);
    } else {
      addBookApi(tokenResult.value, book);
    }
  };

  const updateBook = (id: Book["id"], updates: Partial<Omit<Book, "id">>) => {
    const tokenResult = getToken();
    if (tokenResult.isErr()) {
      console.error(tokenResult.error);
    } else {
      updateBookApi(tokenResult.value, id, updates);
    }
    books.map((book) => (book.id === id ? { ...book, ...updates } : book));
  };

  const deleteBook = (id: Book["id"]) => {
    const tokenResult = getToken();
    if (tokenResult.isErr()) {
      console.error(tokenResult.error);
    } else {
      deleteBookApi(tokenResult.value, id);
    }
  };

  return {
    books,
    isLoading,
    addBook,
    updateBook,
    deleteBook,
  };
}
