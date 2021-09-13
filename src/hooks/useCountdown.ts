import { onUnmounted, ref } from 'vue';

/**
 * 验证码倒计时
 * @param number
 */
export function useCountdown(number = 60) {
  let countdownId: NodeJS.Timeout | null = null;
  const isCaptchaInputting = ref(false);
  const countdownNumber = ref(number);
  const handleTriggerCountdownBtn = () => {
    resetCountdown();
    isCaptchaInputting.value = true;
    countdownId = setInterval(() => {
      countdownNumber.value--;
      if (countdownNumber.value === 0) {
        resetCountdown();
      }
    }, 1000);
  };
  const resetCountdown = () => {
    countdownId && clearInterval(countdownId);
    countdownNumber.value = 60;
    isCaptchaInputting.value = false;
  };
  onUnmounted(() => {
    resetCountdown();
  });
  return {
    countdownNumber,
    isCaptchaInputting,
    handleTriggerCountdownBtn,
    resetCountdown,
  };
}
