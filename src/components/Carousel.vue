<template>
  <v-carousel cycle hide-delimiters>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
      <!-- <v-layout column align-center justify-left class="white--text">
        <h1 class="white--text mb-2 display-1 text-left">WE CARE FOR YOUR SMILE</h1>
      </v-layout>-->
    <v-container class="fill-height ml-12" fluid>

      <v-layout align-center justify-left>
        <v-flex xs12 sm8 md7 lg5>
          <v-card class="mx-auto" justify-left color="rgb(255, 255, 255, 0.2)" max-width="400">
            <v-card-text class="text--primary">
              <div>{{item.text}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "clientform",
  data: () => ({
    items: [
      {
        src: require("@/assets/pic1.jpg"),
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        src: require("@/assets/pic2.jpg"),
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        src: require("@/assets/pic3.jpg"),
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        src: require("@/assets/pic6.jpg"),
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ]
  })
};
</script>

<style scoped>
</style>