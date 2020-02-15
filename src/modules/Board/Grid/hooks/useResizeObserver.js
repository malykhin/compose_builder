import { useRef, useState, useEffect } from 'react'

export default function useResizeObserver(ref) {
  const [size, setSize] = useState({})

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    }),
  )

  useEffect(() => {
    const { current } = observer
    if (ref.current && current) {
      current.observe(ref.current)
    }
    return () => {
      if (current) {
        current.unobserve()
      }
    }
  }, [ref, observer])

  return size
}
