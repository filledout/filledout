import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',

  title: 'FilledOut ☄️🥛',

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

        { text: 'Fields & Data Structure', link: '/guide/fields' },

        { text: 'Factory Extension', link: '/guide/factory-extension' },

        { text: 'Validation', link: '/guide/validation' },

        { text: 'Examples', link: '/guide/examples' }
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
          text: 'Simple form',

          link: '/guide/recipe/hoc'
        },

        {
          text: 'Dynamic Validation',

          link: '/guide/recipe/dynamic-validation'
        },

        {
          text: 'Localization',

          link: '/guide/recipe/localization'
        }
      ]
    }
  ];
}
