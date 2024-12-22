//We can show some info here like ongoing elections etc
//* Only loged out users can view this page

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full">
      <h1>E voting system for apsoiur college</h1>
      <button className="bg-primary-green text-background-white hover:bg-highlight-green">
        Vote Now
      </button>
      <Link href={"/admin"}>Admin</Link>
    </div>
  );
}
