<template>
  <div class="lr-form lr-form-pwd-setting" ref="refRoot">
    <div class="lr-header"></div>
    <div class="lr-tab">
      <div class="lr-tab-title lr-tab-title--active">设置密码</div>
    </div>
    <div class="lr-phone-send hidden">
      {{ `验证码已发送至+86${protectPhone(account)}` }}
    </div>
    <div class="lr-inputs">
      <q-input
        borderless
        dense
        v-model="form.captcha"
        placeholder="请输入验证码"
        class="lr-input lr-input__left"
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
        borderless
        dense
        v-model="form.newPassword"
        :type="isPwd ? 'password' : 'text'"
        placeholder="请设置新密码（6-30个字符）"
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
    <div class="lr-btns flex">
      <q-btn
        class="lr-btn lr-btn-return"
        unelevated
        @click="handleClickPwdSettingReturnBtn"
        >返回</q-btn
      >
      <q-btn
        class="lr-btn lr-btn-confirm"
        unelevated
        @click="handleClickPwdSettingConfirmBtn"
        >确定</q-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useCountdown } from 'hooks/index';
import { ProtectPhoneReg } from 'constants/Reg';
import { forbidFormFill } from 'utils/DomUtils';
import { AccessPassword, AccountPasswordReq } from 'models/AccessPassword';
import Awsc from 'components/AWSC/Index.vue';
import CaptchaGet from 'components/CaptchaGet/Index.vue';

export default defineComponent({
  name: 'pwd-setting',
  components: { CaptchaGet, Awsc },
  emits: ['return', 'confirm'],
  props: {
    account: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = reactive<AccountPasswordReq>({
      account: props.account,
      captcha: '',
      newPassword: '',
    });
    const isPwd = ref(true);
    const {
      countdownNumber,
      isCaptchaInputting,
      handleTriggerCountdownBtn,
      resetCountdown,
    } = useCountdown();
    const protectPhone = (phone: string) => {
      return phone.replace(ProtectPhoneReg, '$1****$2');
    };
    const handleClickPwdSettingReturnBtn = () => {
      emit('return');
    };
    const handleClickPwdSettingConfirmBtn = async () => {
      await AccessPassword.do(form);
      emit('confirm');
    };
    const handleClickCaptchaGet = async (awsc) => {
      await AccessPassword.getCaptcha(
        {
          account: props.account,
        },
        awsc
      );
      handleTriggerCountdownBtn();
    };
    return {
      form,
      isPwd,
      countdownNumber,
      isCaptchaInputting,
      handleTriggerCountdownBtn,
      resetCountdown,
      protectPhone,
      handleClickPwdSettingReturnBtn,
      handleClickPwdSettingConfirmBtn,
      handleClickCaptchaGet,
    };
  },
});
</script>
