import { atom } from "recoil";

export const isAPIModeState = atom<boolean>({
  key: 'isAPIModeState',
  default:  true
})

export const isLoadingState = atom<boolean>({
  key: 'isLoadingState',
  default: false
})

export const colorPrimaryState = atom<string>({
  key: 'colorPrimaryState',
  default: '#222222'
})

export const selectedModuleState = atom<String | null>({
  key: 'selectedModuleState',
  default: null
})
