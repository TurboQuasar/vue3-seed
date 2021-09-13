## 结合quasar内置样式和一些sass函数生成的样式
- [quasar/style](https://quasar.dev/style)
- [src/css](./src/css)
```html
<div class="module-page flex flex-center q-pa-10">
  <span class="q-fs-12 q-fw-400 q-lh-17 text-brand">文字</span>
</div>
<style lang="scss">
  .module-page {
    .module-page:hover {
      color: red;
    }
  }
</style>
```
```html
<div class="module flex flex-center q-pa-10">
  <span class="q-fs-12 q-fw-400 q-lh-17 text-brand">文字</span>
</div>
<style lang="scss">
  .module {
    .module:hover {
      color: red;
    }
  }
</style>
```
- 原型图还原主要涉及到布局和字体,以上示例代码div中设置的是布局，span中设置的是字体
- 以上示例代码中module-page和module分别是vue页面和vue组件的wrapper, 方便复写一些特殊样式，这里没有使用scope的原因是
只要我们按照示例规范命名，基本不会出现样式冲突
