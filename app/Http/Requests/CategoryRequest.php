<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class CategoryRequest extends FormRequest
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
                'max:15',
                function ($attribute, $value, $fail) {
                    // Query to check if the name exists in the non-deleted records
                    $exists = DB::table('categories')
                        ->where('name', $value)
                        ->whereNull('deleted_at')
                        ->exists();

                    if ($exists) {
                        $fail('The name has already been taken.');
                    }
                },
            ],
            'status' => 'nullable|string|max:255',
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
                'max:15',
                function ($attribute, $value, $fail) {
                    // Get the current category ID from the route
                    $categoryId = $this->route('category');

                    // Query to check if the name exists in the non-deleted records
                    $exists = DB::table('categories')
                        ->where('name', $value)
                        ->whereNull('deleted_at')
                        ->where('id', '!=', $categoryId)
                        ->exists();

                    if ($exists) {
                        $fail('The name has already been taken.');
                    }
                },
            ],
            'status' => 'nullable|string|max:255',
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
        // Typically, no validation rules are required for deletion,
        // but you can implement custom checks if needed.
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
            'status.max' => 'The status may not be greater than :max characters.',
            'image.image' => 'The image must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg.',
            'image.max' => 'The image may not be greater than :max kilobytes.',
        ];
    }
}
