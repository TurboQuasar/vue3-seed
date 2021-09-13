<!--
   动态菜单 item
   myRouter ： 菜单列表
   initLevel ： 菜单初始化缩进等级
   basePath : 上级菜单
-->
<template>
  <div class="home-menu-item">
    <template v-for="item in newRouter">
      <template v-if="item.meta.hideInMenu !== true">
        <!-- 没有可显示孩子或者隐藏子菜单 -->
        <q-item
          v-if="!item.children || item.meta.hideChildrenInMenu"
          clickable
          v-ripple
          :key="item.name"
          class="q-ml-md"
          :inset-level="initLevel"
          :style="isWeChart ? ' line-height: normal' : ''"
          active-class="base-item-active"
          :to="handleLink(basePath, item.path)"
          @click="externalLink(basePath, item.path)"
        >
          <q-item-section>
            {{ item.meta.title }}
          </q-item-section>
        </q-item>
        <q-btn
          v-else
          flat
          :key="item.name"
          class="q-pa-none text-weight-regular q-ml-md"
        >
          <q-menu
            style="min-width: 140px; transform: translate3d(-10px, 12px, 0)"
            @update:model-value="(value) => aa(item, value)"
          >
            <q-list>
              <q-item
                clickable
                v-ripple
                :inset-level="initLevel"
                :style="isWeChart ? ' line-height: normal' : ''"
                active-class="sub-item-active"
                class="text-center"
                :to="handleLink(basePath + '/' + item.path, i.path)"
                @click="externalLink(basePath + '/' + item.path, i.path)"
                v-for="i in item.children"
                :key="i.name"
              >
                <q-item-section>
                  {{ i.meta.title }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-item
            v-ripple
            :active="$route.path.startsWith(basePath + '/' + item.path)"
            :inset-level="initLevel"
            :style="isWeChart ? ' line-height: normal' : ''"
            active-class="base-item-active"
          >
            <q-item-section
              :no-wrap="true"
              class="icon-arrow"
              :class="{ 'icon-arrow--reverse': item.meta.isOpen }"
            >
              {{ item.meta.title }}
            </q-item-section>
          </q-item>
        </q-btn>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  inject,
} from 'vue';
import { useRoute } from 'vue-router';
import { AppRouteRecordRaw } from 'router/types';

export default defineComponent({
  name: 'homeMenuItem',
  props: {
    myRouter: {
      type: Array as PropType<AppRouteRecordRaw[]>,
      required: true,
    },
    initLevel: Number,
    duration: Number,
    basePath: String,
  },
  setup(props, context) {
    const isDark = inject('is-dark');
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
      isWeChart,
      newRouter: reactive(props.myRouter),
      aa: function (item, value) {
        item.meta.isOpen = value;
      },
    };
  },
});
</script>
<style lang="scss">
/* item 颜色 */
$ITEM_COLOR: $gray-400;

/* item 激活时颜色 */
$ACTIVE_COLOR: $brand;
$ACTIVE_BACKGROUND: #ffffff;
.home-menu-item {
  .q-item__section {
    text-align: center;
  }
  .base-item-class {
    color: $ITEM_COLOR !important;
    font-size: 14px !important;
  }
  /* item 被激活时父菜单的样式 */
  .baseRootItemActive {
    color: $ACTIVE_COLOR !important;
  }
  /* item 被激活时的样式 */
  .base-item-active {
    color: $ACTIVE_COLOR !important;
    transition: all 0.618s;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: $ACTIVE_COLOR !important;
      top: 100%;
      left: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.sub-item-active {
  color: $brand !important;
  background: #ffffff;
}
.icon-arrow {
  position: relative;
  &:after {
    position: absolute;
    content: '';
    width: 7px;
    height: 7px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: translateX(calc(100% + 6px)) translateY(100%) rotate(135deg);
    right: 0;
    top: 4px;
    transition: all 1s ease 0s;
  }
  &--reverse {
    &:after {
      transform: translateX(calc(100% + 6px)) translateY(150%) rotate(-45deg);
    }
  }
}
</style>
