<template>
  <div class="tabs-layout">
    <div class="tabs-container">
      <div class="tabs-tabs">
        <router-link
          class="tabs-tab"
          v-for="(item, index) in routes"
          :key="index"
          :to="`${item.path}`"
          :replace="true"
          active-class="tabs-tab--highlight"
          :class="{ 'tabs-tab--highlight': $route.path.includes(item.path) }"
        >
          {{ item.meta.title }}
        </router-link>
      </div>
      <div class="tabs-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AppRouteRecordRaw } from 'router/types';

export default defineComponent({
  name: 'tabs-layout',
  props: {
    routes: {
      type: Array as PropType<AppRouteRecordRaw[]>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.tabs-layout {
  height: 100%;
  .tabs-container {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .tabs-tabs {
      display: flex;
      gap: 50px;
      .tabs-tab {
        text-decoration: none;
        font-size: 14px;
        font-weight: 400;
        color: $gray-400;
        line-height: 20px;
        &--highlight {
          color: $brand;
          position: relative;
          &:before {
            position: absolute;
            content: '';
            width: 100%;
            height: 2px;
            background-color: $brand;
            top: 100%;
            transform: translateY(2px);
            left: 0;
          }
        }
      }
    }
    .tabs-content {
      padding-top: 10px;
      margin-top: 10px;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
