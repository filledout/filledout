import{_ as e,o as a,c as t,d as o}from"./app.e3c3242b.js";const f=JSON.parse('{"title":"Localization","description":"","frontmatter":{},"headers":[],"relativePath":"guide/recipe/localization.md"}'),r={name:"guide/recipe/localization.md"},s=o('<h1 id="localization" tabindex="-1">Localization <a class="header-anchor" href="#localization" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Examples can be found at <a href="https://github.com/hyze2d/filledout" target="_blank" rel="noreferrer">https://github.com/hyze2d/filledout</a></p></div><p>Example based on i18n setup</p><p>To prevent the need of syncing error messages with currently set language it&#39;s better to avoid storing actual error messages inside a form errors instead of messages prefer storing localization keys and not rely on validation library&#39;s integration with i18n or something else.</p><p>Let&#39;s take <code>yup</code> as an example.</p><p>We can set default messages for every schema type like so: <a href="https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/set-yup-locale.ts" target="_blank" rel="noreferrer">https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/set-yup-locale.ts</a></p><p>Then using useTranslation from react-i18next we can get actual error message from i18 <a href="https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/field.tsx#L61" target="_blank" rel="noreferrer">https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/field.tsx#L61</a></p>',7),i=[s];function l(n,c,p,d,h,u){return a(),t("div",null,i)}const g=e(r,[["render",l]]);export{f as __pageData,g as default};
