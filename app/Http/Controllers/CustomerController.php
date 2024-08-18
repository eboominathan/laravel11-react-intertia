<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Services\CustomerService;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    protected $customerService;
    protected $responseService;

    /**
     * Create a new controller instance.
     *
     * @param CustomerService $customerService
     * @param ResponseService $responseService
     */
    public function __construct(CustomerService $customerService, ResponseService $responseService)
    {
        $this->customerService = $customerService;
        $this->responseService = $responseService;
    }

    /**
     * Display a listing of the customers.
     */
    public function index()
    {
        $customers = $this->customerService->getFilteredCustomers(
            request()->only('name', 'mobile_number', 'street', 'area', 'city'),
            request('sort_field', 'created_at'),
            request('sort_direction', 'desc')
        );

        return inertia("Customer/Index", [
            "customers" => CustomerResource::collection($customers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new customer.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return inertia("Customer/Create");
    }

    /**
     * Store a newly created customer in storage.
     *
     * @param CustomerRequest $request
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('customer/' . Str::random(), 'public');
        }

        $this->customerService->createCustomer($data);

        return to_route('customer.index')
            ->with('success', 'Customer was created');
    }

    /**
     * Display the specified customer.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $customer = $this->customerService->getCustomerById($id);

        return inertia('Customer/Show', [
            'customer' => new CustomerResource($customer),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified customer.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $customer = $this->customerService->getCustomerById($id);

        return inertia('Customer/Edit', [
            'customer' => new CustomerResource($customer),
        ]);
    }

    /**
     * Update the specified customer in storage.
     *
     * @param CustomerRequest $request
     * @param int $id
     */
    public function update(CustomerRequest $request, $id)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('customer/' . Str::random(), 'public');
        }

        $this->customerService->updateCustomer($id, $data);

        return to_route('customer.index')
            ->with('success', "Customer was updated");
    }

    /**
     * Remove the specified customer from storage.
     *
     * @param int $id
     */
    public function destroy($id)
    {
        $this->customerService->deleteCustomer($id);

        return to_route('customer.index')
            ->with('success', "Customer was deleted");
    }
}
