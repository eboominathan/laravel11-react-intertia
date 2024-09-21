import Autocomplete from "@/Components/AutoComplete";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Edit({ auth, categories, subcategories, service }) {
  
  const { data, setData, put, errors, reset } = useForm({
    id:service.data.id,
    date: service.date || new Date().toISOString().split("T")[0],
    name: service.data.name || "",
    acknowledgement_no: service.data.acknowledgement_no || "",
    status: service.data.status || "",
    service_status: service.data.service_status || "",
    payment_status: service.data.payment_status || "",
    follower_name: service.data.follower_name || "",
    location: service.data.location || "",
    comments: service.data.comments || "",
    customer_id: service.data.customer_id || "",
    category_id: service.data.category_id || "",
    subcategory_id: service.data.subcategory_id || "",
    image: "",
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [customerName, setCustomerName] = useState(service.data.customer ? service.data.customer.name : "");
  const [customerId, setCustomerId] = useState(service.data.customer_id || "");

  useEffect(() => {
    if (data.category_id) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.category_id === parseInt(data.category_id)
      );
      setFilteredSubcategories(filtered);
    }
  }, [data.category_id, subcategories]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(service);
    // Check if service.id exists
    if (!data.id) {
      console.error("Service ID is missing");
      return;
    }

    put(route("service.update", { service: data.id }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setData("category_id", selectedCategoryId);
    setData("subcategory_id", ""); // Reset subcategory selection
  };

  const handleCustomerSelect = (customer) => {
    setCustomerName(customer.name);
    setCustomerId(customer.id);
    setData("customer_id", customer.id); // Ensure customer_id is set in the form data
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
            Edit Service
          </h2>
        </div>
      }
    >
      <Head title="Edit Service" />
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
                    value={data.status}
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
                    value={data.payment_status}
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
                    value={customerName} // Pass customerName as the value
                    onSelect={handleCustomerSelect} // Handle customer selection
                  />
                  <InputError message={errors.customer_id} className="mt-2" />
                </div>
              </div>

              {/* Category and Subcategory */}
              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel htmlFor="category_id" value="Category" />
                  <SelectInput
                    name="category_id"
                    id="category_id"
                    className="block w-full mt-1"
                    onChange={handleCategoryChange}
                    value={data.category_id}
                  >
                    <option value="">Select Category</option>
                    {renderOptions(categories)}
                  </SelectInput>
                  <InputError message={errors.category_id} className="mt-2" />
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputLabel
                    htmlFor="subcategory_id"
                    value="Subcategory"
                  />
                  <SelectInput
                    name="subcategory_id"
                    id="subcategory_id"
                    className="block w-full mt-1"
                    onChange={(e) => setData("subcategory_id", e.target.value)}
                    value={data.subcategory_id}
                    disabled={!data.category_id} // Disable if no category is selected
                  >
                    <option value="">Select Subcategory</option>
                    {renderOptions(filteredSubcategories)}
                  </SelectInput>
                  <InputError message={errors.subcategory_id} className="mt-2" />
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <Link
                  href={route("service.index")}
                  className="text-sm text-gray-600 underline dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md dark:bg-gray-200 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
