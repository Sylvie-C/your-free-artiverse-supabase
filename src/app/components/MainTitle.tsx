
export default function MyComponent({ word01, word02 , word03 }
  : { word01: string; word02: string; word03: string }) {

  const words = [
    { text: word01, color: "text-pink-700" },
    { text: word02, color: "text-orange-500" },
    { text: word03, color: "text-violet-500" },
  ]

  let globalIndex = 0

  const titleJSXArray = words.flatMap(
    ( { text, color } ) =>
      text.split("").map( 
        (letter) => {
          const letterJSX = (
            <span
              key={`letter-${globalIndex}`}
              className={`inline-block ${color} animate-wavy`}
              style={{ animationDelay: `${0.1 * globalIndex}s` }}
            >
              {letter}
            </span>
          )
          globalIndex++
          return letterJSX
        }
      ).concat(<span key={`space-${globalIndex}`}>&nbsp;</span>)
  )

  return (
    <h1 className="text-3xl sm:text-5xl sm:tracking-wider lg:text-6xl lg:tracking-mainTitle">
      {titleJSXArray}
    </h1>
  )
}
