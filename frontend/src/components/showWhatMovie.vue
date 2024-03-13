<template>
  <div>
    <div class="main" v-if="nmovie">
      <div class="img">
        <img :src="`https://image.tmdb.org/t/p/w500${nmovie.poster}`" alt="movie poster" />
      </div>
      <div class="test">
        <h2>{{ nmovie.title }}</h2>
        <p>개봉일: {{ nmovie.openDt }}</p>
        <p>장르: {{ genre }}</p>
        <p>등급: {{ audits }}</p>
        <p>감독: {{ director }}</p>
        <p>출연: {{ actor }}</p>
        <p>영화 내용: {{ overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nmovie: null,
      overview: null,
      genre: null,
      rating: null,
      director: null,
      actor: null,
      audits: null,
    };
  },

  async created() {
    
    this.nmovie = this.$route.params.movie;
    await this.getMovieDetailsTMDB();
    await this.getMovieDetailskobis();
  },

  methods: {
    async getMovieDetailskobis() {
      const response = await fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=${this.nmovie.id}`
      );
      const data = await response.json();
      this.director = data.movieInfoResult.movieInfo.directors[0].peopleNm;
      this.actor = data.movieInfoResult.movieInfo.actors.map((actor) => actor.peopleNm).join(", ");
      this.audits = data.movieInfoResult.movieInfo.audits[0].watchGradeNm;
    },

    async getMovieDetailsTMDB() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${this.nmovie.tmdbid}?api_key=0bf7c555add38a115bea3137a51f5e6d`
      );
      const data = await response.json();
      this.overview = data.overview;
      this.genre = data.genres.map((genre) => genre.name).join(", ");
      this.typeNm = this.genre;
    },
  },
};
</script>

<style>
.main {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  /* 요소를 가로로 배치 */
  justify-content: center;
  /* 요소를 가운데 정렬 */
}

.img {
  margin-top: 30px;
  /* top-margin을 20px로 설정 */
  margin-right: 15%;
}

.test {
  margin-top: 30px;
  /* top-margin을 20px로 설정 */
}</style>