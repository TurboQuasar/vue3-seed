<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-avatar size="24px">
      <img :src="account.headUrl ? account.headUrl : 'icons/avatar.png'" />
    </q-avatar>
    <q-btn flat @click="logout"> 退出 </q-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Account } from 'models/Account';

export default defineComponent({
  name: 'ToolbarItemRight',
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();

    function logout() {
      $store.dispatch('auth/logout');
      void $router.push({ name: 'home' });
    }
    const account = computed<Account>(() => $store.getters['auth/getAccount']);
    return {
      account,
      logout,
    };
  },
});
</script>
