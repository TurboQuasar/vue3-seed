<template>
  <q-layout :view="viewStyle" class="full-height q-min-w-1440">
    <!--    why not  keepAlive && suspense ?-->
    <!--    https://github.com/vuejs/vue-next/issues/3652-->
    <q-page-container style="height: 100vh">
      <div class="flex column no-wrap full-height">
        <router-view v-slot="{ Component }">
          <keep-alive :max="Max_keepAlive" :include="keepAliveList">
            <component
              :is="Component"
              :key="$route.fullPath"
              style="flex: 1; overflow: auto"
            />
          </keep-alive>
        </router-view>
      </div>
    </q-page-container>
    <!-- container END -->
  </q-layout>
</template>

<script lang="ts">
import BaseMenu from 'components/Menu/BaseMenu.vue';
import ToolbarTitle from 'components/Toolbar/ToolbarTitle.vue';
import ToolbarItemRight from 'components/Toolbar/ToolbarItemRight.vue';
import { config } from 'boot/config';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HomeMenu from 'components/Menu/HomeMenu.vue';
export default {
  name: 'MainLayout',
  components: {
    HomeMenu,
    ToolbarItemRight,
    ToolbarTitle,
    BaseMenu,
  },
  setup() {
    const $store = useStore();
    return {
      viewStyle: config.$SideBar,
      Max_keepAlive: config.$Max_KeepAlive,
      keepAliveList: computed(() => $store.getters['auth/getKeepAliveList']),
    };
  },
};
</script>
