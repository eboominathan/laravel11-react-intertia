<?php 
namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryService
{
    /**
     * Get all filtered categories.
     *
     * @param array $filters
     * @param string $sortField
     * @param string $sortDirection
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getFilteredCategories(array $filters, string $sortField = 'name', string $sortDirection = 'asc')
    {
        return Category::query()
            ->when($filters['name'] ?? null, function ($query, $name) {
                $query->where('name', 'like', '%' . $name . '%');
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
    }

    /**
     * Get a category by ID.
     *
     * @param int $id
     * @return Category
     */
    public function getCategoryById(int $id): Category
    {
        return Category::findOrFail($id);
    }

    /**
     * Create a new category.
     *
     * @param array $data
     * @return Category
     */
    public function createCategory(array $data): Category
    {
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('category/' . Str::random(), 'public');
        }

        return Category::create($data);
    }

    /**
     * Update an existing category.
     *
     * @param int $id
     * @param array $data
     * @return Category
     */
    public function updateCategory(int $id, array $data): Category
    {
        $category = $this->getCategoryById($id);
        $data['updated_by'] = Auth::id();

        if ($image = $data['image'] ?? null) {
            $data['image_path'] = $image->store('category/' . Str::random(), 'public');
        }

        $category->update($data);
        return $category;
    }

    /**
     * Delete a category.
     *
     * @param int $id
     * @return void
     */
    public function deleteCategory(int $id): void
    {
        $category = $this->getCategoryById($id);
        $category->update(['deleted_by' => Auth::id()]);
        $category->delete();
    }
}
