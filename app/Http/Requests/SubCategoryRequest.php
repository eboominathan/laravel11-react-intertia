<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Adjust this if you have authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        switch ($this->method()) {
            case 'POST':  // Create
                return $this->storeRules();

            case 'PUT':   // Update
            case 'PATCH':
                return $this->updateRules();

            case 'DELETE': // Delete
                return $this->deleteRules();

            default:
                return [];
        }
    }

    /**
     * Validation rules for the store (create) operation.
     *
     * @return array
     */
    protected function storeRules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sub_categories', 'name'),
            ],
            'status' => 'nullable|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    /**
     * Validation rules for the update operation.
     *
     * @return array
     */
    protected function updateRules(): array
    {
        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('sub_categories', 'name')->ignore($this->route('subcategory')),
            ],
            'status' => 'nullable|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    /**
     * Validation rules for the delete operation.
     *
     * @return array
     */
    protected function deleteRules(): array
    {
        return [];
    }

    /**
     * Get custom validation error messages.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name is required.',
            'name.unique' => 'The name has already been taken.',
            'category_id.required' => 'The category is required.',
            'category_id.exists' => 'The selected category does not exist.',
            'status.in' => 'The status must be either active or inactive.',
            'image.image' => 'The image must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg.',
            'image.max' => 'The image may not be greater than :max kilobytes.',
        ];
    }
}
