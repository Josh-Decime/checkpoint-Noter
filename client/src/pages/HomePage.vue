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
</template>

<script>
import { onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { notebookService } from '../services/NotebookService.js';
import { Account } from '../models/Account.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {

    // onMounted(() => {
    //   if (AppState.account.id) {
    //     getMyNotebooks()
    //   }
    // })

    // watchEffect(() => {
    //   AppState.account.id
    //   if (AppState.account.id) {
    //     getMyNotebooks()
    //   }
    // })

    // async function getMyNotebooks() {
    //   try {
    //     await notebookService.getMyNotebooks()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }

    return {

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
