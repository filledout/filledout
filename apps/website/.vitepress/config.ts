import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/',

  lang: 'en-US',

  title: 'FilledOut',

  description: 'UI Framework-agnostic effector based form library',

  srcDir: 'docs',

  themeConfig: {
    nav: [
      {
        text: 'Guide',

        link: '/guide/getting-started',

        activeMatch: '^/$|^/guide/'
      },

      {
        text: 'API',

        link: '/api/lib',

        activeMatch: '^/$|^/api/'
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Anton Skorochkin',
    },

    sidebar: {
      '/api': api(),

      '/guide/': guide()
    }
  }
});

function api() {
  return [
    {
      text: 'Core',

      items: [
        { text: 'Lib', link: '/api/lib' },

        { text: 'Form', link: '/api/form' },

        { text: 'Field', link: '/api/field' }
      ]
    },

    {
      text: 'Bindings',

      items: [
        {
          text: 'React',

          link: '/api/react'
        }
      ]
    }
  ];
}

function guide() {
  return [
    {
      text: 'Guide',

      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },

        { text: 'Setup', link: '/guide/setup' },

        { text: `Let's create a form`, link: '/guide/create-form' },

        { text: `Fields`, link: '/guide/fields' },

        { text: 'Examples', link: '/guide/examples' }
      ]
    },

    {
      text: 'Validation',

      items: [
        { text: 'Introduction', link: '/guide/validation/introduction' },

        { text: 'Yup', link: '/guide/validation/yup' }
      ]
    },

    {
      text: 'Bindings',

      items: [{ text: 'React', link: '/guide/bindings/react' }]
    },

    {
      text: 'Recipes',

      items: [
        {
          text: 'Field HOC',

          link: '/guide/recipe/hoc'
        },

        {
          text: 'Localization',

          link: '/guide/recipe/localization'
        }
      ]
    }
  ];
}
