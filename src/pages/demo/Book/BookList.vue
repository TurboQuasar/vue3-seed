<template>
  <q-table
    title=""
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    v-model:pagination="pagination"
    hide-pagination
    separator="none"
    :loading="loading"
    :hide-no-data="loading"
    class="demo-book-list full-height"
  >
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner color="brand" size="3em" :thickness="2" />
      </q-inner-loading>
    </template>
    <template v-slot:no-data>
      <no-data v-if="!loading" />
    </template>
    <template v-slot:top>
      <q-btn
        unelevated
        label="查询"
        color="brand"
        class="
          q-w-60 q-h-30 q-br-15 q-min-h-30 q-fs-14 q-fw-400
          text-white
          q-lh-20
        "
        @click="handleClickConfirmBtn"
      />
    </template>
    <template v-slot:body-cell-operations="props">
      <q-td class="text-center">
        <q-btn label="..." unelevated @click.stop>
          <q-menu>
            <q-list class="demo-book-list__operations-list q-w-90">
              <q-item clickable @click="handleClickEditBtn(props.row)">
                <q-item-section class="text-center q-fs-14 q-fw-400 q-lh-20"
                  >编辑</q-item-section
                >
              </q-item>
              <q-item clickable @click="handleClickDeleteBtn(props.row.id)">
                <q-item-section class="text-center q-fs-14 q-fw-400 q-lh-20"
                  >删除</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
    <template v-slot:bottom>
      <div class="row justify-center q-mt-md full-width">
        <pagination v-model="pagination" @confirm="handleClickConfirmBtn" />
      </div>
    </template>
  </q-table>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePagination } from 'hooks/index';
import Pagination from 'components/Pagination/Index.vue';
import { useQuasar } from 'quasar';
import { BookPage, BookPageReq } from 'models/BookPage';
import { Book } from 'models/Book';
import { cloneDeep } from 'lodash';
import NoData from 'components/NoData/Index.vue';
export default defineComponent({
  name: 'demo-book-list',
  components: {
    NoData,
    Pagination,
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const { filter, loading, pagination, columns, rows, onRequest } =
      usePagination<Book, BookPageReq>({
        columns: [
          {
            name: 'title',
            align: 'center',
            label: '书名',
            field: 'title',
          },
          {
            name: 'author',
            align: 'center',
            label: '作者',
            field: 'author',
          },
          {
            name: 'rating',
            align: 'center',
            label: '评分',
            field: 'rating',
          },
          {
            name: 'operations',
            align: 'center',
            label: '操作',
            field: 'operations',
          },
        ],
        params: {
          page: 1,
          size: 8,
        },
        fetchFromServer: async (params: BookPageReq) => {
          const data = await BookPage.get(params);
          return data;
        },
      });
    const handleClickConfirmBtn = () => {
      onRequest({ pagination: pagination.value });
    };
    const handleClickDeleteBtn = (id: number) => {
      $q.dialog({
        title: '删除',
        message: '确认删除?',
        cancel: true,
        color: 'brand',
      }).onOk(async () => {
        await Book.delete({ id });
        handleClickConfirmBtn();
      });
    };
    const handleClickEditBtn = (book: Book) => {
      emit('edit', cloneDeep(book));
    };
    return {
      filter,
      loading,
      pagination,
      columns,
      rows,
      onRequest,
      handleClickConfirmBtn,
      handleClickDeleteBtn,
      handleClickEditBtn,
    };
  },
});
</script>
<style lang="scss">
@import 'src/css/components/table';
.demo-book-list {
  @include table;
  &__operations-list {
    .q-item {
      .q-item__section {
        &:hover {
          color: $brand !important;
        }
      }
    }
  }
}
</style>
