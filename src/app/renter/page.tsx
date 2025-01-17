"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RenterPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function submitForm() {
    if (name === "") {
      setErrorMessage("Name required.");
      return;
    } else if (type === "") {
      setErrorMessage("Vehicle type required.");
      return;
    } else if (startDate === "" || endDate === "" || total < 0) {
      setErrorMessage("Invalid dates.");
      return;
    }
    const { error } = await supabase.from("Reservations").insert({
      name: name,
      type: type,
      charge: charge,
      start_date: startDate,
      end_date: endDate,
      total: total,
    });
    if (error) {
      console.log(error);
    } else {
      router.back();
    }
  }

  const carTypes = [
    { type: "sedan", charge: 150 },
    { type: "SUV", charge: 250 },
    { type: "pick-up", charge: 200 },
    { type: "van", charge: 300 },
  ];

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [charge, setCharge] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedType = carTypes.find(
      (carType) => carType.type === event.target.value
    );
    if (selectedType) {
      setType(selectedType.type);
      setCharge(selectedType.charge);
    }
  }

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      const timeDiff =
        new Date(endDate).getTime() - new Date(startDate).getTime();
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      if (daysDiff == 0) {
        setDays(1);
        setTotal(1 * charge);
      } else {
        setDays(daysDiff);
        setTotal(daysDiff * charge);
      }
    }
  }, [type, startDate, endDate, charge]);
  return (
    <div>
      <button
        className="bg-white px-4 rounded-sm absolute"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="flex mx-auto container justify-center h-screen items-center flex-col space-y-14">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-white text-center">Request a rental</h1>
          <form>
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <input
                  className="px-2"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <select
                  value={type}
                  onChange={(event) => handleSelect(event)}
                  className="bg-white px-2 rounded-md cursor-pointer"
                >
                  {carTypes.map((type, i) => (
                    <option key={`type-${i}`}>{type.type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-x-2">
                <input
                  className="px-2"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
                <input
                  className="px-2"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="bg-white p-2">
            <h2 className="font-semibold">Rental Contract</h2>
            <div className="grid grid-cols-3">
              <p className="underline inline">Renter name:</p>
              <p className="inline col-span-2">{name}</p>
              <p className="underline">Vehicle type: </p>
              <p className="inline col-span-2">{type}</p>
              <p className="underline">Rate: </p>
              <p className="inline col-span-2">
                {charge > 0 ? `$${charge} / Day` : ""}
              </p>
              <p className="underline">Time range:</p>
              <p className="inline col-span-2">
                {startDate !== "" && endDate !== ""
                  ? `${startDate} - ${endDate}`
                  : ""}
              </p>
              <p className="underline">Days:</p>
              <p className="inline col-span-2">{days > 0 ? days : ""}</p>
              <p className="underline">Total:</p>
              <p className="inline col-span-2">
                {total > 0 ? `$${total}` : ""}
              </p>
            </div>
          </div>

          <div className="flex">
            <p className="text-red-400">{errorMessage}</p>
            <button
              className="bg-white px-2 rounded-md w-20 ml-auto"
              onClick={() => submitForm()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
