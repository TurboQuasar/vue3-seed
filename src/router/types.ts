import type { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from 'enums/index';

export interface RouteMeta {
  // title
  title: string;
  // subtitle
  subtitle?: string;
  // Whether to ignore permissions
  ignoreAuth?: boolean;
  // role info
  roles?: RoleEnum[];
  // Whether not to cache
  ignoreKeepAlive?: boolean;
  // Is it fixed on tab
  affix?: boolean;
  // icon on tab
  icon?: string;

  frameSrc?: string;

  // current page transition
  transitionName?: string;

  // Whether the route has been dynamically added
  hideBreadcrumb?: boolean;

  // Hide submenu
  hideChildrenInMenu?: boolean;

  // Carrying parameters
  carryParam?: boolean;

  // Used internally to mark single-level menus
  single?: boolean;

  // Currently active menu
  currentActiveMenu?: string;

  // Never show  tab
  hideTab?: boolean;

  // Never show menu
  hideMenu?: boolean;

  isLink?: boolean;

  keepAlive?: boolean;

  // hide in menu
  hideInMenu?: boolean;

  isOpen?: boolean;

  itemLabel?: string;

  showFooter?: boolean;

  hideFooter?: boolean;

  hideHeader?: boolean;
}

export interface AppRouteRecordRaw
  extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: RouteMeta;
  children?: AppRouteRecordRaw[];
  props?: Recordable | boolean;
  fullPath?: string;
}
