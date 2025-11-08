<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * 書籍の一覧を取得する
     * GET /api/books
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Book>
     */
    public function index()
    {
        $userId = Auth::id();

        $books = Book::where("user_id", $userId)->get();
        return $books;
    }

    /**
     * 新しい書籍をデータベースに保存する
     * POST /api/books
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        echo $userId;

        $validated = $request->validate([
            "title" => "required|string|max:255",
            "notes" => "required|string|max:255",
            "completed_date" => "required|date",
        ]);

        $validated["user_id"] = $userId;

        $book = Book::create($validated);

        return response()->json($book, Response::HTTP_CREATED);
    }

    /**
     * 特定の書籍の詳細を表示する
     * GET /api/books/{book}
     *
     * @param  \App\Models\Book  $book (Route Model Bindingにより自動的に取得される)
     * @return \App\Models\Book
     */
    public function show(Book $book)
    {
        return $book;
    }

    /**
     * 特定の書籍情報を更新する
     * PUT/PATCH /api/books/{book}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            "id" => "required|numeric",
            "title" => "sometimes|required|string|max:255",
            "notes" => "sometimes|required|string|max:255",
            "completed_date" => "sometimes|required|date",
        ]);

        $book->update($validated);

        return response()->json($book, Response::HTTP_OK); // 200
    }

    /**
     * 特定の書籍をデータベースから削除する
     * DELETE /api/books/{book}
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT); // 204
    }
}
