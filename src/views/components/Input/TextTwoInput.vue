<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <label class="col-form-label col d-flex justify-content-start">{{
          label
        }}</label>
        <div class="col-md-9">
          <slot name="input"></slot>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <label class="col-form-label col d-flex justify-content-start">{{
          label
        }}</label>
        <div class="col-md-6">
          <slot name="input"></slot>
        </div>
      </div>
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
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
