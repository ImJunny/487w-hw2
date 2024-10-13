"use client";

import { TReservation } from "@/app/admin/page";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RenterPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function updateReservation() {
    if (!validReservation) {
      setErrorMessage("Reservation not found.");
      return;
    }
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
    const { error } = await supabase
      .from("Reservations")
      .update({
        name: name,
        type: type,
        charge: charge,
        start_date: startDate,
        end_date: endDate,
        total: total,
      })
      .eq("id", id);
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

  const [id, setId] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [validReservation, setValidReservation] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [charge, setCharge] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reservation, setReservation] = useState<TReservation>();

  async function fetchReservation() {
    const { data } = await supabase
      .from("Reservations")
      .select()
      .eq("name", searchName);
    if (data && data.length > 0) {
      setValidReservation(true);
      setSearchErrorMessage("");
      const res: TReservation = data[0];
      setReservation(res);
      setId(res.id);
      setName(res.name);
      setType(res.type);
      setCharge(res.charge);
      setStartDate(res.start_date);
      setEndDate(res.end_date);
    } else {
      setValidReservation(false);
      setSearchErrorMessage("Name not found");
    }
  }

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
  }, [type, startDate, endDate, charge, reservation]);
  return (
    <div>
      <button
        className="bg-white px-4 rounded-sm absolute"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="flex mx-auto container justify-center h-screen items-center flex-col">
        <h1 className="text-xl text-white text-center">Manage a rental</h1>
        <div className="flex space-x-2 mt-2">
          <input
            className="px-2 w-full"
            placeholder="Name"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
          />
          <button
            className="bg-white px-2 rounded-md w-20 ml-auto"
            onClick={() => fetchReservation()}
          >
            Search
          </button>
        </div>
        <p className="text-red-400">{searchErrorMessage}</p>
        <div className="flex flex-col space-y-2 mt-14 ">
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
              onClick={() => updateReservation()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
