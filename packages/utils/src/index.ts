type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nope = () => {};

export { nope };

export type { DeepPartial };
