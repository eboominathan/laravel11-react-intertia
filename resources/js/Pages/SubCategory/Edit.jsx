import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, subcategory, categories }) {

  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: subcategory.data.name || "",
    category_id: subcategory.data.category_id || "",
    status: subcategory.data.status || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("subcategory.update", { subcategory: subcategory.data.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Subcategory "{subcategory.data.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Subcategory" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {/* Display subcategory image if available */}
              {subcategory.data.image_path && (
                <div className="mb-4">
                  <img
                    src={subcategory.data.image_path}
                    className="w-64"
                    alt="Subcategory"
                  />
                </div>
              )}

              {/* File input for image */}
              <div className="mt-4">
                <InputLabel htmlFor="subcategory_image" value="Subcategory Image" />
                <TextInput
                  id="subcategory_image"
                  type="file"
                  name="image"
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Two text inputs in a row */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="category_id" value="Category" />
                  <SelectInput
                    id="category_id"
                    name="category_id"
                    value={data.category_id}
                    className="block w-full mt-1"
                    onChange={(e) => setData("category_id", e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.category_id} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="status" value="Status" />
                <SelectInput
                  value={data.status}  
                  name="status"
                  id="status"
                  className="block w-full mt-1"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("subcategory.index")}
                  className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
