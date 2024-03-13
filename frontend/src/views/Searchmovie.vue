<template>
    <div>
    <SearchWhatmovie/>
    </div>

</template>

<script>
import SearchWhatmovie from '@/components/SearchWhatmovie.vue';

export default {
    props: ['name'],

    components: {
        SearchWhatmovie
    },
}
</script>



