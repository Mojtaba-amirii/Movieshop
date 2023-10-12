

export default function Admin() {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-center text-5xl">Orders</h1>

  <div className="min-w-sm mt-4 flex  flex-col items-center justify-center gap-2 md:flex-row ">
        <input
          className=" w-2/3  rounded-md border border-black text-start px-4"
          placeholder="Search order. . ."
          type="Text"
        //   onChange={(e) => setSearch(e.target.value)}
        />
</div>

    </div>
  );
}
