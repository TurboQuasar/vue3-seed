<!--
   动态菜单 item 递归实现
   myRouter ： 菜单列表
   initLevel ： 菜单初始化缩进等级
   bgColorLevel ：菜单背景色
   basePath : 上级菜单
-->
<template>
  <div class="base-menu-item">
    <template v-for="(item, index) in myRouter">
      <template v-if="item.meta.hideInMenu !== true">
        <q-item-label
          v-if="item.meta.itemLabel"
          header
          class="text-weight-bold text-uppercase"
          :key="item.meta.itemLabel"
        >
          {{ item.meta.itemLabel }}
        </q-item-label>

        <!-- 没有可显示孩子或者隐藏子菜单 -->
        <q-item
          v-if="!item.children || item.meta.hideChildrenInMenu"
          clickable
          v-ripple
          :key="index"
          :exact="item.path === '/'"
          :inset-level="initLevel"
          :style="isWeChart ? ' line-height: normal' : ''"
          active-class="base-item-active"
          :class="[
            { 'base-item-active': $route.path.includes(item.path) },
            baseItemClass,
          ]"
          :to="handleLink(basePath, item.path)"
          @click="externalLink(basePath, item.path)"
        >
          <!--          隐藏图标-->
          <!--          <q-item-section avatar>-->
          <!--            <q-icon :name="item.meta.icon" v-if="item.meta.icon" />-->
          <!--          </q-item-section>-->
          <q-item-section>
            {{ item.meta.title }}
          </q-item-section>
        </q-item>

        <!-- 有孩子 -->
        <q-expansion-item
          v-else
          :duration="duration"
          :class="baseItemClassWithNoChildren(item.path)"
          :default-opened="item.meta.isOpen"
          :header-inset-level="initLevel"
          :key="item.path"
          :icon="item.meta.icon"
          :label="item.meta.title"
          :style="isWeChart ? ' line-height: normal' : ''"
        >
          <!-- 菜单项缩进 + 0.2 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
          <base-menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.2"
            :bg-color-level="bgColorLevel + 1"
            :bg-color="bgColor"
            :base-path="
              basePath === undefined ? item.path : basePath + '/' + item.path
            "
          />
        </q-expansion-item>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { AppRouteRecordRaw } from 'router/types';

export default defineComponent({
  name: 'base-menu-item',
  props: {
    myRouter: {
      type: Array as PropType<AppRouteRecordRaw[]>,
      required: true,
    },
    initLevel: Number,
    bgColor: String,
    bgColorLevel: Number,
    duration: Number,
    basePath: String,
  },
  setup(props, context) {
    /**
     * 处理内部链接
     * @param basePath
     * @param itemPath
     */
    function handleLink(basePath, itemPath) {
      const link =
        basePath === undefined ? itemPath : basePath + '/' + itemPath;
      if (link.indexOf('http') !== -1) {
        return '#';
      }
      return link;
    }

    /**
     * 处理外部链接
     * @param basePath
     * @param itemPath
     * @returns {boolean}
     */
    function externalLink(basePath, itemPath) {
      const link =
        basePath === undefined ? itemPath : basePath + '/' + itemPath;
      const i = link.indexOf('http');
      if (i !== -1) {
        const a = document.createElement('a');
        a.setAttribute('href', link.slice(i));
        a.setAttribute('target', '_blank');
        a.click();
        return false;
      }
    }
    const $route = useRoute();
    const baseItemClass =
      props.bgColor + '-' + props.bgColorLevel + ' base-item-class';
    /**
     * 处理子菜单被激活的样式，同时修改父菜单样式
     */
    const baseItemClassWithNoChildren = computed(() => {
      return (path) => {
        return $route.fullPath.startsWith(path)
          ? 'baseRootItemActive base-item-class' + baseItemClass
          : baseItemClass;
      };
    });
    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     * @returns {boolean}
     */
    const isWeChart = computed(() => {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    });
    return {
      handleLink,
      externalLink,
      baseItemClassWithNoChildren,
      isWeChart,
      baseItemClass,
    };
  },
});
</script>
<style lang="scss">
/* item 颜色 */
$ITEM_COLOR: #2c3e50;

/* item 激活时颜色 */
$ACTIVE_COLOR: $brand;
$ACTIVE_BACKGROUND: #ffffff;
.base-menu-item {
  .q-item__section {
    text-align: center;
  }
  .base-item-class {
    color: $ITEM_COLOR !important;
  }
  /* item 被激活时父菜单的样式 */
  .baseRootItemActive {
    color: $ACTIVE_COLOR !important;
  }
  /* item 被激活时的样式 */
  .base-item-active {
    color: $ACTIVE_COLOR !important;
    background: $ACTIVE_BACKGROUND;
    transition: all 0.618s;
    &:after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%;
      background: $ACTIVE_COLOR !important;
      top: -0.5px;
      left: 0;
    }
  }
}
</style>
