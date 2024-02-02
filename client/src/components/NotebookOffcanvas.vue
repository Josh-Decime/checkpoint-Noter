<template>
    <button class="btn btn-info m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling">Notebooks</button>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
        id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header bg-info">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Notebooks:</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form action="">
                <div>
                    <!-- <input v-model="notebookData.title" type="text" class="form-control" name="notebook-title"
                        id="create-notebook-title" minlength="3" maxlength="25" placeholder="Notebook Title"
                        title="Notebook Title"> -->
                </div>
                <div>

                </div>
            </form>
            <div v-for="notebook in notebooks"
                class="d-flex justify-content-between m-1 bg-secondary rounded align-items-center">
                <div class="mx-2">{{ notebook.title }} </div>
                <div>
                    <span>{{ notebook.entryCount }} Entries</span>
                    <span class="btn btn-outline mdi mdi-book-open-variant"><i class="mdi mdi-chevron-right"></i></span>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import { notebookService } from '../services/NotebookService.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {

        // NOTE when i used watchEffect it didn't work, everything broke, but when i use watch it works but the console has a vue warning telling me to use watchEffect lol
        watch(() => {
            AppState.account.id
            if (AppState.account.id) {
                getMyNotebooks()
            }
        })

        async function getMyNotebooks() {
            try {
                await notebookService.getMyNotebooks()
            } catch (error) {
                Pop.error(error)
            }
        }

        return {

            notebooks: computed(() => AppState.notebooks),
            async createNotebook() {
                try {

                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>