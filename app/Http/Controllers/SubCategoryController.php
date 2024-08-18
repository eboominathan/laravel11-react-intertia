<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubCategoryRequest;
use App\Http\Resources\SubCategoryResource;
use App\Services\SubCategoryService;


class SubCategoryController extends Controller
{
    protected $subcategoryService;


    /**
     * Create a new controller instance.
     *
     * @param SubCategoryService $subcategoryService
 
     */
    public function __construct(SubCategoryService $subcategoryService)
    {
        $this->subcategoryService = $subcategoryService;
    }

    /**
     * Display a listing of the subcategories.
     */
    public function index()
    {
        $subcategories = $this->subcategoryService->getFilteredSubcategories(
            request()->only('name', 'category_id'),
            request('sort_field', 'created_at'),
            request('sort_direction', 'desc')
        );

        return inertia("Subcategory/Index", [
            "subcategories" => SubCategoryResource::collection($subcategories),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new subcategory.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $categories = $this->subcategoryService->getAllCategories();
        return inertia("Subcategory/Create", ['categories' => $categories]);
    }

    /**
     * Store a newly created subcategory in storage.
     *
     * @param SubCategoryRequest $request
     */
    public function store(SubCategoryRequest $request)
    {
        $this->subcategoryService->createSubCategory($request->validated());

        return to_route('subcategory.index')
            ->with('success', 'SubCategory was created');
    }

    /**
     * Display the specified subcategory.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $subcategory = $this->subcategoryService->getSubCategoryById($id);

        return inertia('SubcategoryShow', [
            'subcategory' => new SubCategoryResource($subcategory),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified subcategory.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $subcategory = $this->subcategoryService->getSubCategoryById($id);
        $categories = $this->subcategoryService->getAllCategories();

        return inertia('Subcategory/Edit', [
            'subcategory' => new SubCategoryResource($subcategory),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified subcategory in storage.
     *
     * @param SubCategoryRequest $request
     * @param int $id
     */
    public function update(SubCategoryRequest $request, $id)
    {
        $this->subcategoryService->updateSubCategory($id, $request->validated());

        return to_route('subcategory.index')
            ->with('success', "SubCategory was updated");
    }

    /**
     * Remove the specified subcategory from storage.
     *
     * @param int $id
     */
    public function destroy($id)
    {
        $this->subcategoryService->deleteSubCategory($id);

        return to_route('subcategory.index')
            ->with('success', "SubCategory was deleted");
    }
}
