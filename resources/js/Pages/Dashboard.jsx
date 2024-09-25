import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, useForm } from "@inertiajs/react";
import { BiCopy } from "react-icons/bi";
import { toast, Toaster } from 'react-hot-toast'; // Importing react-hot-toast

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {

  // TaskRow component to handle each task's row including copy functionality
  const TaskRow = ({ task }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(task?.service_status);
    const [highlightedStatus, setHighlightedStatus] = useState(null); // New state for highlighted dropdown
    const { data, setData, put } = useForm({ service_status: task?.service_status }); // Initialize useForm

    const handleCopy = () => {
      navigator.clipboard.writeText(task?.acknowledgement_no);
      setIsCopied(true);

      // Show a toast message when text is copied
      toast.success('Acknowledgement number copied!');

      // Revert text color back to normal after 5 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    };

    const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      setSelectedStatus(newStatus); // Update local state for UI feedback
      setData("service_status", newStatus); // Update form data for Inertia

      // Send the PUT request to update the service status
      put(route("service.update_status", { service: task.id }), {
        onSuccess: () => {
          toast.success("Service status updated successfully!");
        },
        onError: (errors) => {
          console.error(errors);
          toast.error("Failed to update status. Please try again.");
        },
      });
    };
  

    return (
      <tr key={task.id}>
        <td className="px-3 py-2">{task.id}</td>
        <td className="px-3 py-2 text-nowrap">{task?.date}</td>
        <td className="px-3 py-2 text-nowrap">{task?.category?.name}</td>
        <td className="px-3 py-2 text-white hover:underline">
          <Link href={route("project.show", task.id)}>{task.name}</Link>
        </td>
        <td className="px-3 py-2 text-white hover:underline">
          <Link href={route("service.show", task.id)}>{task?.customer?.name}</Link>
        </td>
        <td className="px-3 py-2 text-white">
          <span className={`hover:underline ${isCopied ? "text-green-500" : ""}`}>
            {task?.acknowledgement_no}
          </span>
          <button
            onClick={handleCopy}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <BiCopy size={20} />
          </button>
        </td>
        <td className="px-3 py-2">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className={`px-2 py-1 text-white rounded text-nowrap ${TASK_STATUS_CLASS_MAP[selectedStatus]} border border-gray-600`}
          >
            <option value="pending">Pending</option>
            <option value="not_applied_yet">Not Applied Yet</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </td>
    </tr>
    );
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      {/* Toaster component to display toast notifications */}
      <Toaster />

      <div className="py-12">
        <div className="grid grid-cols-3 gap-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-amber-500">Pending</h3>
              <p className="mt-4 text-xl">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-blue-500">
                In Progress
              </h3>
              <p className="mt-4 text-xl">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-green-500">
                Completed
              </h3>
              <p className="mt-4 text-xl">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-xl font-semibold text-gray-200">
                My Active Tasks
              </h3>

              <table className="w-full mt-3 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Service</th>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Acknowledgment</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks?.data.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
