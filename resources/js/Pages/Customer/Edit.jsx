import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, customer }) {
  // Define the path to the default profile picture
  const defaultProfilePic = "/profile.png";

  const { data, setData, post, errors, reset } = useForm({
    image: customer.data.image_path ? `/${customer.data.image_path}` : defaultProfilePic,
    name: customer.data.name || "",
    mobile_number: customer.data.mobile_number || "",
    email: customer.data.email || "",
    street: customer.data.street || "",
    area: customer.data.area || "",
    city: customer.data.city || "",
    state: customer.data.state || "",
    status: customer.data.status || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("customer.update", { customer: customer.data.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Customer "{data.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Customer" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {/* Display customer image */}
              {data.image && (
                <div className="mb-4">
                  <img
                    src={data.image}
                    className="w-32 rounded-full" 
                    alt={data.name}
                  />
                </div>
              )}

              {/* File input for image */}
              <div className="mt-4">
                <InputLabel htmlFor="customer_image" value="Customer Image" />
                <TextInput
                  id="customer_image"
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
                  <InputLabel htmlFor="mobile_number" value="Mobile Number" />
                  <TextInput
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    value={data.mobile_number}
                    className="block w-full mt-1"
                    onChange={(e) => setData("mobile_number", e.target.value)}
                  />
                  <InputError message={errors.mobile_number} className="mt-2" />
                </div>
              </div>

              {/* Continue with other fields */}
              <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="block w-full mt-1"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="street" value="Street" />
                <TextInput
                  id="street"
                  type="text"
                  name="street"
                  value={data.street}
                  className="block w-full mt-1"
                  onChange={(e) => setData("street", e.target.value)}
                />
                <InputError message={errors.street} className="mt-2" />
              </div>
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="area" value="Area" />
                  <TextInput
                    id="area"
                    type="text"
                    name="area"
                    value={data.area}
                    className="block w-full mt-1"
                    onChange={(e) => setData("area", e.target.value)}
                  />
                  <InputError message={errors.area} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="city" value="City" />
                  <TextInput
                    id="city"
                    type="text"
                    name="city"
                    value={data.city}
                    className="block w-full mt-1"
                    onChange={(e) => setData("city", e.target.value)}
                  />
                  <InputError message={errors.city} className="mt-2" />
                </div>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="state" value="State" />
                <TextInput
                  id="state"
                  type="text"
                  name="state"
                  value={data.state}
                  className="block w-full mt-1"
                  onChange={(e) => setData("state", e.target.value)}
                />
                <InputError message={errors.state} className="mt-2" />
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
                  href={route("customer.index")}
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
