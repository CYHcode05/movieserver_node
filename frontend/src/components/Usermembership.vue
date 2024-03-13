<template>
  <div>
    <h1>회원가입</h1>
    <form>
      <div>
        <label for="id">아이디:</label>
        <input type="text" id="userid" v-model="userInfo.userid" />
        <p v-if="userIdExists">이미 사용 중인 아이디입니다.</p>
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="userpassword" v-model="userInfo.userpassword" />
      </div>
      <div>
        <label for="name">이름:</label>
        <input type="text" id="name" v-model="userInfo.name" />
      </div>
      <div>
        <label for="number">전화번호:</label>
        <input type="text" id="number" v-model="userInfo.number" @input="formatPhone" maxlength="13"
          placeholder="010-0000-0000" />
      </div>
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="userInfo.email" />
      </div>
      <div>
        <label for="address">주소:</label>
        <input type="text" id="address" v-model="userInfo.address" />
      </div>
      <button type="button" @click="addContact">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      urlinfo: 'http://localhost:8000/user',
      userInfo: {
        userid: null,
        userpassword: null,
        name: null,
        number: null,
        email: null,
        address: null,
      },
      userIdExists: false,
    };
  },

  methods: {
    formatPhone() {
      let s = this.userInfo.number.replace(/\D/g, '');
      if (s.length <= 3) {
        this.userInfo.number = s;
      } else if (s.length <= 7) {
        this.userInfo.number = s.replace(/(\d{3})(\d+)/, '$1-$2');
      } else {
        this.userInfo.number = s.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
      }
    },

    async checkUserIdExists() {
      axios.get(this.urlinfo, { withCredentials: true })
        .then((res) => {
          const existingUser = res.data.find(user => user.userid === this.userInfo.userid);
          this.userIdExists = !!existingUser;
        })
        .catch((err) => {
          alert('에러 발생: ' + err);
        });
    },

    addContact() {
      this.checkUserIdExists();
      if (!this.userIdExists) {
        axios.post(this.urlinfo, this.userInfo, { withCredentials: true })
          .then(() => {
            alert("회원가입 성공하셨습니다.");
            this.$router.push('/');
          })
          .catch((err) => {
            alert('에러 발생: ' + err);
          });
      } else {
        alert("이미 사용중인 아이디입니다.");
      }
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 1em;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  width: 30%;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error-message {
  color: #ff0000;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>