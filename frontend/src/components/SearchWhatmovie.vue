<template>
  <div class="container">
    <div class="movies" v-if="movieResults.length">
      <div class="movie" v-for="movie in movieResults" :key="movie.movieCd" v-if="movie.poster"
        @click="selectMovie(movie)">
        <h3>{{ movie.title }}</h3>
        <p>개봉일: {{ movie.openDt }}</p>
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" alt="Movie Poster">
      </div>
    </div>
  </div>
</template>
  
<script>
import router from '@/router';

export default {
  data() {
    return {
      movieResults: [],
    };
  },

  created() {
    this.searchMovies();
  },

  watch: {
    '$route.params.name': {
      immediate: true,
      handler: function(newName) {
        this.searchMovies();
      },
    },
  },

  methods: {
    selectMovie(movie) {
      this.$store.commit('selectMovie', movie.id);
      this.$router.push({ name: 'onemovie', params: { id: movie.id, movie: movie } });
      console.log(movie.id);
    },

    async searchMovies() {
      this.movieResults = []; 
      try {
        const encodedName = encodeURIComponent(this.$route.params.name);
        const response = await fetch(`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888&movieNm=${encodedName}`);
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0bf7c555add38a115bea3137a51f5e6d&query=${encodedName}`);
        const tmdbData = await tmdbResponse.json();
        const data = await response.json();
        const tmdbMovie = tmdbData.results[0];

        if (data.movieListResult.movieList.length > 0) {
          const promises = data.movieListResult.movieList.map(async movie => {
            const tmdbResPoster = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0bf7c555add38a115bea3137a51f5e6d&query=${encodeURIComponent(movie.movieNm)}`);
            const tmdbposter = await tmdbResPoster.json();
            const poster = tmdbposter.results[0]?.poster_path || "";

            return {
              id: movie.movieCd,
              openDt: movie.openDt,
              title: movie.movieNm,
              poster,
              tmdbid: tmdbMovie.id,
            };
          });

          this.movieResults = await Promise.all(promises);
        } else {
          this.movieResults = [];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { router }
};

</script>

<style>
.container {
  width: 90%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.movie {
  margin: 10px 10px 20px 10px;
  flex: 0 0 23%;
}

.movie img {
  width: 80%;
  height: auto;
  object-fit: cover;
}
</style>