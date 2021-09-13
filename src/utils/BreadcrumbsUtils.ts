import { cloneDeep } from 'lodash';
import { getFirst } from 'utils/CloneUtils';
import { RouteMeta } from 'router/types';

/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 * @param query 参数
 * @param store
 */
export function setBreadcrumbs(matched, query, store) {
  const temp: RouteMeta[] = [];
  for (let i = 0; i < matched.length; i++) {
    temp.push(cloneDeep(matched[i].meta));
  }
  const last = temp.length - 1;
  // 如果有 query 则取第一个参数附加在 title 上
  Object.keys(query).length && (temp[last].title += ':' + getFirst(query));
  store.commit('auth/SET_BREADCRUMBS', temp);
}
