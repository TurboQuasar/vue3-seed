<template>
  <template v-if="type === 'Text'">
    <span class="captcha-get captcha-get--countdown" v-if="isCaptchaInputting">
      {{ countdownNumber }}
    </span>
    <span class="captcha-get" v-else @click="handleClickCaptchaGet">
      获取验证码
    </span>
  </template>
  <template v-if="type === 'Button'">
    <q-btn unelevated v-if="isCaptchaInputting">{{ countdownNumber }}</q-btn>
    <q-btn unelevated v-else @click="handleClickCaptchaGet">获取验证码</q-btn>
  </template>
  <q-dialog v-model="showModel">
    <awsc @success="handleSuccess" />
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Awsc from 'components/AWSC/Index.vue';

export default defineComponent({
  name: 'captcha-get',
  components: { Awsc },
  props: {
    isCaptchaInputting: {
      type: Boolean,
      required: true,
    },
    countdownNumber: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<'Button' | 'Text'>,
      default: 'Text',
    },
  },
  emits: ['trigger'],
  setup(props, { emit }) {
    const awsc = ref({});
    const handleClickCaptchaGet = () => {
      showModel.value = true;
    };
    const showModel = ref(false);
    const handleSuccess = (val) => {
      showModel.value = false;
      emit('trigger', val);
    };
    return {
      awsc,
      handleClickCaptchaGet,
      showModel,
      handleSuccess,
    };
  },
});
</script>
<style lang="scss">
.captcha-get {
  color: #469bfa;
  font-size: 14px;
  line-height: 20px;
  padding: 0 20px;
  cursor: pointer;
  &--countdown {
    cursor: default;
  }
}
</style>
