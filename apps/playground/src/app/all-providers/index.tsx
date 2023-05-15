import { RouterProvider } from 'atomic-router-react';
import { Provider } from 'effector-react';
import {
  ComponentType,
  PropsWithChildren,
  ProviderProps,
  ReactElement
} from 'react';
import { I18nextProvider } from 'react-i18next';
import { $$router } from '../../app/router';
import { $$i18n } from '../../shared/i18n';
import { scope } from '../../shared/scope';

type IProviderOrWithValue<T = any> = ComponentType<T> | [ComponentType<T>, T?];

export const combineProviders =
  (providers: Array<IProviderOrWithValue>) =>
  ({ children }: PropsWithChildren<{ value?: unknown[] }>) =>
    providers.reduceRight<ReactElement<ProviderProps<unknown>>>(
      (tree, ProviderOrWithValue) => {
        if (Array.isArray(ProviderOrWithValue)) {
          const [Provider, value] = ProviderOrWithValue;
          return <Provider {...value}>{tree}</Provider>;
        } else {
          return <ProviderOrWithValue>{tree}</ProviderOrWithValue>;
        }
      },
      children as ReactElement
    );

export const AllProviders = combineProviders([
  [I18nextProvider, { i18n: $$i18n.i18n }],
  [Provider, { value: scope }],
  [RouterProvider, { router: $$router }]
]);
