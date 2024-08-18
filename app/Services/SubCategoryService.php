<?php

namespace App\Services;

use App\Models\SubCategory;
use App\Models\Category;
use Illuminate\Support\Str;

class SubCategoryService
{
    public function getFilteredSubcategories($filters, $sortField, $sortDirection)
    {
        return SubCategory::query()
            ->when($filters['name'] ?? null, function ($query, $name) {
                $query->where('name', 'like', "%$name%");
            })
            ->when($filters['category_id'] ?? null, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10);
    }

    public function createSubCategory($data)
    {
        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('subcategory/' . Str::random(), 'public');
        }
        return SubCategory::create($data);
    }

    public function getSubCategoryById($id)
    {
        return SubCategory::findOrFail($id);
    }

    public function updateSubCategory($id, $data)
    {
        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('subcategory/' . Str::random(), 'public');
        }
        $subcategory = $this->getSubCategoryById($id);
        $subcategory->update($data);

        return $subcategory;
    }

    public function deleteSubCategory($id)
    {
        $subcategory = $this->getSubCategoryById($id);
        $subcategory->delete();

        return $subcategory;
    }

    public function getAllCategories()
    {
        return Category::all();
    }
}

