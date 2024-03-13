<template>
    <div id="app">
      <v-layout row justify-center>
        <v-dialog v-model="eval" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ evTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-model="evaluationInfo.userid" label="사용자 아이디"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="evaluationInfo.movieid" label="영화 아이디"></v-text-field>
                      </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="evaluationInfo.evtitle" label="영화 이름"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-rating v-model="evaluationInfo.evrating" :half-increments="true" background-color="black"
                      color="amber"></v-rating>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea v-model="evaluationInfo.evcontent" label="내용"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
              <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.userid }}</td>
            <td>{{ row.item.movieid }}</td>
            <td>{{ row.item.evtitle }}</td>
            <td class="text-xs-right">
              <v-btn color="primary" v-on:click.native="deleteContact(row.item)">삭제</v-btn>
              <v-btn color="primary" v-on:click.native="showDetails(row.item)">보기</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {

    data() {
      return {
        urlinfo: 'http://localhost:8000/evaluation',
        evaluationInfo: {
          userid: null,
          movieid: null,
          evtitle: null,
          evrating: null,
          evcontent: null,
        },
        eval: false,
        evTitle: null,
        headers: [
          { text: '입력자', align: 'left', value: 'userid' },
          { text: '영화 이름', align: 'left', value: 'evtitle' },
          { text: '평점', align: 'left', value: 'evrating' },
        ],
        items: [],
      };
    },
  
    mounted(){
      this.$socket.on("from server", (data) => {
        console.log("Received from server:", data);
        // 데이터를 활용하여 화면 업데이트 로직 추가
        this.items.push(data);
      });
    },
  
    created() {
        axios.get(this.urlinfo, { withCredentials: true })
        .then((res) => {
          console.log('서버 응답:', res.data);
  
          // 전체 데이터를 items에 할당
          this.items = Array.isArray(res.data) ? res.data : [];
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
  
          if (error.response) {
            console.error('오류 응답 데이터:', error.response.data);
          }
          this.items = [];
        });
    },
    methods: {

      deleteContact(data) {
        this.eval = true;
        this.evTitle = "삭제";
        this.evaluationInfo.userid = data.userid;  
        this.evaluationInfo.movieid = data.movieid;
      },
  
      showDetails(data) {
        this.eval = true;
        this.evTitle = "보기";
  
        // 선택한 영화 정보를 evaluationInfo에 저장
        this.evaluationInfo.userid = data.userid;
        this.evaluationInfo.movieid = data.movieid;
        this.evaluationInfo.evtitle = data.evtitle;
        this.evaluationInfo.evrating = data.evrating;
        this.evaluationInfo.evcontent = data.evcontent;
      },
      btnClick($event) {
        this.eval = false;
        if ($event.target.innerHTML === "확인") {
          if (this.evTitle === "삭제") {
            axios.delete(this.urlinfo + '/' + this.evaluationInfo.userid, { withCredentials: true })
              .then((result) => {
                console.log("삭제 후" + result);
                axios.get(this.urlinfo)
                  .then((res) => {
                    this.items = res.data;
                    alert("삭제 성공");
                  })
                  .catch((err) => {
                    alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err);
                  });
              })
              .catch((err) => { alert('에러 발생: ' + err); });
              this.$socket.emit("from client", "Deletion request");
            }
        }
        this.evaluationInfo.userid = null;
        this.evaluationInfo.movieid = null;
        this.evaluationInfo.evtitle = null;
        this.evaluationInfo.evrating = null;
        this.evaluationInfo.evcontent = null;
      },
    },
  };
  
  </script>
  
  <style scoped>
  div {
    margin: 20px 5px 0 5px;
  }
  </style>
  