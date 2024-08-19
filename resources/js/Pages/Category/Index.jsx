import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useState } from "react";

export default function Index({
  auth,
  categories,
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};
  
  const [searchValue, setSearchValue] = useState(queryParams.name || "");

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("category.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const clearSearch = (name) => {
    setSearchValue("");
    searchFieldChanged(name, "");
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("category.index"), queryParams);
  };

  const deleteCategory = (category) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    router.delete(route("category.destroy", category.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Categories
          </h2>
          <Link
            href={route("category.create")}
            className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Categories" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>

                      <th className="px-3 py-3">
                        <div className="relative">
                          <TextInput
                            className="w-full pr-10"
                            value={searchValue}
                            placeholder="Name"
                            onChange={(e) => setSearchValue(e.target.value)}
                            onBlur={(e) => searchFieldChanged("name", e.target.value)}
                            onKeyPress={(e) => onKeyPress("name", e)}
                          />
                          {searchValue && (
                            <button
                              onClick={() => clearSearch("name")}
                              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 transition-colors duration-200 transform bg-gray-500 rounded-r-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-3"></th>                     
                      <th className="px-3 py-3"></th>                     
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>

                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>
                     

                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.data.map((category) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={category.id}
                      >
                        <td className="px-3 py-2">{category.id}</td>

                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                          <div className="flex">
                            <div className="image">
                              <a href={`#lightbox` + category.id}>
                                <img
                                  src={category.image_path}
                                  className="w-10 h-10 rounded-full"
                                />
                              </a>
                              <div
                                id={`lightbox` + category.id}
                                className="fixed inset-0 hidden p-10 overflow-auto target:block bg-black/75"
                              >
                                <a
                                  href="#"
                                  className="absolute top-0 right-0 px-3 py-1 text-black bg-white"
                                >
                                  X
                                </a>
                                <img
                                  src={category.image_path}
                                  alt={category.name}
                                />
                              </div>
                            </div>
                            <div className="gap-2 p-3 name">
                              <Link href={route("category.show", category.id)}>
                                {category.name}
                              </Link>
                            </div>
                          </div>
                        </th>
                        <td className="px-3 py-2">{category.status}</td>
                     

                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("category.edit", category.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteCategory(category)}
                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={categories.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
