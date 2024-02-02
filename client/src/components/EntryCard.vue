<template>
    <section class="row m-3 card-background py-3">
        <div class="col-3">
            <img :src="entry.img" alt="Entry image" class="img-fluid image-style">
        </div>
        <div class="col-9">
            <p>{{ entry.description }}</p>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Entry } from '../models/Entry.js';
export default {
    props: { entry: { type: Entry, required: true } },

    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.card-background {
    background-color: var(--bs-secondary);
    border-radius: 15px;
}

.image-style {
    border-radius: 15px;
    box-shadow: 3px 3px 6px black;
}
</style>