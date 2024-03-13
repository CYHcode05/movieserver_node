<template>
    <v-app>
        <Userframe/>
        <hr>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer>
            <v-btn text value="서비스 안내">
                <v-icon>목원대학교 정보통신공학과</v-icon>
            </v-btn>
        </v-footer>
    </v-app>
</template>

<script>
import Userframe from '@/components/Userframe.vue';

export default {
    name: 'App',
    
    components: {
        Userframe,
    },
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: white;
}

hr{
    border: 1px solid #000000;
    width: 80%;
    margin: 0 auto; /* Add this line to center the hr element */
    margin-bottom: 25px;
  }
</style>
