<script setup lang="ts">
import { reactive, ref, computed, watch, getCurrentInstance } from 'vue'
import { themeColorOpts, settingConfig } from '@/config/setting'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import useElement from '@/utils/useElement'
// const version = require('element-plus/package.json').version // element-ui version from node_modules

const colorOptList = ref(themeColorOpts)
const ORIGINAL_THEME = settingConfig.theme
const emit = defineEmits(['on:change'])
const store = useStore()
const ctx = getCurrentInstance()
const { loading } = useElement()

const state = reactive({
  customerColor: '',
  curIndex: 0,
  chalk: '',
  theme: store.state.setting.theme,
})

const defaultTheme = computed(() => {
  return store.state.setting.theme
})

const getThemeCluster = (theme: string) => {
  const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }
  }

  const shadeColor = (color: string, shade: number) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
  }

  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}

const getCSSString = (url: string, variable: string) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        ctx[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        resolve()
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

const updateStyle = (
  style: string,
  oldCluster: string[],
  newCluster: string[]
) => {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

const selectColor = (val, index) => {
  state.curIndex = index
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'theme',
    val,
  })
}

watch(defaultTheme, (value: string) => {
  state.theme = value
})

watch(
  () => state.theme,
  async (value: string) => {
    if (value) {
      const oldValue = state.chalk ? state.theme : ORIGINAL_THEME
      const themeCluster = getThemeCluster(value.replace('#', ''))
      const originalCluster = getThemeCluster(oldValue.replace('#', ''))
      const loadingInstance = loading('theme.loading')
      if (!state.chalk) {
        const url = `https://unpkg.com/element-plus@1.1.0-beta.10/theme-chalk/index.css`
        // const url = `https://cdn.jsdelivr.net/npm/element-plus/dist/index.css`
        await getCSSString(url, 'chalk')
      }
      const getHandler = (variable: string, id: string) => {
        return () => {
          const originalCluster = getThemeCluster(
            ORIGINAL_THEME.replace('#', '')
          )
          const newStyle = updateStyle(
            ctx[variable],
            originalCluster,
            themeCluster
          )
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')
      chalkHandler()

      let styles: HTMLElement[] = [].slice.call(
        document.querySelectorAll('style')
      )
      styles = styles.filter(style => {
        const text = style.innerText
        return (
          new RegExp(/--el-color-primary:#/ + oldValue, 'i').test(text) &&
          !/Chalk Variables/.test(text)
        )
      })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = updateStyle(innerText, originalCluster, themeCluster)
      })

      emit('on:change', value)
      loadingInstance.close()
    }
  },
  // {
  //   immediate: true,
  // }
)
</script>

<template>
  <div class="theme-picker">
    <span
      v-for="(item, index) in colorOptList"
      :key="item"
      :style="'background: ' + item"
      :class="index === state.curIndex ? 'is-active' : ''"
      @click="selectColor(item, index)"
    />
    <el-color-picker v-model="state.theme" @change="selectColor()" />
  </div>
</template>

<style lang="scss" scoped>
.theme-picker {
  display: flex;
  > span {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    &.is-active {
      border: 1px solid #ddd;
      padding: 2px;
    }
  }
}
</style>
