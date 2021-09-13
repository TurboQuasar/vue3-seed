import { Ref, ref } from 'vue';

export function useRequest<T extends (...args: any[]) => Promise<any>>(
  f: (...args: ArgumentTypes<T>) => Promise<ThenArg<ReturnType<T>>>,
  loading$ = true
) {
  const loading = ref(loading$);
  const fail = ref(false);
  const data = ref<ThenArg<ReturnType<T>>>() as Ref<ThenArg<ReturnType<T>>>;
  const req = (...args: ArgumentTypes<T>) => {
    loading.value = true;
    fail.value = false;
    return new Promise<ThenArg<ReturnType<T>>>((resolve, reject) => {
      f(...args)
        .then((val) => {
          data.value = val;
          resolve(val);
        })
        .catch((err) => {
          fail.value = err;
          reject(err);
        })
        .finally(() => {
          loading.value = false;
        });
    });
  };
  return {
    req,
    loading,
    fail,
    data,
  };
}
