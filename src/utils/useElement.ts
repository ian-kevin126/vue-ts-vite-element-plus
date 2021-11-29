import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

export default function () {
  type msgType = '' | 'success' | 'warning' | 'info' | 'error' | undefined

  const open = (message: string, type: msgType, showClose = false) => {
    ElMessage({
      message,
      type,
      showClose,
    })
  }

  const success = (message: '操作成功', showClose?: boolean): any => {
    open(message, 'success', showClose)
  }

  const error = (message: '操作失败', showClose?: boolean): any => {
    open(message, 'error', showClose)
  }

  const warning = (message: '这是一条警告消息', showClose?: boolean): any => {
    open(message, 'warning', showClose)
  }

  const info = (message: '这是一条提示消息', showClose?: boolean): any => {
    open(message, 'info', showClose)
  }

  const confirm = (
    message = 'proxy will permanently delete the file. Continue?',
    title = 'Warning'
  ) => {
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(resolve)
        .catch(() => {
          console.log('cancel')
          reject()
        })
    })
  }

  const loading = (text: 'Loading') => {
    return ElLoading.service({
      lock: true,
      text,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  return {
    success,
    error,
    warning,
    info,
    confirm,
    loading,
  }
}
