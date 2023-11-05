import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-center text-5xl">Admin</h1>
      <Link href={"./products"}>
        <button
          type="button"
          className="my-7  w-40 rounded-xl border-4 border-solid border-black bg-sky-400 px-4 py-2 text-2xl  text-black"
        >
          Products
        </button>
      </Link>
      <br />

      <Link href={"./orders"}>
        <button
          type="button"
          className="my-3 w-40 rounded-xl border-4 border-solid border-black bg-sky-400 px-4 py-2 text-2xl"
        >
          Orders
        </button>
      </Link>
    </div>
  );
}
