<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */ public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */ public function rules(): array
    {
        switch ($this->method()) {
            case 'POST':  // Createreturn
                return $this->storeRules();

            case 'PUT':   // Updatecase'PATCH':
                return $this->updateRules();

            case 'DELETE': // Deletereturn$this->deleteRules();

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
            'name' => 'required|string|max:255',
            'mobile_number' => 'required|string|max:15|unique:customers,mobile_number',
            'email' => 'required|email|max:255',
            'street' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    /**
     * Validation rules for the update operation.
     *
     * @return array
     */ protected function updateRules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'mobile_number' => [
                'sometimes',
                'required',
                'string',
                'max:15',
                Rule::unique('customers')->ignore($this->route('customer')),
            ],
            'email' => 'sometimes|required|email|max:255',
            'street' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
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
        // Typically, no validation rules are required for deletion,// but you can implement custom checks if needed.return [];
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
            'mobile_number.required' => 'The mobile number is required.',
            'mobile_number.unique' => 'The mobile number has already been taken.',
            'email.required' => 'The email is required.',
            // You can add custom messages for each field if necessary.
        ];
    }
}
