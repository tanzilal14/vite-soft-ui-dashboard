<template>
  <div class="row">
    <label class="col-form-label col-md-2"
      >{{ label }} <sup v-show="important">*</sup>
    </label>
    <div class="col-md-9">
      <input
        id="test"
        type="text"
        class="form-control"
        :value="test"
        @input="$emit('update:test', $event.target.value)"
      />

      <!-- <FormKit
        id="test"
        type="text"
        validation="required|matches:/^@[a-zA-Z]+$/|length:5"
        :input-class="{
          'form-control': true,
          'formkit-input': false,
        }"
        :outer-class="{
          'formkit-outer': false,
        }"
        :value="test"
        @input="$emit('update:test', $event.target.value)"
      /> -->
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "TextInputTest",
  props: {
    label: {
      type: String,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
    test: {
      type: String,
      default: "",
      required: true,
    },
  },
  emits: ["update:test"],
};
</script>

<style lang="scss"></style>
