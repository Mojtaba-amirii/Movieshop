import { useState } from "react";

export default function Admin() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-10 text-center text-5xl">Orders</h1>

      <div className="min-w-sm mt-4 flex flex-col items-center justify-center gap-2 md:flex-row">
        <input
          className="w-2/3 rounded-md border border-black px-4 text-start"
          placeholder="Search order. . ."
          type="Text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
