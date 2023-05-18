import { atom } from "recoil";

import { IModuleInfo } from '@type/index';

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

export const selectedModuleState = atom<IModuleInfo | null>({
  key: 'selectedModuleState',
  default: null
})

export const isScrolledState = atom<boolean>({
  key: 'isScrolledState',
  default: false
})

export const isLoadingImageState = atom<boolean>({
  key: 'isLoadingImageState',
  default: false
})

export const isModalPredictShow = atom<boolean>({
  key: 'isModalPredictShow',
  default: false
})