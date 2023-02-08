import './shared/form/set-yup-locale';

import { RouterProvider } from 'atomic-router-react';
import { allSettled } from 'effector';
import { Provider } from 'effector-react';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { $$router, App } from './app';
import { $$i18n } from './shared/i18n';
import { history } from './shared/router';
import { scope } from './shared/scope';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <I18nextProvider i18n={$$i18n.i18n}>
    <Provider value={scope}>
      <RouterProvider router={$$router}>
        <App />
      </RouterProvider>
    </Provider>
  </I18nextProvider>
);

// don't do things like that
allSettled($$i18n.setupFx, {
  scope,

  params: { lng: 'en' }
});

allSettled($$router.setHistory, {
  scope,

  params: history
});
