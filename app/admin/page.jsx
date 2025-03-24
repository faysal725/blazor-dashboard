import AdminForm from "@/components/AdminForm";
import { BoltIcon } from "@heroicons/react/24/outline";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <div className="flex justify-center items-center ">
          <BoltIcon className="h-5 w-auto text-white" />
          <p className="text-lg font-bold text-white italic">Blazor</p>
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Admin Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AdminForm />
      </div>
    </div>
  );
}
