<template>
  <div class="login-register">
    <div
      class="
        full-width full-height
        row
        flex
        justify-center
        items-center
        no-wrap
        q-gap-211
      "
    >
      <q-icon name="app:login-register" class="icon-login-register" />
      <l-r />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LR from './LR.vue';

export default defineComponent({
  components: { LR },
  name: 'login-register',
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.login-register {
  background: linear-gradient(180deg, #2d84ff 0%, #5c37ff 100%);
  min-width: $home-container-width;
  .icon-login-register {
    width: 547px;
    height: 592px;
  }
}
</style>
