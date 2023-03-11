type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type PathPayload = {
  path: string;
};

type PathValuePair<V = unknown> = PathPayload & {
  value: V;
};

export { DeepPartial, PathPayload, PathValuePair };
