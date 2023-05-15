import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/',

  lang: 'en-US',

  title: 'Filledout',

  description: 'UI Framework-agnostic effector based form library',

  srcDir: 'docs',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }]
  ],

  themeConfig: {
    nav: [
      {
        text: 'Guide',

        link: '/guide/getting-started',

        activeMatch: '^/$|^/guide/'
      },

      {
        text: 'API',

        link: '/api/create-lib',

        activeMatch: '^/$|^/api/'
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Anton Skorochkin'
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
        {
          text: 'createLib',

          link: '/api/create-lib'
        },

        {
          text: 'createForm',

          link: '/api/create-form'
        },

        {
          text: 'FormModel',

          link: '/api/form-model'
        },

        {
          text: 'FieldModel',

          link: '/api/field-model'
        }
      ]
    },

    {
      text: 'Validators',

      items: [
        {
          text: 'yup',

          link: '/api/validators/yup'
        },

        {
          text: 'zod',

          link: '/api/validators/zod'
        }
      ]
    },

    {
      text: 'Bindings',

      items: [
        {
          text: 'React',

          items: [
            {
              text: 'createLib',

              link: '/api/react/create-lib'
            },

            {
              text: 'useField',

              link: '/api/react/use-field'
            },

            {
              text: 'useFields',

              link: '/api/react/use-fields'
            },

            {
              text: 'useForm',

              link: '/api/react/use-form'
            },

            {
              text: 'selectors',

              link: '/api/react/selectors'
            }
          ]
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
        {
          text: 'Getting started',

          link: '/guide/getting-started'
        },

        {
          text: 'Field',

          link: '/guide/field-decorator'
        },

        {
          text: `Let's make a form`,

          link: '/guide/first-form'
        },

        {
          text: `Manipulating the form`,

          link: '/guide/manipulating-the-form'
        },

        {
          text: `Dynamic values`,

          link: '/guide/arrays'
        },

        {
          text: `Validation`,

          link: '/guide/validation'
        },

        {
          text: `UI bindings`,

          link: '/guide/ui'
        },

        {
          text: `What's next?`,

          link: '/guide/whatsnext'
        },
      ]
    }
  ];
}
