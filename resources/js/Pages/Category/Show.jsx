import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, success, category }) {
   return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Category "${category.data.name}"`}
          </h2>
          <Link
            href={route("category.edit", category.data.id)}
            className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Category "${category.data.name}"`} />
      <div className="py-12" key={category.data.id}>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div>
              <img
                src={category.data.image_path}
                alt=""
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div>
                  <div>
                    <label className="text-lg font-bold">ID</label>
                    <p className="mt-1">{category.data.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Name</label>
                    <p className="mt-1">{category.data.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-lg font-bold">Status</label>
                    <p className="mt-1">
                      <span className="px-2 py-1 text-white bg-green-500 rounded">
                        {category.data.status}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Created By</label>
                    <p className="mt-1">{category?.data?.createdBy?.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="text-lg font-bold">Create Date</label>
                    <p className="mt-1">{category.data.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-bold">Updated By</label>
                    <p className="mt-1">{category?.updatedBy?.name}</p>
                  </div>
                </div>
              </div>            
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
