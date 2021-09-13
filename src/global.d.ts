declare type Recordable<T = any> = Record<string, T>;
declare type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
declare type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;
