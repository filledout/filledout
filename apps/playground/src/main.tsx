import './shared/form/set-yup-locale';
import { allSettled } from 'effector';
import { createRoot } from 'react-dom/client';
import { $$router, Application } from './app';
import { AllProviders } from './app/all-providers';
import { $$i18n } from './shared/i18n';
import { history } from './shared/router';
import { scope } from './shared/scope';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <AllProviders>
    <Application />
  </AllProviders>
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
