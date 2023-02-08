---
layout: home

hero:
  name: Filledout
  text: Forms with ease
  tagline: Dynamic forms powered by Effector
  image:
    src: https://media.tenor.com/8kIoZ3dNzjcAAAAC/peepo-peepoblush.gif
    alt: Filledout
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API
      link: /api/lib

features:
  - icon: ☂️
    title: UI Framework-agnostic
    details: Most forms are usually bound to a certain framework/library and do not exist outside of ui framework's context. Filledout is standalone library with a separate ui bindings.
  - icon: 🔒
    title: Typesafe
    details: Tired of using string paths as field keys? Proxy powered fully typed fields refrence solves the problem.
  - icon: 💨
    title: Feature packed
    details: Has most demanded features out of the box and ready to extend if there's missing ones.
---


<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const members = [
  {
    avatar: '/hyze2d-photo.jpg',
    name: 'Anton Skorochkin',
    links: [
      { icon: 'github', link: 'https://github.com/hyze2d' },
      
      { icon: 'twitter', link: 'https://twitter.com/hyze2dev' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Team
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>