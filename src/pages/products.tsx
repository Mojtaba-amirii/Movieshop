import SearchBar from "~/components/searchbar";

export default function Admin() {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-center text-5xl">Products</h1>
      <SearchBar />
    </div>
  );
}
