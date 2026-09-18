<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request)
    {
        $order = DB::transaction(function () use ($request) {
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'phone' => $request->phone,
                'pickup_method' => $request->pickup_method,
                'address' => $request->address,
                'notes' => $request->notes,
                'status' => 'pending',
                'total_price' => 0,
            ]);

            $total = 0;

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                $extraPrice = 0;

                if (! empty($item['variant_id'])) {
                    $variant = ProductVariant::findOrFail($item['variant_id']);
                    $extraPrice = $variant->extra_price;
                }

                $priceAtOrder = $product->price + $extraPrice;
                $subtotal = $priceAtOrder * $item['quantity'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'variant_id' => $item['variant_id'] ?? null,
                    'quantity' => $item['quantity'],
                    'price_at_order' => $priceAtOrder,
                    'custom_note' => $item['custom_note'] ?? null,
                ]);
            }

            $order->update(['total_price' => $total]);

            return $order;
        });

        return response()->json([
            'message' => 'Pesanan berhasil dibuat',
            'order' => $order->load('items.product'),
        ], 201);
    }
}