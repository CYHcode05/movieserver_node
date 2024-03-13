<template>
  <div>
    <showWhatMovie/>
    <Movie_evaluation/>
  </div>
</template>

<script>
import showWhatMovie from '@/components/showWhatMovie.vue';
import Movie_evaluation from '@/components/Movie_evaluation.vue';
export default {
  props: ['id'],

  components: {
    showWhatMovie,
    Movie_evaluation,
  },
  
};
</script>
