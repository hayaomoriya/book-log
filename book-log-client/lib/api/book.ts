import { Result, ok, err } from "neverthrow";
import { type Book, BookSchema } from "../schema";
import { z } from "zod";

const BookResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string(),
  completed_date: z.string(),
});

export async function listBooks(token: string) {
  try {
    const response = await fetch("/api/books", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const parsed = z.array(BookResponseSchema).safeParse(data);
    if (response.ok && parsed.success) {
      const normalized = parsed.data.map((d) => ({
        ...d,
        completedDate: d.completed_date,
      }));
      return ok(normalized);
    } else {
      return err("response format does not match");
    }
  } catch (error) {
    return err(error);
  }
}

export async function addBook(token: string, book: Omit<Book, "id">) {
  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...book, completed_date: book.completedDate }),
    });

    const data = await response.json();
    const result = BookSchema.safeParse(data);

    if (response.ok && result.success) {
      return ok(result.data);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function updateBook(
  token: string,
  bookId: Book["id"],
  book: Partial<Omit<Book, "id">>,
) {
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...book,
        completed_date: book.completedDate,
        id: bookId,
      }),
    });

    const data = await response.json();
    const result = BookSchema.safeParse(data);

    if (response.ok && result.success) {
      return ok(result.data);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function getBook(token: string, bookId: Book["id"]) {
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const result = BookSchema.safeParse(data);

    if (response.ok && result.success) {
      return ok(result.data);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}

export async function deleteBook(token: string, bookId: Book["id"]) {
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return ok(true);
    } else {
      return err(response.statusText);
    }
  } catch (error) {
    return err(error);
  }
}
