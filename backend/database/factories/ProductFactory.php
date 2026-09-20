<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'name' => fake()->randomElement(['Black Forest', 'Red Velvet', 'Tiramisu', 'Cheesecake', 'Choco Lava', 'Nastar', 'Kastengel', 'Cupcake Vanilla']) . ' ' . fake()->numberBetween(1, 100),
            'description' => fake()->sentence(10),
            'price' => fake()->numberBetween(15, 150) * 1000, // 15rb - 150rb
'image_url' => 'https://picsum.photos/seed/' . fake()->numberBetween(1, 500) . '/400/300',            'stock' => fake()->numberBetween(0, 50),
            'is_available' => fake()->boolean(85), // 85% kemungkinan true
        ];
    }
}