
<template>
  <header>
  </header>

  <main>
    HELLO
  </main>
</template>

<script lang="ts">
import { fetchAllCategories, fetchRandomJoke } from "@/helpers/http";
import { onMounted } from "vue";
export default {
  setup(){

    onMounted(async () => {
      await fetchData();
    })

    function fetchData() {
     fetchAllCategories();
     fetchRandomJoke();
    }
    return {
      fetchData,
      fetchRandomJoke
    }
  },
}
</script>

<style>

</style>
