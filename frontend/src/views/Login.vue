<template>
  <v-app id="app">
    <v-main>
      <v-container style="position: relative; top: 20%; margin-left: 20%" class="text-xs-cente">
        <v-layout row wrap class="text-xs-center">
          <v-flex>
            <v-card flat class="mx-auto" max-width="800">
              <v-row style="margin-top: 60px">
                <v-col>
                  <v-form style="width: 400px; height: 300px">
                    <div class="mx-3">
                      <v-icon color="black" size="30px">person</v-icon>
                      userId
                      <div class="mx-1">
                        <v-text-field placeholder="username" v-model="username" required></v-text-field>
                      </div>
                    </div>
                    <div class="mx-3">
                      <v-icon color="black" size="30px">lock</v-icon>
                      userPassword
                      <div class="mx-1">
                        <v-text-field placeholder="userpassword" type="password" v-model="userpassword"
                          required></v-text-field>
                      </div>
                    </div>

                    <v-card-actions>
                      <v-btn color="#2c4f91" dark large block @click="loginSubmit">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      urlinfo: 'http://localhost:8000/login',
      username: null,
      userpassword: null, // 이 부분을 수정했습니다.
    };
  },
  methods: {
    loginSubmit() {
      let saveData = {};
      saveData.username = this.username;
      saveData.password = this.userpassword;
      try {
        axios.post(this.urlinfo, qs.stringify(saveData), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true
        }).then((res) => {
          if (res.data.code === 1) {
            alert('로그인 성공');
            this.$store.commit('setUsername',res.data.username);
            console.log(this.$store.state.username);
            this.$router.push('/');
          }
          else if (res.data.code === 0) {
            alert('로그인 실패');
          }
          else if(res.data.code === 2)
          {
            alert('관리자 로그인 성공');
            this.$store.commit('setUsername',res.data.username);
            this.$router.push('/manager');
          }
        });
      }
      catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

