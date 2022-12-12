<template>
  <div class="row">
    <label v-show="label != ''" class="col-form-label col-12">{{
      label
    }}</label>
    <div class="col-12">
      <slot name="input"></slot>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "TextAreaInput",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
