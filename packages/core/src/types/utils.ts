type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T);

type PathPayload = {
  path: string;
};

type PathValuePair<V = unknown> = PathPayload & {
  value: V;
};

export { DeepPartial, PathPayload, PathValuePair };
