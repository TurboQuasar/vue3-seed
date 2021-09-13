<template>
  <div class="lr-comp" ref="refRoot">
    <div class="lr-shadow"></div>
    <div
      class="lr-form lr-form-lr"
      v-show="tabActiveIndex === TabEnum.PHONE_SETTING"
    >
      <q-resize-observer @resize="onResize" />
      <div class="lr-header">登录/注册</div>
      <div class="lr-inputs">
        <q-input
          v-if="tabActiveIndex === TabEnum.PHONE_SETTING"
          borderless
          dense
          v-model="form.account"
          :debounce="500"
          placeholder="请输入手机号"
          class="lr-input"
          readonly
          onfocus="this.removeAttribute('readonly')"
        >
          <template v-slot:prepend>
            <span class="phone-prefix">+86</span>
          </template>
        </q-input>
        <q-input
          v-model="form.captcha"
          borderless
          dense
          placeholder="请输入验证码"
          class="lr-input lr-input__left"
          v-if="actionActiveIndex === ActionEnum.CODE_LOGIN"
          readonly
          onfocus="this.removeAttribute('readonly')"
        >
          <template v-slot:append>
            <captcha-get
              :is-captcha-inputting="isCaptchaInputting"
              :countdown-number="countdownNumber"
              @trigger="handleClickCaptchaGet"
            />
          </template>
        </q-input>
        <q-input
          v-if="actionActiveIndex === ActionEnum.PWD_LOGIN"
          borderless
          dense
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          placeholder="请输入密码"
          class="lr-input lr-input__left"
          readonly
          onfocus="this.removeAttribute('readonly')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'icon-yanjing_yincang' : 'icon-yanjing_xianshi'"
              class="cursor-pointer q-mr-21"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <div
        class="lr-pwd-related"
        v-show="actionActiveIndex === ActionEnum.PWD_LOGIN"
      >
        <div class="lr-pwd-related-remember">
          <q-icon
            :name="`app:LR-checkbox-${form.is_remember_pwd}`"
            @click="handleClickPwdRememberIcon"
            class="q-w-15 q-h-15"
          />
          <span class="lr-pwd-related-remember-text">记住密码</span>
        </div>
        <span @click="handleClickPwdSettingBtn" class="lr-pwd-related-forget"
          >忘记密码？</span
        >
      </div>

      <div class="lr-protocol">
        <div class="lr-protocol-content">
          <q-icon
            :name="`app:LR-checkbox-${form.approve}`"
            @click="handleClickApproveIcon"
          />
          <div>
            <span class="lr-protocol-content-text">同意并阅读</span
            ><span
              class="
                lr-protocol-content-text lr-protocol-content-text--highlight
              "
              @click="handleClickLink(1)"
              >《xxx用户协议》</span
            ><span class="lr-protocol-content-text">和</span
            ><span
              class="
                lr-protocol-content-text lr-protocol-content-text--highlight
              "
              @click="handleClickLink(2)"
              >《xxx隐私信息协议》</span
            >
          </div>
        </div>
        <div class="lr-protocol-tip">请先仔细阅读及勾选相关协议</div>
      </div>
      <div class="lr-action">
        <q-btn
          class="full-width lr-action-btn"
          unelevated
          @click="handleClickLoginOrRegisterBtn"
          >{{ submitName }}</q-btn
        >
      </div>
      <div class="lr-pwd" v-show="hasAccount">
        <q-btn
          class="full-width lr-pwd-btn"
          unelevated
          flat
          @click="handleSwitchActionTo"
          >{{ switchName }}</q-btn
        >
      </div>
      <div
        class="lr-pwd-set-wrap"
        v-show="showPwdSettingTip && hasAccount && !hasPassword"
      >
        <div class="lr-pwd-set-tip">您还没有设置登录密码，无法使用密码登录</div>
        <div class="lr-pwd-set">
          <q-btn
            class="full-width lr-pwd-set-btn"
            unelevated
            flat
            @click="handleClickPwdSettingBtn"
            >设置登录密码</q-btn
          >
        </div>
      </div>
    </div>
    <pwd-setting
      v-if="tabActiveIndex === TabEnum.PWD_SETTING"
      :account="form.account"
      @confirm="handleClickPwdSettingConfirmBtn"
      @return="handleClickPwdSettingReturnBtn"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { AccessExist } from 'models/AccessExist';
import { AccessLogin, AccessLoginReq } from 'models/AccessLogin';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { omit } from 'lodash';
import { useCountdown } from 'hooks/index';
import { PhoneReg } from 'constants/Reg';
import PwdSetting from './PwdSetting.vue';
import Awsc from 'components/AWSC/Index.vue';
import CaptchaGet from 'components/CaptchaGet/Index.vue';
import { openNewWindow } from 'utils/WindowUtils';
enum TabEnum {
  PHONE_SETTING,
  PWD_SETTING,
}
enum ActionEnum {
  CODE_LOGIN,
  PWD_LOGIN,
}
export default defineComponent({
  components: { CaptchaGet, Awsc, PwdSetting },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    const tabActivePre = ref<TabEnum>(TabEnum.PHONE_SETTING);
    const tabActiveIndex = ref<TabEnum>(TabEnum.PHONE_SETTING);
    const actionActiveIndex = ref<ActionEnum>(ActionEnum.CODE_LOGIN);
    const switchName = computed(() => {
      return {
        [ActionEnum.CODE_LOGIN]: '密码登录',
        [ActionEnum.PWD_LOGIN]: '验证码登录',
      }[actionActiveIndex.value];
    });
    const submitName = computed(() => {
      return hasAccount.value === null
        ? '注册/登录'
        : hasAccount.value === true
        ? '登录'
        : '注册';
    });
    const form = reactive<AccessLoginReq & { is_remember_pwd: number }>({
      account: '',
      approve: 1,
      captcha: '',
      password: '',
      platform: 'PC_WEB',
      is_remember_pwd: 0,
    });
    const {
      countdownNumber,
      isCaptchaInputting,
      handleTriggerCountdownBtn,
      resetCountdown,
    } = useCountdown();
    const showPwdSettingTip = ref(false);
    const hasAccount = ref<null | boolean>(null);
    const hasPassword = ref<null | boolean>(null);
    const isPwd = ref(true);
    const handleSwitchTabTo = (tab: TabEnum) => {
      tabActivePre.value = tabActiveIndex.value;
      tabActiveIndex.value = tab;
    };
    const handleClickCaptchaGet = async (awsc) => {
      await AccessLogin.getCaptcha({ account: form.account }, awsc);
      handleTriggerCountdownBtn();
    };

    const handleClickPwdSettingBtn = () => {
      handleSwitchTabTo(TabEnum.PWD_SETTING);
    };

    const handleSwitchActionTo = async () => {
      if (actionActiveIndex.value === ActionEnum.PWD_LOGIN) {
        actionActiveIndex.value = ActionEnum.CODE_LOGIN;
      } else if (actionActiveIndex.value === ActionEnum.CODE_LOGIN) {
        await doAccessExist();
        if (!hasPassword.value) {
          showPwdSettingTip.value = true;
          return;
        }
        actionActiveIndex.value = ActionEnum.PWD_LOGIN;
      }
    };

    const handleClickLoginOrRegisterBtn = async () => {
      let exclusion: string[] = [];
      if (actionActiveIndex.value === ActionEnum.PWD_LOGIN) {
        exclusion.push('captcha');
      } else if (actionActiveIndex.value === ActionEnum.CODE_LOGIN) {
        exclusion.push('password');
      }
      await $store
        .dispatch('auth/login', omit(form, ['is_remember_pwd', ...exclusion]))
        .then(() => {
          if (actionActiveIndex.value === ActionEnum.PWD_LOGIN) {
            if (form.is_remember_pwd) {
              $store.commit('auth/SET_ACCOUNT_PASSWORD', form);
            } else {
              $store.commit('auth/SET_ACCOUNT_PASSWORD', {
                account: form.account,
                password: '',
              });
            }
            $store.commit('auth/SET_IS_REMEMBER_PWD', form.is_remember_pwd);
          } else {
            $store.commit('auth/SET_IS_REMEMBER_PWD', 0);
            $store.commit('auth/SET_ACCOUNT_PASSWORD', {
              account: form.account,
              password: '',
            });
          }
          $router.push('/');
        });
    };

    const handleClickPwdSettingConfirmBtn = () => {
      tabActiveIndex.value = tabActivePre.value;
      showPwdSettingTip.value = false;
    };
    const doAccessExist = async () => {
      await AccessExist.do({ account: form.account }).then(
        ({ hasAccount: _hasAccount, hasPassword: _hasPassword }) => {
          hasPassword.value = _hasPassword;
          hasAccount.value = _hasAccount;
        }
      );
    };
    const handleClickApproveIcon = () => {
      form.approve = Number(!form.approve);
    };
    const handleClickPwdRememberIcon = () => {
      form.is_remember_pwd = Number(!form.is_remember_pwd);
    };

    const handleClickPwdSettingReturnBtn = () => {
      tabActiveIndex.value = tabActivePre.value;
    };
    watch(hasAccount, (value) => {
      if (value === false) {
        actionActiveIndex.value = ActionEnum.CODE_LOGIN;
      }
    });
    watch(hasPassword, (value) => {
      if (value === false) {
        actionActiveIndex.value = ActionEnum.CODE_LOGIN;
      }
    });
    const account = computed(() => form.account);
    watch(
      account,
      (value) => {
        if (PhoneReg.test(value)) {
          doAccessExist();
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      const { account, password } = $store.getters['auth/getAccountPassword'];
      form.account = account;
      form.password = password;
      form.is_remember_pwd = $store.getters['auth/getIsRememberPwd'];
      if (form.account && form.password) {
        actionActiveIndex.value = 1;
      }
    });
    const shadowHeight = ref<number | string>(0);
    const handleClickLink = (id: number) => {
      openNewWindow(window.location.href.replace(/[^\/]*$/, `link/${id}`));
    };
    return {
      form,
      tabActivePre,
      tabActiveIndex,
      actionActiveIndex,
      switchName,
      TabEnum,
      ActionEnum,
      showPwdSettingTip,
      submitName,
      hasAccount,
      hasPassword,
      isPwd,
      doAccessExist,
      handleSwitchActionTo,
      handleSwitchTabTo,
      handleClickPwdSettingBtn,
      handleClickPwdSettingReturnBtn,
      handleClickPwdSettingConfirmBtn,
      isCaptchaInputting,
      countdownNumber,
      handleClickCaptchaGet,
      handleClickLoginOrRegisterBtn,
      handleClickApproveIcon,
      handleClickPwdRememberIcon,
      shadowHeight,
      onResize({ height }) {
        shadowHeight.value = height + 10 + 'px';
      },
      handleClickLink,
    };
  },
});
</script>
<style lang="scss">
$MAX_WIDTH: 280px;
.lr-comp {
  width: 481px;
  position: relative;
  min-height: 500px;
  &:hover {
    .lr-shadow {
      display: block;
    }
  }
  .lr-shadow {
    width: 100%;
    height: v-bind(shadowHeight);
    background: linear-gradient(90deg, #72464a 0%, #215282 100%);
    filter: blur(20px);
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .lr-form {
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background: #ffffff;
    border-radius: 10px;
    padding: 25px 0;
    .lr-header {
      text-align: center;
      color: #808080;
      font-size: 18px;
      font-weight: 600;
    }
    .lr-tab {
      display: flex;
      justify-content: center;
      gap: 20px;
      .lr-tab-title {
        font-weight: 600;
        color: #808080;
        font-size: 14px;
        cursor: pointer;
        &--active {
          color: $brand;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background: $brand;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .lr-inputs {
      margin-top: 25px;
      .lr-input {
        width: $MAX_WIDTH;
        margin: auto;
        &:not(:first-child) {
          margin-top: 20px;
        }
        input {
          text-align: left;
          color: #8a97a5;
          font-size: 14px;
          line-height: 20px;
        }
        .q-field__control {
          background-color: rgba(#429cf8, 0.1);
        }
        .q-field__append {
          margin-right: 10px;
        }
        .q-field__prepend {
          padding-right: 0;
        }
      }
      .lr-input__left {
        input {
          padding-left: 20px;
        }
      }
    }
  }
  .lr-form-lr {
    .lr-action {
      width: $MAX_WIDTH;
      margin: 6px auto 0;
      .lr-action-btn {
        background-color: $brand;
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
        height: 40px;
      }
    }
    .lr-protocol {
      margin-top: 23px;
      .lr-protocol-content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        .lr-protocol-content-text {
          font-size: 12px;
          font-weight: 400;
          color: #8a97a5;
          line-height: 17px;
          &--highlight {
            color: #409df7;
            cursor: pointer;
          }
        }
      }
      .lr-protocol-tip {
        width: $MAX_WIDTH;
        margin: auto;
        font-size: 11px;
        font-weight: 400;
        color: #fe3232;
        line-height: 16px;
        margin-top: 25px;
      }
    }
    .lr-pwd {
      width: $MAX_WIDTH;
      margin: 20px auto 0;
      .lr-pwd-btn {
        color: $brand;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
    .lr-pwd-set-wrap {
      border-top: 1px solid $gray-100;
      padding: 20px 0;
      margin-top: 20px;
      .lr-pwd-set-tip {
        text-align: center;
      }
      .lr-pwd-set-btn {
        color: $brand;
      }
    }
    .lr-pwd-related {
      width: $MAX_WIDTH;
      margin: 10px auto 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 400;
      color: #8a97a5;
      line-height: 17px;
      .lr-pwd-related-remember {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .lr-pwd-related-forget {
        cursor: pointer;
      }
    }
  }
  .lr-form-pwd-setting {
    .lr-phone-send {
      text-align: center;
      margin-top: 20px;
      color: #808080;
    }
    .lr-btns {
      margin: 20px auto 20px;
      width: $MAX_WIDTH;
      .lr-btn {
        flex: 1;
      }
      .lr-btn-return {
        border: 1px solid $gray-200;
      }
      .lr-btn-confirm {
        background-color: $brand;
        color: #ffffff;
      }
      gap: 10px;
    }
  }
  .text-429CF8 {
    color: $brand !important;
  }
  .phone-prefix {
    color: #808080;
    font-size: 14px;
    line-height: 20px;
    padding-left: 20px;
    padding-right: 10px;
  }
}
</style>
