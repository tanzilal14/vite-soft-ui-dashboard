<template>
  <div class="row">
    <label class="col-form-label col-md-2">{{ label }} </label>
    <div v-show="main" class="col-md-9">
      <div class="row">
        <div class="col d-flex flex-wrap">
          <slot name="input-radio"></slot>
        </div>

        <div class="col-md-4 d-flex justify-content-start">
          <slot name="input-text"></slot>
        </div>
      </div>
    </div>
    <div v-show="!main" class="col-md-9">
      <div class="row">
        <slot name="input-radio-sub"></slot>
      </div>
      <div class="row">
        <slot name="input-radio-sub-addition"></slot>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "RadioInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    main: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss"></style>
