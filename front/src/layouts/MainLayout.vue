<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="~/src/assets/whiteLogo.svg"
            loading="lazy"
            spinner-color="white"
            height="60px"
            style="max-width: 150px;  margin-bottom: 10px"
          />
        </q-toolbar-title>

        <div>Bourse</div>
        <div>Dashboard</div>
        <div>{{ $q.dark.isActive }} </div>
        <q-btn round color="primary" :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="switchDarkMode"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  methods: {
    switchDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive)
    }
  }
})
</script>
