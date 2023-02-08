# Localization

:::tip 
Examples can be found at https://github.com/hyze2d/filledout
:::

Example based on i18n setup

To prevent the need of syncing error messages with currently set language it's better to avoid storing actual error messages inside a form errors instead of messages prefer storing localization keys and not rely on validation library's integration with i18n or something else.

Let's take `yup` as an example.

We can set default messages for every schema type like so:
https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/set-yup-locale.ts

Then using useTranslation from react-i18next we can get actual error message from i18 
https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/field.tsx#L61

