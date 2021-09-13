<template>
  <div class="fit main-card flex column items-center justify-center">
    <div>
      <q-icon name="app:main-no-data" class="q-w-182 q-h-105" />
      <div class="text-808080 q-lh-20 q-fw-400 q-fs-14 text-center q-mt-25">
        {{ desc }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    desc: {
      type: String,
      default: '没有数据',
    },
  },
  name: 'no-data',
});
</script>
