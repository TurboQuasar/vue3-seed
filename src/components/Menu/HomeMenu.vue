<template>
  <q-list class="row align-center full-height">
    <home-menu-item
      :my-router="HomeRoute.children"
      :init-level="0"
      :duration="300"
      :bg-color-level="1"
      :base-path="HomeRoute.path"
      class="row align-center full-height"
    />
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeMenuItem from 'components/Menu/HomeMenuItem.vue';
import { HomeRoute } from 'router/modules/HomeRoute';
export default defineComponent({
  name: 'homeMenu',
  components: { HomeMenuItem },
  setup() {
    return {
      HomeRoute,
    };
  },
});
</script>
