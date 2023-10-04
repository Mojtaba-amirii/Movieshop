import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>test</p>

      <Link href={"./"}>Go back</Link>
    </div>
  );
}
