export const API = {
  LOGIN: '/login',
  ACCESS_EXIST: '/access/exist', //查询账号是否存在，是否有密码
  ACCESS_LOGIN_CAPTCHA: '/access/login/captcha', //注册登录验证码
  ACCESS_LOGIN: '/access/login', //注册登录
  ACCOUNT_LOGOUT: '/account/logout', //退出登录
  ACCESS_PASSWORD_CAPTCHA: '/access/password/captcha', //设置密码-验证码
  ACCESS_PASSWORD: '/access/password', //设置密码-验证码
  ACCOUNT_BIND_CAPTCHA: '/account/bind/captcha', //绑定账号验证码
  ACCOUNT_BIND: '/account/bind', //绑定账号
  ACCOUNT_REPLACE_CAPTCHA: '/account/replace/captcha', // 换绑验证码-验证原账号
  ACCOUNT_REPLACE: '/account/replace', //换绑-验证原账号
  ACCOUNT_REPLACE_BIND_CAPTCHA: '/account/replace/bind/captcha', //换绑验证码-验证新账号
  ACCOUNT_REPLACE_BIND: '/account/replace/bind', // 换绑-验证新账号
  USER: '/user', //  获取用户信息|更新个人信息
  USER_PASSWORD: '/user/password', //设置密码｜原密码修改密码
  USER_PASSWORD_CAPTCHA: '/user/password/captcha', //验证码修改密码-验证码|验证码修改密码
  BOOK: '/book',
  ARTICLE: '/article',
};
