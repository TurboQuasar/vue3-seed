<template>
  <div v-if="loading" class="fit relative-position q-min-h-100">
    <q-inner-loading showing>
      <q-spinner color="brand" size="3em" :thickness="2" />
    </q-inner-loading>
  </div>
  <div v-else-if="fail" class="fit relative-position q-min-h-100">
    <q-inner-loading showing>
      <slot name="fail">
        <q-btn
          color="negative"
          label="请求错误,点击重新加载"
          @click="handleClickBtn"
        />
      </slot>
    </q-inner-loading>
  </div>
  <slot v-else />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'loading-container',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    fail: {
      type: Boolean,
      required: true,
    },
    immediate: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['request'],
  setup(props, { emit }) {
    const handleClickBtn = () => {
      emit('request');
    };
    props.immediate && emit('request');
    return {
      handleClickBtn,
    };
  },
});
</script>
