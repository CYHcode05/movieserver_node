<template>
 <div class="UserHome">
   <v-app>
     <v-main>
       <v-container>
         <v-row>
           <v-col>
             <Dailyboxoffice />
           </v-col>
         </v-row>
        <v-row>
         <v-col>
          <Weeklymoviebox />
        </v-col>
       </v-row>
       </v-container>
     </v-main>
   </v-app>
 </div>
</template>

<script>
import Dailyboxoffice from '@/components/Dailyboxoffice.vue';
import Weeklymoviebox from '@/components/Weeklymoviebox.vue';
export default {
  name: 'App',
  components: {
    Dailyboxoffice,
    Weeklymoviebox,
  }
}
</script>

