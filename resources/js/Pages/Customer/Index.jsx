import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  CUSTOMER_STATUS_CLASS_MAP,
  CUSTOMER_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({
  auth,
  customers,
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("customer.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("customer.index"), queryParams);
  };

  const deleteCustomer = (customer) => {
    if (!window.confirm("Are you sure you want to delete the customer?")) {
      return;
    }
    router.delete(route("customer.destroy", customer.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Customers
          </h2>
          <Link
            href={route("customer.create")}
            className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Customers" />

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
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Customer Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.mobile_number}
                          placeholder="Mobile Number"
                          onBlur={(e) =>
                            searchFieldChanged("mobile_number", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("mobile_number", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.street}
                          placeholder="Street"
                          onBlur={(e) =>
                            searchFieldChanged("street", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("street", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.area}
                          placeholder="Area"
                          onBlur={(e) =>
                            searchFieldChanged("area", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("area", e)}
                        />
                      </th>
                      
                      <th className="px-3 py-3">
                      <TextInput
                          className="w-full"
                          defaultValue={queryParams.city}
                          placeholder="City"
                          onBlur={(e) =>
                            searchFieldChanged("city", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("city", e)}
                        />
                      </th>
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
                      <th className="px-3 py-3">Mobile Number</th>

                      <TableHeading
                        name="area"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Street
                      </TableHeading>
                      <TableHeading
                        name="area"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Area
                      </TableHeading>
                    
                      <TableHeading
                        name="city"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                      City
                      </TableHeading>

                 

                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                
                  <tbody>
                    {customers.data.map((customer) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={customer.id}
                      >
                        <td className="px-3 py-2">{customer.id}</td>
                        
                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                          <div className="flex">
                          <div className="image">
                          <a href={`#lightbox` + customer.id}>
                            <img
                              src={customer.image_path}                           
                              className="w-10 h-10 rounded-full" 
                            />
                          </a>
                          <div
                            id={`lightbox` + customer.id}
                            className="fixed inset-0 hidden p-10 overflow-auto target:block bg-black/75"
                          >
                            <a
                              href="#"
                              className="absolute top-0 right-0 px-3 py-1 text-black bg-white"
                            >
                              X
                            </a>
                            <img
                              src={customer.image_path}
                              alt={customer.name}
                            />
                          </div>
                          </div>
                          <div className="gap-2 p-3 name">
                          <Link href={route("customer.show", customer.id)} >
                            {customer.name}
                          </Link>
                          </div>
                          </div>
                         
                         
                        </th>
                        <td className="px-3 py-2">{customer.mobile_number}</td>
                        <td className="px-3 py-2">{customer.street}</td>
                        <td className="px-3 py-2">{customer.area}</td>
                        
                        <td className="px-3 py-2">{customer.city}</td>                   

                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("customer.edit", customer.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteCustomer(customer)}
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
              <Pagination links={customers.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
