<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => Str::upper($this->name),            
            'mobile_number' => $this->mobile_number,            
            'email' => $this->email,            
            'city' => $this->city,            
            'state' => $this->state,            
            'street' => $this->street,            
            'area' => $this->area,            
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y'),            
            'status' => $this->status,
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : $this->image_path,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
