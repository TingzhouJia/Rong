import { useState, useEffect } from "react"

const createElement = (id: string): HTMLElement => {
    const el = document.createElement('div')
    el.setAttribute('id', id)
    return el
  }
  
  const usePortal = (
    selectId: string =  String(Math.floor(Math.random()*1000)),
    getContainer?: () => HTMLElement | null,
  ): HTMLElement | null => {
    const id = `rong-ui-portal-${selectId}`
    const  isBrowser =window&&window.document
    const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
      isBrowser ? createElement(id) : null,
    )
  
    useEffect(() => {
      const customContainer = getContainer ? getContainer() : null
      const parentElement = customContainer || document.body
      const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`)
      const el = hasElement || createElement(id)
  
      if (!hasElement) {
        parentElement.appendChild(el)
      }
      setElSnapshot(el)
    }, [])
  
    return elSnapshot
  }
  
  export default usePortal