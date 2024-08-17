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

class CustomerController extends Controller
{
    protected $customerService;
    protected $responseService;

    /**
     * Create a new controller instance.
     *
     * @param CustomerService $customerService
     * @param ResponseService $responseService
     */ public function __construct(CustomerService $customerService, ResponseService $responseService)
    {
        $this->customerService = $customerService;
        $this->responseService = $responseService;
    }

    /**
     * Display a listing of the customers. 
     */
    public function index()
    {
        $query = Customer::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("mobile_number")) {
            $query->where("mobile_number", "like", "%" . request("mobile_number") . "%");
        }
        if (request("street")) {
            $query->where("street", "like", "%" . request("street") . "%");
        }
        if (request("area")) {
            $query->where("area", "like", "%" . request("area") . "%");
        }
     
        if (request("city")) {
            $query->where("city", "like", "%" . request("city") . "%");
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
     */ public function create()
    {
        return inertia("Customer/Create");
    }

    /**
     * Store a newly created customer in storage.
     *
     * @param CustomerRequest $request 
     */ public function store(CustomerRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('customer/' . Str::random(), 'public');
        }
        Customer::create($data);
        return to_route('customer.index')
            ->with('success', 'Customer was created');
    }

    /**
     * Display the specified customer.
     *
     * @param Customer $customer
     * @return \Inertia\Response
     */ public function show(Customer $customer)
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
     */ public function edit(Customer $customer)
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
     */ public function update(CustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
     
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('customer/' . Str::random(), 'public');
        }
        $customer->update($data);


        return to_route('customer.index')
            ->with('success', "Customer \"$customer->name\" was updated");
    }

    /**
     * Remove the specified customer from storage.
     *
     * @param Customer $customer 
     */
    public function destroy(Customer $customer)
    {
        $name = $customer->name;
        $this->customerService->deleteCustomer($customer->id);

        return to_route('customer.index')
            ->with('success', "Customer \"$name\" was deleted");
    }
}
