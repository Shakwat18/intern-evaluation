import Link from "next/link";
import RootLayout from "./layout";

export default function Page() {
  return(
    <>
   <h1 className="text-3xl text-danger font-bold underline g-34">
     <Link href={'/login'}>login</Link>
     <Link href={'/register'}>Register</Link>
    </h1>
    </>
  )
}