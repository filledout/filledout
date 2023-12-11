import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/',

  lang: 'en-US',

  title: 'Filledout',

  description: 'UI Framework-agnostic effector based form library',

  srcDir: 'docs',

  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'nord'
    },
    lineNumbers: true
  },

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1c1e23' }],
    [
      'meta',
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' }
    ],
    ['meta', { name: 'theme-color', content: '#1c1e23' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
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
          text: 'Getting Started',
          link: '/guide/getting-started'
        },
        {
          text: 'Installation',
          link: '/guide/installation'
        },
        {
          text: 'Configure',
          link: '/guide/configure'
        },
        {
          text: 'Adapters for form components',
          link: '/guide/adapters-for-form-components'
        }
      ]
    },
    {
      text: 'Guide old',

      items: [
        {
          text: 'Field',

          link: '/guide-old/field-decorator'
        },

        {
          text: `Let's make a form`,

          link: '/guide-old/first-form'
        },

        {
          text: `Manipulating the form`,

          link: '/guide-old/manipulating-the-form'
        },

        {
          text: `Dynamic values`,

          link: '/guide-old/arrays'
        },

        {
          text: `Validation`,

          link: '/guide-old/validation'
        },

        {
          text: `UI bindings`,

          link: '/guide-old/ui'
        },

        {
          text: `What's next?`,

          link: '/guide-old/whatsnext'
        }
      ]
    }
  ];
}
