<template>
  <div :id="renderId" class="no-margin overflow-hidden bg-white"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { uid } from 'quasar';
export default defineComponent({
  name: 'awsc',
  modelValue: {
    type: Object,
    required: true,
  },
  emits: ['success'],
  setup(props, { emit }) {
    const renderId = uid();
    onMounted(() => {
      // 实例化ic对象
      (window as any).AWSC.use('ic', function (state, module) {
        // 初始化
        module.init({
          // 应用类型标识。它和使用场景标识（scene字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
          appkey: 'FFFF0N0000000000A2A1',
          // 使用场景标识。它和应用类型标识（appkey字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
          scene: 'ic_login',
          // 声明智能验证需要渲染的目标元素ID。
          renderTo: renderId,
          // 验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
          success: function (data) {
            emit('success', {
              sessionId: data.sessionId,
              sig: data.sig,
              token: data.token,
              scene: 'ic_login',
            });
          },
          // 验证失败时触发该回调参数
          fail: function (failCode) {
            console.log(failCode);
          },
          // 验证码加载异常时触发该回调参数
          error: function (errorCode) {
            console.log(errorCode);
          },
        });
      });
    });
    return {
      renderId,
    };
  },
});
</script>
