<template>
  <div class="row">
    <div class="row box-test-title d-flex">
      <slot name="main-radio"></slot>
    </div>
    <div class="row box-test-title">
      <slot name="main-radio-without-flex"></slot>
    </div>

    <div class="row box-test-sub d-flex">
      <div class="col-md-5">
        <div class="box-test-title">
          <slot name="main-radio-input-title"></slot>
        </div>
      </div>
      <div class="col-md-4 p-0 m-0">
        <slot name="main-radio-input-text"></slot>
      </div>
    </div>

    <div class="row mx-4">
      <slot name="sub-radio"></slot>
    </div>

    <div class="box-test-sub d-flex">
      <div class="col-md-6 mx-4">
        <slot name="sub-radio-input"> </slot>
      </div>
      <div class="col-md-4 p-0 m-0">
        <slot name="sub-radio-input-text"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiRadio",
  props: {
    customWidth: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss"></style>
