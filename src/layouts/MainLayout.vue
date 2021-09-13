<template>
  <q-layout :view="viewStyle" class="full-height main-layout">
    <!-- HEADER START -->
    <q-header class="bg-white text-grey-8 row align-center">
      <!-- 状态栏 -->
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          :icon="leftDrawerOpen === true ? 'menu_open' : 'menu'"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!$route.meta.hideMenu"
        />
        <!-- toolbar - title -->
        <toolbar-title />
        <q-space />
        <!-- 右侧元素 -->
        <toolbar-item-right />
      </q-toolbar>
    </q-header>
    <!-- HEADER END -->

    <!-- slideBar START -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="160"
      :mini="miniState"
      :breakpoint="0"
      @mouseover="miniState = false"
      v-if="!$route.meta.hideMenu"
    >
      <base-menu />
    </q-drawer>
    <!-- slideBar END -->

    <!-- container START -->
    <!--    why not  keepAlive && suspense ?-->
    <!--    https://github.com/vuejs/vue-next/issues/3652-->
    <q-page-container
      style="height: 100vh; background-color: #f7f7f7; min-width: 1440px"
    >
      <router-view v-slot="{ Component }">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
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
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'MainLayout',
  components: {
    ToolbarItemRight,
    ToolbarTitle,
    BaseMenu,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();
    return {
      viewStyle: config.$SideBar,
      Max_keepAlive: config.$Max_KeepAlive,
      keepAliveList: computed(() => $store.getters['auth/getKeepAliveList']),
      key: computed(() => $route.fullPath),
      leftDrawerOpen: ref(true),
      miniState: ref(false),
    };
  },
};
</script>
<style lang="scss">
.main-layout {
  .q-drawer {
    box-shadow: 0 2px 6px 0 #f2f8ff;
    background-color: #ffffff;
  }
  .q-header {
    height: 60px;
    box-shadow: 0 2px 6px 0 #f2f8ff;
  }
}
</style>
