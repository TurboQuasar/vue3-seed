import { Pagination } from 'models/Pagination';
import { computed, onMounted, ref } from 'vue';

export function usePagination<T, U extends { page: number; size: number }>(
  payload: {
    columns: any[];
    params: U;
    fetchFromServer: (filter: U) => Promise<Pagination<T>>;
  },
  immediate: boolean = true
) {
  const { columns, params, fetchFromServer } = payload;
  const rows = ref<T[]>([]);
  const filter = ref<U>(params);
  const loading = ref(false);
  const fail = ref<any>(false);
  const pagination = ref<{
    sortBy: 'desc';
    descending: boolean;
    page: number;
    rowsPerPage: number;
    rowsNumber: number;
  }>({
    sortBy: 'desc',
    descending: false,
    page: filter.value.page,
    rowsPerPage: filter.value.size,
    rowsNumber: 0,
  });

  async function onRequest(props: {
    pagination: {
      sortBy: 'desc';
      descending: boolean;
      page: number;
      rowsPerPage: number;
      rowsNumber: number;
    };
  }) {
    rows.value = [];
    const { page, rowsPerPage, sortBy, descending } = props.pagination;

    loading.value = true;
    fail.value = false;
    try {
      const {
        pageNumber,
        pageSize,
        totalPage,
        totalSize,
        rainbow,
        hasPrePage,
        hasNextPage,
        start,
        end,
        dataSize,
        data,
      } = await fetchFromServer({
        ...filter.value,
        page: page,
        size: rowsPerPage,
      });
      rows.value = ref(data).value;
      pagination.value.rowsNumber = totalSize;
      pagination.value.page = pageNumber;
      pagination.value.rowsPerPage = pageSize;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
    } catch (err) {
      fail.value = err;
    } finally {
      // ...and turn of loading indicator
      loading.value = false;
    }
  }

  onMounted(() => {
    // get initial data from server (1st page)
    immediate &&
      onRequest({
        pagination: pagination.value,
      });
  });
  const totalPage = computed(() =>
    Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
  );
  return {
    filter,
    loading,
    pagination,
    columns,
    rows,
    onRequest,
    fail,
    totalPage,
  };
}
