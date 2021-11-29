import { settingConfig } from '@/config/setting'

const { menuMode, theme, collapse, fixedHead, visibleTab, visibleLogo, visibleBreadcrumb } = settingConfig
export interface ISettingState {
  setting: boolean
  fixHead: boolean
  visibleTab: boolean
  visibleLogo: boolean
  visibleBreadcrumb: boolean
  menuMode: string
  menuCollapse: boolean
  routerView: boolean
  theme: string
}

export const state: ISettingState = {
  setting: false, // 设置面板
  fixHead: fixedHead, // 固定header
  visibleTab: visibleTab, // 显示tagview
  visibleLogo: visibleLogo, // 显示Logo
  visibleBreadcrumb: visibleBreadcrumb, // 显示面包屑
  menuMode: menuMode, // 菜单模式 vertical, horizontal
  menuCollapse: collapse, // 当页面为左右布局时，菜单折叠状态
  routerView: true, // 是否显示路由
  theme: theme, // 皮肤颜色
}
