<?php
 
namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Category;
use App\Models\SubCategory;
use App\Services\ServiceService;

class ServiceController extends Controller
{
    protected $serviceService;

    /**
     * Create a new controller instance.
     *
     * @param ServiceService $serviceService
     */
    public function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    /**
     * Display a listing of the services.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $services = $this->serviceService->getFilteredServices(
            request()->only('name', 'category_id', 'subcategory_id'),
            request('sort_field', 'created_at'),
            request('sort_direction', 'desc')
        );

        return inertia("Service/Index", [
            "services" => ServiceResource::collection($services),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new service.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $categories = $this->serviceService->getAllCategories(); 
        $subcategories = $this->serviceService->getAllSubCategories();

        return inertia("Service/Create", [
            'categories' => $categories,
            'subcategories' => $subcategories,
        ]);
    }

    /**
     * Store a newly created service in storage.
     *
     * @param ServiceRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ServiceRequest $request)
    {
        $this->serviceService->createService($request->validated());

        return redirect()->route('service.index')
            ->with('success', 'Service was created');
    }

    /**
     * Display the specified service.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $service = $this->serviceService->getServiceById($id);

        return inertia('Service/Show', [
            'service' => new ServiceResource($service),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified service.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $service = $this->serviceService->getServiceById($id);
        $categories = Category::all(); // Fetch categories if needed
        $subcategories = Subcategory::all(); // Fetch subcategories if needed

        return inertia('Service/Edit', [
            'service' => new ServiceResource($service),
            'categories' => $categories,
            'subcategories' => $subcategories,
        ]);
    }

    /**
     * Update the specified service in storage.
     *
     * @param ServiceRequest $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ServiceRequest $request, $id)
    {
        $this->serviceService->updateService($id, $request->validated());

        return redirect()->route('service.index')
            ->with('success', 'Service was updated');
    }

    /**
     * Remove the specified service from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->serviceService->deleteService($id);

        return redirect()->route('service.index')
            ->with('success', 'Service was deleted');
    }
}
