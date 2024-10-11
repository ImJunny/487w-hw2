"use client";

import { useRouter } from "next/navigation";

export default function RenterPage() {
  const router = useRouter();

  function submitForm() {}

  return (
    <div>
      <button
        className="bg-white px-4 rounded-sm"
        onClick={() => router.back()}
      >
        Back
      </button>
      <form></form>
    </div>
  );
}
