<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs">
    <q-icon name="app:logo" class="q-w-40 q-h-40" />
  </q-btn>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ToolbarTitle',
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {};
  },
});
</script>
