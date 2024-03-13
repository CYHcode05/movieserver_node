<template>
    <div userid="app">
        <v-layout row justify-center>
            <v-dialog v-model="user" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ userTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="아이디" v-model="userInfo.userid" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="비닐번호" v-model="userInfo.userpassword" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="사용자" v-model="userInfo.name" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="전화번호" v-model="userInfo.number" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="주소" v-model="userInfo.address" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="등록일" v-model="userInfo.register_date" required></v-text-field>
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
        <h3>회원목록</h3>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.item.userid }}</td>
                    <td>{{ row.item.userpassword }}</td>
                    <td>{{ row.item.name }}</td>
                    <td>{{ row.item.number }}</td>
                    <td>{{ row.item.address }}</td>
                    <td>{{ row.item.register_date }}</td>
                    <td class="text-xs-right">
                        <v-btn color="primary" v-on:click.native="updateContact(row.item)">수정</v-btn>
                        <v-btn color="primary" v-on:click.native="deleteContact(row.item)">삭제</v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    data() {
        return {
            urlinfo: 'http://localhost:8000/user',
            userInfo: {
                _id: null,
                userid: null,
                userpassword: null,
                name: null,
                number: null,
                address: null,
                register_date: null,
            },
            user: false,
            userTitle: null,
            headers: [
                { text: '아이디', align: 'left', value: 'userid' },
                { text: '패스워드', align: 'left', value: 'userpassword' },
                { text: '이름', align: 'left', value: 'name' },
                { text: '전화 번호', align: 'left', value: 'number' },
                { text: '주소', align: 'left', value: 'address' },
                { text: '등록일', align: 'left', value: 'register_date' },
            ],
            items: []
        }
    },
    created() {
        axios.get(this.urlinfo, { withCredentials: true }) //서버에 요청하기
            .then((res) => {
                console.log(res.data); //성공시
                this.items = res.data;
            })
            .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
            });
    },
    methods: {
        updateContact(data) {
            this.user = true;
            this.userTitle = "수정";
            this.userInfo.userid = data.userid;
            this.userInfo.userpassword = data.userpassword;
            this.userInfo.name = data.name;
            this.userInfo.number = data.number;
            this.userInfo.address = data.address;
            this.userInfo.register_date = data.register_date;
        },
        deleteContact(data) {
            this.userInfo.userid = data.userid;

            axios.delete(this.urlinfo + '/' + this.userInfo.userid)
                .then(() => {
                    console.log("삭제 성공");

                    // 화면에서도 해당 항목을 제거
                    this.items = this.items.filter(item => item.userid !== this.userInfo.userid);
                    alert("삭제 성공");
                })
                .catch((err) => {
                    alert('에러 발생: ' + err);
                });
        },
        btnClick($event) {
            this.user = false;
            if ($event.target.innerHTML == "확인") {
                if (this.userTitle == "수정") {
                    axios.put(this.urlinfo + '/' + this.userInfo.userid, {
                        userid: this.userInfo.userid, userpassword: this.userInfo.userpassword, name: this.userInfo.name, number: this.userInfo.number,
                        address: this.userInfo.address, register_date: this.userInfo.register_date
                    })
                        .then(() => {
                            axios.get(this.urlinfo)
                                .then((res) => {
                                    this.items = res.data;
                                    alert("업데이트 성공");
                                })
                                .catch((err) => {
                                    alert('에러 발생: ' + err);
                                });
                        })
                        .catch((err) => {
                            alert('에러 발생: ' + err);
                        });
                }
            }
            this.userInfo.userid = null;
            this.userInfo.userpassword = null;
            this.userInfo.name = null;
            this.userInfo.number = null;
            this.userInfo.address = null;
            this.userInfo.register_date = null;
        }
    }
}
</script>
<style scoped>
div {
    margin: 20px 5px 0 5px;
}
</style>
  