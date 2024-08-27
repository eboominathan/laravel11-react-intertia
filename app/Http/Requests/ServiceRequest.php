<?php

// app/Http/Requests/ServiceRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        switch ($this->method()) {
            case 'POST':
                return $this->storeRules();
            case 'PUT':
            case 'PATCH':
                return $this->updateRules();
            default:
                return [];
        }
    }

    protected function storeRules(): array
    {
        return [
            'date' => 'required|date',
            'name' => 'nullable|string',
        
            'acknowledgement_no' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'service_status' => 'nullable|string',
            'payment_status' => 'required|in:paid,unpaid',
            'follower_name' => 'required|string',
            'location' => 'nullable|string',
            'comments' => 'nullable|string',
            'customer_id' => 'nullable|exists:customers,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:sub_categories,id',
        ];
    }

    protected function updateRules(): array
    {
        return [
            'date' => 'sometimes|required|date',
            'name' => 'nullable|string',        
            'acknowledgement_no' => 'nullable|string',
            'status' => 'sometimes|required|in:active,inactive',
            'service_status' => 'nullable|string',
            'payment_status' => 'sometimes|required|in:paid,unpaid',
            'follower_name' => 'sometimes|required|string',
            'location' => 'nullable|string',
            'comments' => 'nullable|string',
            'customer_id' => 'nullable|exists:customers,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:sub_categories,id',
        ];
    }

    public function messages(): array
    {
        return [
            'date.required' => 'The date is required.',
            'name.required' => 'The name is required.',
            'category_id.required' => 'Category is required.',
            'subcategory_id.required' => 'SubCategory is required.',
        
        ];
    }
}
