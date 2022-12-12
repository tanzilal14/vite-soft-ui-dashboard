<template>
  <input
    :id="idElement"
    type="radio"
    :name="inputName"
    class="input-sub"
    hidden
  />
  <label :for="idElement" class="button-sub btn-sm null ms-auto">
    <span v-html="nameElement"></span>
  </label>
</template>

<script>
export default {
  name: "SubSelectHistologiRequest",
  props: {
    idElement: {
      type: String,
      default: "",
    },
    nameElement: {
      type: String,
      default: "",
    },
    inputName: {
      type: String,
      default: "path_sub",
    },
  },
};
</script>

<style scoped></style>
