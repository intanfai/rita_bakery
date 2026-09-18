<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bikin kategori dulu (karena produk butuh category_id yang valid)
        $categories = collect(['Kue Ulang Tahun', 'Kue Kering', 'Cupcake', 'Kue Tart'])
            ->map(fn ($name) => Category::create(['name' => $name]));

        // 2. Bikin 20 produk, otomatis nyebar ke kategori yang tadi dibuat
        $products = Product::factory()->count(20)->create();

        // 3. Bikin 10 order beserta item-itemnya
        Order::factory()->count(10)->create()->each(function ($order) use ($products) {
            $itemCount = rand(1, 3); // tiap order isi 1-3 jenis produk
            $total = 0;

            for ($i = 0; $i < $itemCount; $i++) {
                $product = $products->random();
                $quantity = rand(1, 3);
                $subtotal = $product->price * $quantity;
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price_at_order' => $product->price, // snapshot harga saat itu
                ]);
            }

            $order->update(['total_price' => $total]);
        });
    }
}