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

export default function Index({ auth, customers, queryParams = null, success }) {
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
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="px-3 py-3">Image</th>
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

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
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
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.data.map((customer) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={customer.id}
                      >
                        <td className="px-3 py-2">{customer.id}</td>
                        <td className="px-3 py-2">
                          <img src={customer.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                          <Link href={route("customer.show", customer.id)}>
                            {customer.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              CUSTOMER_STATUS_CLASS_MAP[customer.status]
                            }
                          >
                            {CUSTOMER_STATUS_TEXT_MAP[customer.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {customer.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {customer.due_date}
                        </td>
                        <td className="px-3 py-2">{customer.createdBy.name}</td>
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