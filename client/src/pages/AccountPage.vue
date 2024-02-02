<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { entryService } from '../services/EntryService.js'
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
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
