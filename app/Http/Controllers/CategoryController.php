<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;


class CategoryController extends Controller
{
    protected $categoryService;


    /**
     * Create a new controller instance.
     *
     * @param CategoryService $categoryService
 
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = $this->categoryService->getFilteredCategories(
            request()->only('name'),
            request('sort_field', 'created_at'),
            request('sort_direction', 'desc')
        );

        return inertia("Category/Index", [
            "categories" => CategoryResource::collection($categories),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new category.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return inertia("Category/Create");
    }

    /**
     * Store a newly created category in storage.
     *
     * @param CategoryRequest $request
     */
    public function store(CategoryRequest $request)
    {
        $this->categoryService->createCategory($request->validated());

        return to_route('category.index')
            ->with('success', 'Category was created');
    }

    /**
     * Display the specified category.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $category = $this->categoryService->getCategoryById($id);

        return inertia('Category/Show', [
            'category' => new CategoryResource($category),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified category.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $category = $this->categoryService->getCategoryById($id);

        return inertia('Category/Edit', [
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified category in storage.
     *
     * @param CategoryRequest $request
     * @param int $id
     */
    public function update(CategoryRequest $request, $id)
    {
        $this->categoryService->updateCategory($id, $request->validated());

        return to_route('category.index')
            ->with('success', "Category was updated");
    }

    /**
     * Remove the specified category from storage.
     *
     * @param int $id
     */
    public function destroy($id)
    {
        $this->categoryService->deleteCategory($id);

        return to_route('category.index')
            ->with('success', "Category was deleted");
    }
}
