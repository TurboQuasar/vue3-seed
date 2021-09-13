<template>
  <div class="single-layout">
    <div class="single-container">
      <div class="flex items-center justify-between">
        <div class="q-fs-14 q-fw-600 q-lh-20 text-gray-400">
          {{ $route.meta.title }}
        </div>
        <div>
          <slot name="right" />
        </div>
      </div>
      <div class="q-mt-10 flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'single-layout',
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.single-layout {
  height: 100%;
  .single-container {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
