<template>
  <div>
    <h3 class="title">주간 박스오피스 순위</h3>
    <div class="container">
      <button @click="rotateMoviesLeft">
        <img :src="leftArrowIcon" alt="Left Arrow" />
      </button>
      <div class="movie-block" v-for="movie in visibleMovies" :key="movie.rank" @click="selectMovie(movie)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" alt="Movie Poster" />
        <h4>{{ movie.title }}</h4>
        <p>개봉일:{{ movie.openDt }}</p>
        <p>{{ movie.rank }}위</p>
        <p>전일 관객 수: {{ movie.audiCnt }}</p>
        <button @click.stop="selectMovie(movie)">영화정보</button>
      </div>
      <button @click="rotateMoviesRight">
        <img :src="rightArrowIcon" alt="Right Arrow" />
      </button>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  data() {
    return {
      movies: [],
      visibleMovies: [],
      nextMovies: [],
      nextMovieIndex: 0,
      leftArrowIcon: require("../assets/leftarrow.png"),
      rightArrowIcon: require("../assets/rightarrow.png"),
    };
  },
  mounted() {
    this.fetchweeklyBoxOffice();
    setInterval(this.rotateMoviesRight, 3000);
  },
  methods: {
    selectMovie(movie) {
      this.$store.commit('selectMovie', movie.id);
      console.log(movie.id);
      this.$router.push({ name: 'onemovie', params: { id: movie.id, movie: movie } });
    },
    rotateMoviesRight() {
      if (this.nextMovies.length > 0) {
        this.visibleMovies.push(this.nextMovies[this.nextMovieIndex]);
        if (this.visibleMovies.length > 4) {
          this.visibleMovies.shift();
        }
        this.nextMovieIndex = (this.nextMovieIndex + 1) % this.nextMovies.length;
      }
      else {
        console.log("No more movies to rotate");
      }
    },
    rotateMoviesLeft() {
      if (this.nextMovies.length > 0) {
        this.nextMovieIndex = (this.nextMovieIndex - 1 + this.nextMovies.length) % this.nextMovies.length;
        this.visibleMovies.unshift(this.nextMovies[this.nextMovieIndex]);
        if (this.visibleMovies.length > 4) {
          this.visibleMovies.pop();
        }
      }
      else {
        console.log("No more movies to rotate");
      }
    },
    async fetchweeklyBoxOffice() {
      try {
        const today = new Date();
        today.setDate(today.getDate() - 11);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const date = String(today.getDate()).padStart(2, "0");
        const response = await fetch(`http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${year}${month}${date}`);
        const data = await response.json();
        const movies = data.boxOfficeResult.weeklyBoxOfficeList.slice(0, 10);

        this.movies = await Promise.all(movies.map(async (movie) => {
          const tmdbResPoster = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0bf7c555add38a115bea3137a51f5e6d&query=${encodeURIComponent(movie.movieNm)}`);
          const tmdbposter = await tmdbResPoster.json();
          const poster = tmdbposter.results[0]?.poster_path || "";
          const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0bf7c555add38a115bea3137a51f5e6d&query=${encodeURIComponent(movie.movieNm)}`);
          const tmdbData = await tmdbResponse.json();
          const tmdbMovie = tmdbData.results[0];
          return {
            id: movie.movieCd,
            rank: movie.rank,
            title: movie.movieNm,
            poster,
            audiCnt: movie.audiCnt,
            openDt: movie.openDt,
            tmdbid: tmdbMovie.id,
          };
        }));
        this.nextMovies = [...this.movies];
        this.visibleMovies = this.nextMovies.slice(0, 4);
      }
      catch (error) {
        console.error("Failed to fetch weekly box office:", error);
      }
    },
  },
  components: { router }
};
</script>
  
<style>
.title {
  text-align: center;
  font-size: 40pt;
  color: black;
  font-weight: bold;
}

.container {
  width: 80%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.movie-block {
  margin: 0 10px 20px 10px;
  flex: 0 0 auto;
  width: 20%;
}

.movie-block img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>