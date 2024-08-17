<?php
namespace App\Services;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerService{
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
     */public function getCustomerById(int $id): Customer
    {
        return Customer::findOrFail($id);
    }

    /**
     * Create a new customer.
     *
     * @param array $data
     * @return Customer
     */public function createCustomer(array $data): Customer
    {
        return Customer::create($data);
    }

    /**
     * Update an existing customer.
     *
     * @param int $id
     * @param array $data
     * @return Customer
     */public function updateCustomer(int $id, array $data): Customer
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
     */public function deleteCustomer(int $id)
    {
        $customer = $this->getCustomerById($id);
        $customer->delete();
    }
}
