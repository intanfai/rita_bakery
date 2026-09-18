<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'phone' => fake()->numerify('08##########'),
            'pickup_method' => fake()->randomElement(['cod', 'ambil_di_toko', 'kirim']),
            'address' => fake()->address(),
            'notes' => fake()->optional(0.3)->sentence(), // 30% ada catatan, sisanya null
            'status' => fake()->randomElement(['pending', 'diproses', 'selesai']),
            'total_price' => 0, // dihitung belakangan pas kita isi order_items-nya
        ];
    }
}