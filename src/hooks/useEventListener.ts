import { useEffect, useRef } from "react"

export function useEventListener<T extends Event>(
  eventType: string,
  callback: (e: T) => void,
  element: EventTarget
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e as T)
    element.addEventListener(eventType, handler)
    return () => {
      element.removeEventListener(eventType, handler)
    }
  }, [eventType, element])
}
