<template>
  <input :id="idElement" type="radio" hidden :name="inputName" />
  <label :for="idElement" class="button-title btn-sm null null ms-auto">
    <span v-html="nameElement"></span>
  </label>
</template>

<script>
export default {
  name: "TitleSelectHistologiRequest",
  props: {
    idElement: {
      type: String,
      default: "",
    },
    nameElement: {
      type: String,
      default: "hehe",
    },
    inputName: {
      type: String,
      default: "path_title",
    },
  },
};
</script>

<style scoped></style>
