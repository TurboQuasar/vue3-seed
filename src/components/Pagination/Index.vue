<template>
  <div class="pagination flex items-center" v-if="maxTotalPage > 1">
    <q-btn-group unelevated outline stretch>
      <q-btn
        label="首页"
        outline
        @click="handleClickPageBtn(1)"
        :class="{ 'q-btn--highlight': pagination.page === 1 }"
      />
      <q-btn
        label="<"
        outline
        :disable="pagination.page === 1"
        @click="handleClickPageBtn(pagination.page - 1)"
      />
      <template v-if="totalPage <= maxPages">
        <q-btn
          :label="n"
          outline
          :class="{ 'q-btn--highlight': pagination.page === n }"
          v-for="n in totalPage"
          :key="n"
          @click="handleClickPageBtn(n)"
        />
      </template>
      <template v-else>
        <q-btn
          label="1"
          outline
          :class="{ 'q-btn--highlight': pagination.page === 1 }"
          :key="1"
          @click="handleClickPageBtn(1)"
        />
        <template v-if="pagination.page <= maxPages">
          <q-btn
            :label="n + 1"
            outline
            :class="{ 'q-btn--highlight': pagination.page === n + 1 }"
            v-for="n in maxPages - 1"
            :key="n + 1"
            @click="handleClickPageBtn(n + 1)"
          />
          <q-btn
            label="..."
            outline
            :key="maxPages + 1"
            @click="handleClickPageBtn(maxPages + 1)"
          />
        </template>
        <template v-else-if="totalPage - pagination.page < maxPages">
          <q-btn
            label="..."
            outline
            :key="totalPage - maxPages"
            @click="handleClickPageBtn(totalPage - maxPages)"
          />
          <q-btn
            :label="totalPage - n"
            outline
            :class="{ 'q-btn--highlight': pagination.page === totalPage - n }"
            v-for="n in [...new Array(maxPages - 1)]
              .map((value, index, array) => index + 1)
              .reverse()"
            :key="totalPage - n"
            @click="handleClickPageBtn(totalPage - n)"
          />
        </template>
        <template v-else>
          <q-btn
            label="..."
            outline
            :key="pagination.page - 1"
            @click="handleClickPageBtn(pagination.page - 1)"
          />
          <q-btn
            :label="pagination.page"
            outline
            :key="pagination.page"
            @click="handleClickPageBtn(pagination.page)"
          />
          <q-btn
            label="..."
            outline
            :key="pagination.page + 1"
            @click="handleClickPageBtn(pagination.page + 1)"
          />
        </template>
        <q-btn
          :label="totalPage"
          outline
          :key="totalPage"
          :class="{ 'q-btn--highlight': pagination.page === totalPage }"
          @click="handleClickPageBtn(totalPage)"
        />
      </template>
      <q-btn
        label=">"
        outline
        :disable="pagination.page === totalPage"
        @click="handleClickPageBtn(pagination.page + 1)"
      />
      <q-btn
        label="尾页"
        outline
        @click="handleClickPageBtn(totalPage)"
        :class="{ 'q-btn--highlight': pagination.page === totalPage }"
      />
    </q-btn-group>
    <q-btn :label="`共${totalPage}页`" flat />
    <q-select
      color="brand"
      outlined
      v-model="pagination.rowsPerPage"
      :options="options"
      :option-label="(val) => `${val}条/页`"
      label=""
      class="inline"
      dense
    />
    <q-btn label="到" flat />
    <q-input class="inline" outlined type="number" v-model="page" />
    <q-btn label="页" flat />
    <q-btn
      label="确定"
      color="brand"
      class="confirm-btn"
      size="xs"
      @click="handleClickConfirmBtn"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'pagination',
  props: {
    modelValue: {
      type: Object as PropType<{
        sortBy: string;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
      }>,
      required: true,
    },
    maxPages: {
      type: Number,
      default: 3,
    },
    options: {
      type: Array as PropType<number[]>,
      default: () => [6, 8, 10, 12, 14, 16, 18, 20],
    },
  },
  emits: ['confirm', 'update:modelValue'],
  setup(props, { emit }) {
    const model = ref(props.options[0]);
    const page = ref<number | null>(null);
    const pagination = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });
    const handleClickConfirmBtn = () => {
      if (page.value) {
        pagination.value.page = page.value;
      } else {
        emit('confirm');
      }
    };
    const totalPage = computed(() =>
      Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
    );
    const maxTotalPage = computed(() =>
      Math.ceil(pagination.value.rowsNumber / props.options[0])
    );
    const handleClickPageBtn = (page: number) => {
      pagination.value.page = page;
      emit('confirm');
    };

    return {
      model,
      pagination,
      totalPage,
      maxTotalPage,
      page,
      handleClickConfirmBtn,
      handleClickPageBtn,
    };
  },
});
</script>
<style lang="scss">
.pagination {
  .q-btn--outline:before {
    border: 1px solid #dee1e6;
  }
  .q-btn-group--outline > .q-btn-item:not(:last-child):before {
    border-right: 1px solid #dee1e6;
  }
  .q-btn-group {
    .q-btn {
      font-size: 14px;
      font-weight: 400;
      color: $gray-400;
      line-height: 20px;
      min-height: 30px !important;
      padding: 0 10px !important;
    }
  }
  .q-btn {
    font-size: 14px;
    font-weight: 400;
    color: $gray-400;
    line-height: 20px;
    &--highlight {
      color: $brand !important;
    }
  }
  .q-input {
    width: 65px;
    .q-field__control {
      height: 30px;
    }
  }
  .q-field {
    .q-field__control {
      height: 30px;
      min-height: 30px;
      .q-field__control-container {
        padding-top: 0;
      }
      .q-field__append {
        height: 30px;
      }
    }
  }
  .q-field--outlined .q-field__control:before {
    border-color: #dee1e6;
    border-radius: 2px;
  }
  .confirm-btn {
    border-radius: 15px;
    min-width: 58px;
  }
}
</style>
