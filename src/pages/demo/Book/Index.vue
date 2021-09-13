<template>
  <single-layout>
    <demo-book-list ref="listRef" @edit="handleClickCreateBtn" />
    <template v-slot:right>
      <q-btn
        unelevated
        label="创建"
        color="brand"
        class="q-min-w-110 q-min-h-30 q-fs-14 q-fw-400 q-lh-20 q-br-15"
        @click="(e) => handleClickCreateBtn()"
      />
    </template>
    <q-dialog v-model="showEditDialog">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">新增/编辑</div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              label="书名"
              v-model="form.title"
              color="brand"
              placeholder="请输入图书名称"
            />
            <q-input
              label="作者"
              v-model="form.author"
              color="brand"
              placeholder="请输入作者名称"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            label="取消"
            @click="showEditDialog = false"
            text-color="brand"
          />
          <q-btn
            label="确认"
            color="brand"
            @click="handleClickEditConfirmBtn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </single-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import SingleLayout from 'layouts/SingleLayout.vue';
import DemoBookList from './BookList.vue';
import { Book, BookPutReq } from 'models/Book';

export default defineComponent({
  name: 'demo-book',
  components: { DemoBookList, SingleLayout },
  setup() {
    const listRef = ref();
    const showEditDialog = ref(false);
    const baseForm = (): BookPutReq => {
      return {
        id: 0,
        title: '',
        author: '',
      };
    };
    const form = ref<BookPutReq>(baseForm());
    const handleClickCreateBtn = (val) => {
      form.value = val ? val : baseForm();
      showEditDialog.value = true;
    };
    const handleClickEditConfirmBtn = async () => {
      if (form.value.id) {
        await Book.put(form.value);
      } else {
        await Book.post(form.value);
      }
      showEditDialog.value = false;
      listRef.value.handleClickConfirmBtn();
    };
    return {
      showEditDialog,
      form,
      handleClickCreateBtn,
      handleClickEditConfirmBtn,
      listRef,
    };
  },
});
</script>
