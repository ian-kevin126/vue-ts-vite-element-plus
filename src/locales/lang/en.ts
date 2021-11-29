/**
 * @description 项目英语配置
 * @author hu-snail 1217437592@qq.com
 */
export default {
  route: {
    dashboard: 'Home',
    errorPages: 'Error Pages',
    table: 'Table',
    tableComponent: 'Table Component',
    page401: '401',
    page404: '404',
  },
  navbar: {
    out: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Change theme',
    full: 'Full screen',
    noFull: 'Exit full screen',
    refresh: 'Refresh',
    fold: 'Fold',
    unfold: 'Unfold',
    size: 'Global Size',
    profile: 'Profile',
  },

  entry: {
    title: 'Login',
    rules: {
      username: 'Please enter a username',
      password: 'Please enter your password',
    },
    btn: 'Login',
    desc: 'Out of the box in the background management system',
    tip: 'Click login for a quick experience',
    username: 'Username',
    password: 'Password',
    thirdparty: 'Third-party Login',
    rememberPwd: 'Remember the password',
    forgotPwd: 'Forgot password',
  },
  register: {
    title: 'Register',
    btn: 'Register',
    username: 'UserName',
    smsCode: 'SMS verification code',
    smsbtn: 'Get Code',
    password: 'Password',
    confirmPwd: 'Confirm Password',
    checkText: 'I agree with XXX Privacy Policy',
  },
  theme: {
    change: 'Change Theme',
    loading: 'Theme change loading...',
  },
  tagsView: {
    refresh: 'Refresh',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeOthers: 'Close Others',
    closeAll: 'Close All',
  },
  settings: {
    title: 'Theme Settings',
    layout: 'Menu Layout',
    theme: 'Theme',
    logo: 'Logo',
    tab: 'Tab View',
    breadcurmb: 'Breadcurmb',
    fixHead: 'Fixed Header',
    visibleTab: 'Visible Tab',
    fullscreen: 'Fuscreen',
    refresh: 'Refresh',
    notice: 'Notice',
    defaultBtn: 'Restore the default',
    saveBtn: 'Save',
  },
  layout: {
    vertical: 'Vertical',
    horizontal: 'Horizontal',
  },
  notice: {
    msg: 'Welcome to ',
    empty: 'No data!'
  },
  tabs: {
    notice: 'Notice',
    message: 'Message',
    email: 'EMail',
  },

  indexPage: {
    descTitle: 'Start your day!',
    resourceTitle: 'Vue3 related resources are recommended',
    orderTitle: 'The order list',
    order: {
      planned: 'Planned',
      finished: 'Completed',
      unfinished: 'Outstanding',
    },
    skillTitle: 'The skills list',
    envTitle: 'Production environments depend on information',
    chartTitle: 'Smoothed Line Chart',
  },
  componentPage: {
    title: 'Component',
    table: 'Table',
  },
  errorPages: {
    title: 'Sorry!',
    btn: 'Back Home',
    404: {
      desc: 'Current page does not exist...',
      remark:
        'Please check whether the url you entered is correct, or click the button below to return to the home page',
    },
    401: {
      desc: "You don't have permission to go to this page...",
      remark:
        'Please contact the administrator or click the button below to return to the home page',
    },
  },
  confirm: {
    title: 'Operating hints',
    msg: 'Are you sure you want to exit',
  },
  btn: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    search: 'Search',
    create: 'Create',
    back: 'Back Home'
  },

}
