<template>
  <v-carousel hide-delimiters>
    <div class="container">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
        <div id="description">
          <v-card class="mx-auto" color="rgb(255, 255, 255, 0.2)" max-width="400">
            <v-card-text class="text--primary">
              <div>{{item.text}}</div>
            </v-card-text>
          </v-card>
        </div>
      </v-carousel-item>
    </div>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-dgxDT3TdccsHgdrd3HJAbuLNAry-84kXD3wp80KjA1I7Rluo",
          text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS61gXqNX8FwCvG_5dq4pjeJAIotLw1jocbY3WJN2MIXLkOKOsy",
          text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYw73OeAvU_prul6bW61RcseYRjiqmygkqVE88JKynaM7xIFiR",
          text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTa-ob1g6shOdHhSdGBk7dzAi5PYfy7iwY5Ikl1u9Up5hUy2A44",
          text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
        }
      ]
    };
  }
};
</script>

<style scoped>
#description{
    float: right;
    margin-top: 350px;
    margin-right: 50px;
}
</style>