<?php

// app/Http/Resources/ServiceResource.php
namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => (new Carbon($this->date))->format('d-m-Y'),
            'name' => $this->name,
            'service_type' => $this->service_type,
            'acknowledgement_no' => $this->acknowledgement_no,
            'status' => $this->status,
            'service_status' => $this->service_status,
            'payment_status' => $this->payment_status,
            'follower_name' => $this->follower_name,
            'location' => $this->location,
            'comments' => $this->comments,
            'customer' => new CustomerResource($this->customer),
            'category_id' => $this->category_id,
            'subcategory_id' => $this->subcategory_id,
            'category' => new CategoryResource($this->category),
            'subcategory' => new SubcategoryResource($this->subcategory),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'deletedBy' => new UserResource($this->deletedBy),
        ];
    }
}
