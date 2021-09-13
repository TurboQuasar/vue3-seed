/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const path = require('path');
const timeStamp = +new Date();
console.log('DOT_ENV=' + process.env.DOT_ENV);
module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
      'permission',
      'config',
      'router',
      'mock',
      'i18n',
      'version-notify',
      'promise-cancel',
    ],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['main.scss', 'transition.scss', 'iconfont/iconfont.css'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      publicPath: process.env.DOT_ENV === 'production' ? '' : 'vue3-seed',
      env: Object.assign(
        require('dotenv').config({}).parsed,
        require('dotenv').config({
          path: `.${process.env.DOT_ENV}.env`,
        }).parsed
      ),
      distDir: 'dist',
      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://v2.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {
        //
      },
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add your own alias like this
          router: path.resolve(__dirname, './src/router'),
          utils: path.resolve(__dirname, './src/utils'),
          store: path.resolve(__dirname, './src/store'),
          boot: path.resolve(__dirname, './src/boot'),
          src: path.resolve(__dirname, './src'),
          css: path.resolve(__dirname, './src/css'),
          mock: path.resolve(__dirname, './src/mock'),
          models: path.resolve(__dirname, './src/models'),
          enums: path.resolve(__dirname, './src/enums'),
          classes: path.resolve(__dirname, './src/classes'),
          i18n: path.resolve(__dirname, './src/i18n'),
          hooks: path.resolve(__dirname, './src/hooks'),
          plugins: path.resolve(__dirname, './src/plugins'),
          constants: path.resolve(__dirname, './src/constants'),
          layouts: path.resolve(__dirname, './src/layouts'),
          pages: path.resolve(__dirname, './src/pages'),
          api: path.resolve(__dirname, './src/api'),
          components: path.resolve(__dirname, './src/components'),
        };
      },
    },
    configureWebpack: (config) => {
      // 生产环境配置
      if (process.env.NODE_ENV === 'production') {
        // 消除 console 输出信息
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

        // Gzip 压缩
        const CompressionPlugin = require('compression-webpack-plugin');
        config.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip', //
            test: /\.(js|css|woff|woff2|svg)$/, // 哪些文件会被压缩
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除压缩前的文件，如果浏览器不支持 Gzip ,则会加载源文件
            minRatio: 0.8, // 压缩比大于 0.8 的文件将不会被压缩
          })
        );

        // 将 js 文件夹添加时间戳，这样浏览器不会加载上个版本缓存的代码
        config.output.filename = `js/[name].${timeStamp}.js`;
        config.output.chunkFilename = `js/[name].${timeStamp}.js`;
      } else {
        // 开发环境配置
      }
    },
    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8081,
      open: false, // opens browser window automatically
      proxy: {
        '/gio/v1': {
          target: 'https://www.growingio.com/v1',
          pathRewrite: { '^/gio/v1': '' },
        },
        '/gio/v2': {
          target: 'https://www.growingio.com/v2',
          pathRewrite: { '^/gio/v2': '' },
        },
        // '/rest': {
        //   target: 'http://172.16.100.33:8082/rest',
        //   pathRewrite: { '^/rest': '' },
        // },
        // '/rest': {
        //   target: 'http://120.26.174.69/rest',
        //   pathRewrite: { '^/rest': '' },
        // },
      },
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},
      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',
      iconSet: 'material-icons', // Quasar icon set
      lang: 'zh-CN', // Quasar language pack

      // For special cases outside of where the auto-import stategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: ['QSpinnerGrid'],

      directives: ['ClosePopup', 'Ripple'],

      // Quasar plugins
      plugins: [
        'LoadingBar',
        'Dialog',
        'Notify',
        'Cookies',
        'QAjaxBar',
        'TouchPan',
        'QMenu',
        'AppFullscreen',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver(/* chain */) {
        //
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW(/* chain */) {
        //
      },

      manifest: {
        name: 'Quasar App',
        short_name: 'Quasar App',
        description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar2',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    },
  };
});
