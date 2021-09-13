import { AppRouteRecordRaw, RouteMeta } from 'router/types';
import { User } from 'models/User';
export interface IAuthState {
  token: string;
  role: string;
  lang: string;
  routes: AppRouteRecordRaw[];
  tagView: ITagView[];
  breadcrumbs: RouteMeta[];
  keepAliveList: string[];
  account: string;
  password: string;
  is_remember_pwd: number;
  user: User | null;
}
export interface ITagView {
  fullPath: string;
  name: string;
  title: string;
  icon: string;
  keepAlive: string;
  query?: string;
}
function state(): IAuthState {
  return {
    token: '',
    role: '',
    lang: 'zh-CN',
    routes: [],
    tagView: [],
    breadcrumbs: [],
    keepAliveList: [],
    account: '',
    password: '',
    is_remember_pwd: 0,
    user: null,
  };
}

export default state;
