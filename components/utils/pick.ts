import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState,ReactNode } from 'react'



export const pickChild = (
    children: ReactNode | undefined,
    targetChild: React.ElementType,
  ): [ReactNode | undefined, ReactNode | undefined] => {
    let target: ReactNode[] = []
    const withoutTargetChildren = React.Children.map(children, item => {
      if (!React.isValidElement(item)) return item
      if (item.type === targetChild) {
        target.push(item)
        return null
      }
      return item
    })
  
    const targetChildren = target.length >= 0 ? target : undefined
  
    return [withoutTargetChildren, targetChildren]
  }
  


export type CurrentStateType<S> = [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
  
export  const useCurrentState = <S>(initialState: S | (() => S)): CurrentStateType<S> => {
    const [state, setState] = useState<S>(() => {
      return typeof initialState === 'function' ? (initialState as () => S)() : initialState
    })
    const ref = useRef<S>(initialState as S)
  
    useEffect(() => {
      ref.current = state
    }, [state])
  
    const setValue = (val: SetStateAction<S>) => {
      const result = typeof val === 'function' ? (val as (prevState: S) => S)(ref.current) : val
      ref.current = result
      setState(result)
    }
  
    return [state, setValue, ref]
  }
  
  export const setChildrenProps = (
    children: ReactNode | undefined,
    props: object = {},
    targetComponents: Array<React.ElementType> = [],
  ): ReactNode | undefined => {
    if (React.Children.count(children) === 0) return []
    const allowAll = targetComponents.length === 0
    const clone = (child: React.ReactElement, props = {}) => React.cloneElement(child, props)
  
    return React.Children.map(children, item => {
      if (!React.isValidElement(item)) return item
      if (allowAll) return clone(item, props)
  
      const isAllowed = targetComponents.find(child => child === item.type)
      if (isAllowed) return clone(item, props)
      return item
    })
  }













