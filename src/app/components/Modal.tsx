import { useState , useEffect } from "react"


interface ModalProps {
  jsxContent: React.ReactNode;
  show?: boolean
}


export default function Modal ( { jsxContent , show }: ModalProps ) {

  const [ modalVisible , setModalVisible ] = useState(false)

  useEffect (
    () => {
      show ? setModalVisible(true) : setModalVisible(false)
    }, [show]
  )

  return (
    modalVisible && 
    <div className="fixed z-10 top-0 left-0 w-screen h-full bg-black/[0.5] flex justify-center sm:items-center">

      <div className="size-72 sm:w-[600px] sm:h-80 overflow-scroll m-4 p-4 rounded-2xl bg-modalLight dark:bg-modalDark text-modalDark dark:text-modalLight">
        {
          <div className="relative w-full h-full flex flex-col justify-center">
            <button 
              onClick={ () => setModalVisible(false) } 
              className="absolute top-0 right-0 w-fit leading-none text-sm" >
              X
            </button>
            {jsxContent}
          </div>
        }
      </div>
    </div>
  )
}