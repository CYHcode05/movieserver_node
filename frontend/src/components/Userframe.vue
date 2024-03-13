<template>
  <div class="form">
    <v-row>
      <v-col>
        <router-link to="/userhome" class="logo">
          <h1 class="Userh1">목원영화사이트</h1>
        </router-link>
      </v-col>
      <v-col class="text-right">
        <input type="text" v-model="searchQuery" @keyup.enter="searchMovies" placeholder="검색 영화">
        <router-link to="/login"><v-btn color="primary" v-if="!isLoggedIn">로그인</v-btn></router-link>
        <router-link to="/membership"><v-btn color="primary" v-if="!isLoggedIn">회원가입</v-btn></router-link>
        <v-btn color="primary" v-if="isLoggedIn" @click="handleLogout">로그아웃</v-btn>
        <p v-if="isLoggedIn">환영합니다!</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      urlinfo: 'http://localhost:8000/logout',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    handleLogin() {
      this.$store.commit('login');
    },
    handleLogout() {
      this.$store.commit('logout');

      axios.get(this.urlinfo, {
        withCredentials: true,
      })
        .then((res) => {
          if (this.$route.path !== '/') {
            this.$router.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    searchMovies() {
      this.$router.push({ name: 'searchmovie', params: { name: this.searchQuery } });
      this.searchQuery = '';
    },
  },
  created() {
    this.$socket.on('socketEvent', (data) => {
      if (data.type === 'login') {
        this.handleLogin();
      }
      else if (data.type === 'logout') {
        this.handleLogout();
      }
    });
  },
  components: { router }
};
</script>

<style scoped>
.form {
  width: 60%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.Userh1 {
  font-size: 30px;
  font-weight: bold;
  color: #333; /* Darker color for better readability */
  margin: 0; /* Remove default margin */
}

.text-right {
  display: flex;
  align-items: center;
}

.input {
  border: 1px solid #ccc; /* Lighter border color */
  padding: 8px;
  border-radius: 4px;
  margin-right: 10px; /* Add some space between the input and buttons */
}

.v-btn {
  margin-left: 10px; /* Add space between buttons */
}

.p {
  font-size: 18px; /* Adjust font size */
  font-weight: bold;
  color: #333; /* Darker color for better readability */
  margin: 0; /* Remove default margin */
}

/* Add a hover effect to buttons */
.v-btn:hover {
  background-color: #1976d2; /* Darker blue on hover */
}

/* Add a transition effect for smoother hover */
.v-btn {
  transition: background-color 0.3s ease;
}
</style>