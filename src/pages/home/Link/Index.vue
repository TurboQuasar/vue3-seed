<template>
  <div class="q-w-1200 q-mx-auto q-py-20">
    <loading-container
      :fail="fail"
      :loading="loading"
      @request="getContent"
      immediate
    >
      <div v-html="content.content"></div>
    </loading-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRequest } from 'hooks/useRequest';
import { ArticleView } from 'models/ArticleView';
import LoadingContainer from 'components/LoadingContainer/Index.vue';

export default defineComponent({
  name: 'link-page',
  components: { LoadingContainer },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {
      data: content,
      fail,
      loading,
      req,
    } = useRequest<typeof ArticleView.get>(ArticleView.get);
    const getContent = () => req(props.id);
    return {
      content,
      getContent,
      fail,
      loading,
    };
  },
});
</script>
