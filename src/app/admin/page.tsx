"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <div>
      <button
        className="bg-white px-4 rounded-sm"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
