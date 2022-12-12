<template>
  <div class="row">
    <label class="col-form-label col-md-2">{{ label }}</label>
    <div class="col-md-9">
      <slot name="input"></slot>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss"></style>
