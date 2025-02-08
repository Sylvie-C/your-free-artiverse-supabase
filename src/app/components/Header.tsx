import Image from "next/image";
import Navbar from "./Navbar"


export default function Header () {

  return (
    <header>
      <div className="w-full h-fit  flex flex-col items-center bg-gradient-to-r from-violet-500 from-10% via-orange-500 via-50% to-pink-400 to-100%">
        <div className="relative m-4 w-40 h-40 md:w-52 md:h-52">
          <Image
            src="/assets/images/logo.webp"
            alt="logo"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw"
            className="rounded-2xl"
          />
        </div>
      </div>
      <Navbar />
    </header>
  )
}