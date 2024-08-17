<?php
namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Services\CustomerService;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerController extends Controller{
    protected$customerService;
    protected$responseService;

    /**
     * Create a new controller instance.
     *
     * @param CustomerService $customerService
     * @param ResponseService $responseService
     */public function __construct(CustomerService $customerService, ResponseService $responseService)
    {
        $this->customerService = $customerService;
        $this->responseService = $responseService;
    }

    /**
     * Display a listing of the customers.
     *
     * @return JsonResponse
     */
    public function index() 
    {
        $query = Customer::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $customers = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

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
     */public function create()
    {
        return inertia("Customer/Create");
    }

    /**
     * Store a newly created customer in storage.
     *
     * @param CustomerRequest $request
     * @return JsonResponse
     */public function store(CustomerRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Handle any additional file uploads or processing here, if needed// Example: if ($request->hasFile('profile_image')) { ... }$customer = $this->customerService->createCustomer($data);

        return to_route('customer.index')
            ->with('success', 'Customer was created');
    }

    /**
     * Display the specified customer.
     *
     * @param Customer $customer
     * @return \Inertia\Response
     */public function show(Customer $customer)
    {
        return inertia('Customer/Show', [
            'customer' => new CustomerResource($customer),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified customer.
     *
     * @param Customer $customer
     * @return \Inertia\Response
     */public function edit(Customer $customer)
    {
        return inertia('Customer/Edit', [
            'customer' => new CustomerResource($customer),
        ]);
    }

    /**
     * Update the specified customer in storage.
     *
     * @param CustomerRequest $request
     * @param Customer $customer
     * @return JsonResponse
     */public function update(CustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        // Handle any additional file updates or processing here, if needed// Example: if ($request->hasFile('profile_image')) { ... }$this->customerService->updateCustomer($customer->id, $data);

        return to_route('customer.index')
            ->with('success', "Customer \"$customer->name\" was updated");
    }

    /**
     * Remove the specified customer from storage.
     *
     * @param Customer $customer
     * @return JsonResponse
     */
    public function destroy(Customer $customer)
    {
        $name = $customer->name;
        $this->customerService->deleteCustomer($customer->id);

        return to_route('customer.index')
            ->with('success', "Customer \"$name\" was deleted");
    }
}
