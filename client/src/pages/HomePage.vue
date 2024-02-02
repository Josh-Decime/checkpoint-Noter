<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 card align-items-center shadow rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->
  <section class="container-fluid">
    <section class="row justify-content-center">


      <div v-for="entry in entries" class="col-10">
        <EntryCard :entry="entry" />
      </div>

    </section>
  </section>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { notebookService } from '../services/NotebookService.js';
import { Account } from '../models/Account.js';
import { accountService } from '../services/AccountService.js';
import { entryService } from '../services/EntryService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {

    onMounted(() => {
      getMyEntries()
    })

    async function getMyEntries() {
      try {
        await entryService.getMyEntries()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      entries: computed(() => {
        return AppState.entries
      }),

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
