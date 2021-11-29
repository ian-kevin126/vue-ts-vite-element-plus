export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    open: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

export const state: IAppState = {
  device: DeviceType.Desktop,
  sidebar: {
    open: true,
    withoutAnimation: true,
  },
  language: 'zh',
  size: 'medium',
}
