"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type TReservation = {
  id: number;
  name: string;
  type: string;
  charge: number;
  start_date: string;
  end_date: string;
  total: number;
};

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [reservations, setReservations] = useState<TReservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data, error } = await supabase.from("Reservations").select();
      if (!error) {
        setReservations(data);
      }
    };

    fetchReservations();
  }, [supabase]);

  return (
    <div>
      <button
        className="bg-white px-4 rounded-sm absolute"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="mx-auto container justify-center h-screen items-center max-w-3xl flex-col">
        <div className="grid grid-cols-6 bg-white font-semibold max-w-3xl">
          <p>Name</p>
          <p>Type</p>
          <p>Charge</p>
          <p>Start Date</p>
          <p>End Date</p>
          <p>Total</p>
        </div>
        {reservations.length > 0 ? (
          reservations.map((reservation, i) => (
            <div
              key={`res-${i}`}
              className="grid grid-cols-6 bg-white border-t border-black"
            >
              <p>{reservation.name}</p>
              <p>{reservation.type}</p>
              <p>${reservation.charge} / Day</p>
              <p>{reservation.start_date}</p>
              <p>{reservation.end_date}</p>
              <p>${reservation.total}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
