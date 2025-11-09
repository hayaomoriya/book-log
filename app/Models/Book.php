<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ["id", "title", "notes", "completed_date", "user_id"];

    protected $hidden = ["user_id"];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
