<?php

namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    /**
     * Get all customers.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCustomers()
    {
        return Customer::all();
    }

    /**
     * Get a customer by ID.
     *
     * @param int $id
     * @return Customer
     */
    public function getCustomerById(int $id): Customer
    {
        return Customer::findOrFail($id);
    }

    /**
     * Create a new customer.
     *
     * @param array $data
     * @return Customer
     */
    public function createCustomer(array $data): Customer
    {
        return Customer::create($data);
    }

    /**
     * Update an existing customer.
     *
     * @param int $id
     * @param array $data
     * @return Customer
     */
    public function updateCustomer(int $id, array $data): Customer
    {
        $customer = $this->getCustomerById($id);
        $customer->update($data);
        return $customer;
    }

    /**
     * Delete a customer.
     *
     * @param int $id
     * @return void
     */
    public function deleteCustomer(int $id)
    {
        $customer = $this->getCustomerById($id);
        $customer->delete();
    }

    /**
     * Get filtered and sorted customers based on criteria.
     *
     * @param array $filters
     * @param string $sortField
     * @param string $sortDirection
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getFilteredCustomers(array $filters, string $sortField = 'created_at', string $sortDirection = 'desc')
    {
        $query = Customer::query();

        if (!empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }

        if (!empty($filters['mobile_number'])) {
            $query->where('mobile_number', 'like', '%' . $filters['mobile_number'] . '%');
        }

        if (!empty($filters['street'])) {
            $query->where('street', 'like', '%' . $filters['street'] . '%');
        }

        if (!empty($filters['area'])) {
            $query->where('area', 'like', '%' . $filters['area'] . '%');
        }

        if (!empty($filters['city'])) {
            $query->where('city', 'like', '%' . $filters['city'] . '%');
        }

        return $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
    }
}
