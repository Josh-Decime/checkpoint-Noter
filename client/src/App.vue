<template>
  <header>
    <Navbar />
  </header>
  <main>
    <NotebookOffcanvas />
    <router-view />
  </main>
  <footer class="bg-dark text-light">

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import NotebookOffcanvas from './components/NotebookOffcanvas.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, NotebookOffcanvas }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
