<template>
  <q-layout view="lHh Lpr lFf">
    <Header/>
    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Header from "@/components/Header.vue";
import HelloWorld from './components/PageBody.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Header,
    HelloWorld
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
