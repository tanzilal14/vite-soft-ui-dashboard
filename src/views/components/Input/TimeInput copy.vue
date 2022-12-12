<template>
  <div class="row">
    <label class="col-form-label col-md-2">{{ label }}</label>
    <div class="col-md-9 d-flex">
      <slot name="time-start"></slot>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "TimeInput",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
