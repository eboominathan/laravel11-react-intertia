<?php 
namespace App\Services;

use App\Models\Service;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServiceService
{
    /**
     * Get filtered and sorted services.
     *
     * @param array $filters
     * @param string $sortField
     * @param string $sortDirection
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getFilteredServices($filters, $sortField, $sortDirection)
    {
        return Service::query()
            ->when($filters['name'] ?? null, function ($query, $name) {
                $query->where('name', 'like', "%$name%");
            })
            ->when($filters['category_id'] ?? null, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($filters['subcategory_id'] ?? null, function ($query, $subcategoryId) {
                $query->where('subcategory_id', $subcategoryId);
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10);
    }

    /**
     * Create a new service.
     *
     * @param array $data
     * @return \App\Models\Service
     */
    public function createService($data)
    {
        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('service/' . Str::random(), 'public');
        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        return Service::create($data);
    }

    /**
     * Get a service by its ID.
     *
     * @param int $id
     * @return \App\Models\Service
     */
    public function getServiceById($id)
    {
        return Service::findOrFail($id);
    }

    /**
     * Update a service.
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\Service
     */
    public function updateService($id, $data)
    {
        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('service/' . Str::random(), 'public');
        }
        $service = $this->getServiceById($id);
        $service->update($data);

        return $service;
    }

    /**
     * Delete a service.
     *
     * @param int $id
     * @return \App\Models\Service
     */
    public function deleteService($id)
    {
        $service = $this->getServiceById($id);
        $service->delete();

        return $service;
    }

    /**
     * Get all categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCategories()
    {
        return Category::all();
    }

    /**
     * Get all subcategories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllSubCategories()
    {
        return SubCategory::all();
    }
}
