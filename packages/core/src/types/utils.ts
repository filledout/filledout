type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type NamePayload = {
  name: string;
};

type NameValuePair<V = unknown> = NamePayload & {
  value: V;
};

export { DeepPartial, NamePayload, NameValuePair };
