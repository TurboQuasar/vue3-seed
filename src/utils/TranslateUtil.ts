import { i18n } from 'boot/i18n';
// title国际化
export function translateTitle(title: string) {
  const newArr = title.split(':');
  newArr[0] = i18n.global.tc(newArr[0]);
  return newArr.join('');
}
