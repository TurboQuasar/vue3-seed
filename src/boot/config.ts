import { boot } from 'quasar/wrappers';
import { setCssVar } from 'quasar';
import { i18n } from 'boot/i18n';
export const config = {
  // 项目名称
  $projectName: '管理系统',
  // 根路由
  $PUBLIC_PATH: process.env.VUE_ROUTER_BASE,
  $DOT_ENV: process.env.DOT_ENV,
  // 浏览器 title
  $title: ' | xxx',
  // 侧边栏风格
  $SideBar: 'hHh lpR fFf',
  // 请求超时时间
  $timeOut: 30000,
  // 组件最大缓存数
  $Max_KeepAlive: 10,
  $t: i18n.global.t,
  $tc: i18n.global.tc,
};
const mergerConfig = (app) => {
  Object.assign(app.config.globalProperties, config);
};
export default boot(({ app }) => {
  // something to do
  mergerConfig(app);
  // 捕获未处理的Promise错误
  window.addEventListener('unhandledrejection', (event) => {
    // 禁止上报
    event.preventDefault();
  });
  setCssVar('primary', '#6299FD');
});
