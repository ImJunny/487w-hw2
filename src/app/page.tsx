"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-center">
      <h1 className="text-white text-2xl text-center">Vehicle Rental</h1>

      <div className="flex flex-col space-y-2 mx-auto mt-6">
        <p className="text-white">Admins</p>
        <button
          className="bg-white px-4 rounded-sm"
          onClick={() => router.push("/admin")}
        >
          View reservations
        </button>
        <p className="text-white">Customers</p>
        <button
          className="bg-white px-4 rounded-sm"
          onClick={() => router.push("/renter")}
        >
          Request a rental
        </button>
        <button
          className="bg-white px-4 rounded-sm"
          onClick={() => router.push("/renter/info")}
        >
          Manage a rental
        </button>
      </div>
    </div>
  );
}
