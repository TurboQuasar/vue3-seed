<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { config } from 'boot/config';
const files = (require as any).context('../public/icons');
// 获取文件名（不含后缀）
export function getFilename(params: string) {
  return params.replace(/(.*\/)*([^.]+).*/gi, '$2');
}
// 获取完整文件名（含后缀）
export function getFullFilename(params: string) {
  return params.replace(/(.*\/)*([^.]+.*)/gi, '$2');
}
const myIcons: { [key: string]: string } = {};
files.keys().forEach((key) => {
  const fileName = getFilename(key);
  const fullFileName = getFullFilename(key);
  myIcons[
    `app:${fileName}`
  ] = `img:${config.$PUBLIC_PATH}icons/${fullFileName}`;
});
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    //添加iconfont图标映射
    $q.iconMapFn = (iconName) => {
      if (iconName.startsWith('icon')) {
        // we strip the "app:" part
        return {
          cls: 'icon iconfont ' + iconName,
        };
      }
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
  },
});
</script>
