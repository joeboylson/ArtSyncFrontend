import { useCallback, useEffect, useState } from "react"

export const useWindowSize = () => {

  const [size, setSize] = useState({});

  const handleResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handleResize();
  }, [handleResize])
  
  return { ...size }
}