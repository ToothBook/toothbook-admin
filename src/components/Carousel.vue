<template>
  <v-carousel cycle hide-delimiters>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
      <v-container class="fill-height ml-12" fluid>
        <v-layout align-center justify-left>
          <v-flex xs12 sm8 md7 lg5>
            <v-card class="mx-auto" justify-left color="rgba(0,0,0,0.3)" max-width="400">
              <v-card-text class="display-1 font-weight-bold" light color="white">
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
        text: "Let your smile shine all day long."
      },
      {
        src: require("@/assets/pic2.jpg"),
        text: "The new life begins with a confident smile."
      },
      {
        src: require("@/assets/dental.jpg"),
        text: "Make the world a better place, one smile at a time."
      },
      {
        src: require("@/assets/pic6.jpg"),
        text:
          "A genuine smile comes from the heart, but a healthy smile needs good dental care."
      }
    ]
  })
};
</script>
