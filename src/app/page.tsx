"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-center">
      <h1 className="text-white text-2xl text-center">Vehicle Rental</h1>

      <div className="flex space-x-2 mx-auto mt-6">
        <button
          className="bg-white px-4 rounded-sm"
          onClick={() => router.push("/admin")}
        >
          Admin
        </button>
        <button
          className="bg-white px-4 rounded-sm"
          onClick={() => router.push("/renter")}
        >
          Renter
        </button>
      </div>
    </div>
  );
}
