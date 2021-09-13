<template>
  <div class="fit">
    <q-list>
      <base-menu-item
        :my-router="menuList"
        :init-level="0"
        :bg-color="bgColor"
        :duration="300"
        :bg-color-level="1"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import BaseMenuItem from './BaseMenuItem.vue';
import BottomLink from './BottomLink.vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'base-menu',
  components: { BaseMenuItem, BottomLink },
  setup() {
    const $store = useStore();
    return {
      menuList: $store.getters['auth/getRoutes'][0].children,
      bgColor: 'bg-white',
    };
  },
});
</script>
