<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'image_url' => $this->image_url,
            'stock' => $this->stock,
            'is_available' => $this->is_available,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'variants' => $this->whenLoaded('variants', function () {
                return $this->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'variant_name' => $v->variant_name,
                    'extra_price' => $v->extra_price,
                ]);
            }),
        ];
    }
}