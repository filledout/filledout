import { createEffect, createStore } from 'effector';

import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

type Params = {
  resources: Record<string, any>;
};

const createi18n = ({ resources }: Params) => {
  const changeLanguageFx = createEffect(changeLanguage);

  const setupFx = createEffect(setup);

  const $i18n = createStore(i18n);

  async function setup({ lng }: { lng: string }) {
    await i18n
      .use(initReactI18next)

      .init({
        lng,

        resources,

        interpolation: {
          escapeValue: false
        }
      });
  }

  async function changeLanguage({ lng }: { lng: string }) {
    await i18n.changeLanguage(lng);
  }

  return {
    i18n,

    $i18n,

    setupFx,
    changeLanguageFx
  };
};

export { i18n, createi18n };
