<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(3)->create();

        User::factory()->create([
            "name" => "Test User",
            "email" => "test@example.com",
            "password" => Hash::make("password"),
        ]);
    }
}
