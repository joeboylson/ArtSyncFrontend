import { useEffect, useState } from "react"

export const useOnSpace = () => {

  const [spaceBarIsOpen, setSpacebarIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        setSpacebarIsOpen(!spaceBarIsOpen)
      }
    }, false)
  }, [spaceBarIsOpen])

  return { spaceBarIsOpen }

}