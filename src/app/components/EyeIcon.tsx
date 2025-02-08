import { useState } from "react"

export default function EyeIcon ( { eyeClicked }: { eyeClicked: (eyeOpened: boolean) => void } ) {

  const [ eyeOpened , setOpen ] = useState (true)

  let eyeIcon
  eyeOpened ? eyeIcon = String.fromCodePoint(128065) : eyeIcon = '\u25E1'

  const openEye = () => { 
    setOpen (!eyeOpened)
    eyeClicked (eyeOpened)
  }

  return (
    <div>
      <span onClick={ openEye } className="mx-2 hover:cursor-pointer">
        { eyeIcon } 
      </span>
    </div>
  )
}