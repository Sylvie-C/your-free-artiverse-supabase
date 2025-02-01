
import Navbar from "./Navbar"


export default function Header () {

  return (
    <header 
      className="w-full h-fit flex flex-col items-center bg-gradient-to-r from-violet-500 from-10% via-orange-500 via-50% to-pink-400 to-100%"
    >
      <Navbar />
      <div className="bg-hero-bckgd bg-no-repeat bg-cover rounded-2xl m-4 w-36 h-36 md:w-52 md:h-52"></div>
    </header>
  )
}