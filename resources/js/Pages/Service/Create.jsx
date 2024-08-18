import Autocomplete from "@/Components/AutoComplete";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, categories, subcategories }) {
  const { data, setData, post, errors, reset } = useForm({
    date: new Date().toISOString().split("T")[0], // Set today's date
    name: "",
    acknowledgement_no: "",
    status: "",
    service_status: "",
    payment_status: "",
    follower_name: "",
    location: "",
    comments: "",
    customer_id: "", // Ensure this field is included
    category_id: "",
    subcategory_id: "",
    image: "",
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("service.store"));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setData("category_id", selectedCategoryId);

    // Filter subcategories based on selected category
    const filtered = subcategories.filter(
      (subcategory) => subcategory.category_id === parseInt(selectedCategoryId)
    );
    setFilteredSubcategories(filtered);
    // Reset subcategory selection
    setData("subcategory_id", "");
  };

  const handleCustomerSelect = (customer) => {
    setCustomerName(customer.name); // Update the visible customer name
    setCustomerId(customer.id);     // Update the customer ID state
    setData("customer_id", customer.id); // Update the form data
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create New Service
          </h2>
        </div>
      }
    >
      <Head title="Create Service" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {/* Two text inputs in a row */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="date" value="Date" />
                  <TextInput
                    id="date"
                    type="date"
                    name="date"
                    value={data.date}
                    className="block w-full mt-1"
                    onChange={(e) => setData("date", e.target.value)}
                  />
                  <InputError message={errors.date} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-full">
                  <InputLabel
                    htmlFor="acknowledgement_no"
                    value="Acknowledgement No"
                  />
                  <TextInput
                    id="acknowledgement_no"
                    type="text"
                    name="acknowledgement_no"
                    value={data.acknowledgement_no}
                    className="block w-full mt-1"
                    onChange={(e) =>
                      setData("acknowledgement_no", e.target.value)
                    }
                  />
                  <InputError
                    message={errors.acknowledgement_no}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Select Inputs */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="status" value="Status" />
                  <SelectInput
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
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="service_status" value="Service Status" />
                  <TextInput
                    id="service_status"
                    type="text"
                    name="service_status"
                    value={data.service_status}
                    className="block w-full mt-1"
                    onChange={(e) => setData("service_status", e.target.value)}
                  />
                  <InputError
                    message={errors.service_status}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Continue with other fields */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="payment_status" value="Payment Status" />
                  <SelectInput
                    name="payment_status"
                    id="payment_status"
                    className="block w-full mt-1"
                    onChange={(e) => setData("payment_status", e.target.value)}
                  >
                    <option value="">Select Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </SelectInput>
                  <InputError
                    message={errors.payment_status}
                    className="mt-2"
                  />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="follower_name" value="Follower Name" />
                  <TextInput
                    id="follower_name"
                    type="text"
                    name="follower_name"
                    value={data.follower_name}
                    className="block w-full mt-1"
                    onChange={(e) => setData("follower_name", e.target.value)}
                  />
                  <InputError message={errors.follower_name} className="mt-2" />
                </div>
              </div>

              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="location" value="Location" />
                  <TextInput
                    id="location"
                    type="text"
                    name="location"
                    value={data.location}
                    className="block w-full mt-1"
                    onChange={(e) => setData("location", e.target.value)}
                  />
                  <InputError message={errors.location} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="comments" value="Comments" />
                  <TextAreaInput
                    id="comments"
                    name="comments"
                    value={data.comments}
                    className="block w-full mt-1"
                    onChange={(e) => setData("comments", e.target.value)}
                  />
                  <InputError message={errors.comments} className="mt-2" />
                </div>
              </div>

              {/* Autocomplete for Customer */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="relative w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="customer_name" value="Customer" />
                  <Autocomplete
                    value={customerId} // Pass customerId as value
                    onChange={(e) => setCustomerId(e.target.value)}
                    onSelect={handleCustomerSelect}
                  />
                  {/* Hidden input field for customer_id */}
                  <input
                    type="hidden"
                    name="customer_id"
                    value={customerId}
                  />
                  <InputError message={errors.customer_id} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="category_id" value="Category" />
                  <SelectInput
                    id="category_id"
                    name="category_id"
                    className="block w-full mt-1"
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {renderOptions(categories)}
                  </SelectInput>
                  <InputError message={errors.category_id} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="subcategory_id" value="Subcategory" />
                  <SelectInput
                    id="subcategory_id"
                    name="subcategory_id"
                    className="block w-full mt-1"
                    onChange={(e) => setData("subcategory_id", e.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {renderOptions(filteredSubcategories)}
                  </SelectInput>
                  <InputError
                    message={errors.subcategory_id}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="image" value="Image" />
                <TextInput
                  id="image"
                  type="file"
                  name="image"
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("service.index")}
                  className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald600"
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
