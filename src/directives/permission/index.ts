import { Directive } from 'vue'

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    console.log('value:', value)

    const hasPermission = 1

    if (hasPermission < 0) {
      el.parentNode && el.parentNode.removeChild(el)
    }
    // else {
    //   throw new Error("无操作权限！")
    // }
    // const roles = useStore().state.user.roles
    // if (value && value instanceof Array && value.length > 0) {
    //   const permissionRoles = value
    //   const hasPermission = roles.some((role: any) => {
    //     return permissionRoles.includes(role)
    //   })
    //   if (!hasPermission) {
    //     el.style.display = 'none'
    //   }
    // } else {
    //   throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    // }
  },
}
