import { tuple } from "../utils"
import React from "react"

const paginationUpdateTypes = tuple('prev', 'next', 'click')

export type PaginationUpdateType = typeof paginationUpdateTypes[number]

export interface PaginationConfig {
  isFirst?: boolean
  isLast?: boolean
  update?: (type: PaginationUpdateType) => void
  disabled?:boolean
}

const defaultContext = {}

export const PaginationContext = React.createContext<PaginationConfig>(defaultContext)

export const usePaginationContext = (): PaginationConfig =>
  React.useContext<PaginationConfig>(PaginationContext)