// eslint-disable-next-line import/no-internal-modules
import yup from '../form/locales/en.json';
import { createi18n } from './factory';

const $$i18n = createi18n({
  resources: {
    en: {
      yup
    }
  }
});

export { $$i18n };
