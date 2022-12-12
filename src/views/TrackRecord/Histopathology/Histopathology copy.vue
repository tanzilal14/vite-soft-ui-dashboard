<template>
  <div class="py-4 container-fluid">
    <form class="" @submit.prevent=""></form>
  </div>
</template>

<script>
import CardBox from "@/views/components/Layout/CardBox.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Histopathology",
  components: {
    CardBox,
  },

  data() {
    return {};
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = [
      "/track-record/histopathology",
      "/histologi-request",
    ];
    // this.$store.commit("setUrlPage", ["/histologi", "/histologi-request"]);
    // this.$store.commit("setNamePage", ["Information", "Request Form"]);
  },
  methods: {},
};
</script>

<style scoped></style>
