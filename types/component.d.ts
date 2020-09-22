export interface FicusComponent extends HTMLElement {}

export type ComponentGetter = () => any
export type ComponentMethod = (...args: any[]) => void

export interface ComponentProperty {
  type: String | Number | Boolean | Object
  required?: boolean
  observed?: boolean
  default?: string | number | boolean | object
}

export interface ComponentComputedTree {
  [key: string]: ComponentGetter
}

export interface ComponentPropertyTree {
  [key: string]: ComponentProperty
}

export type ComponentOptions<S, T> = {
  render: () => T
  computed?: ComponentComputedTree
  props?: ComponentPropertyTree
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
  state?: () => S
} & {
  [key: string]: ComponentMethod
}

export declare function createComponent<S, T>(tagName: string, options: ComponentOptions<S, T>): void
