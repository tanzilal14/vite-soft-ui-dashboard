<template>
  <div class="row" :class="fullWidth ? '' : 'd-none'">
    <label v-show="label != ''" class="col-form-label col-12">{{
      label
    }}</label>
    <div class="col-12">
      <FormKit
        id="test"
        v-model="data"
        type="textarea"
        :name="label"
        validation="required"
        rows="5"
        :input-class="{
          'form-control': true,
          'formkit-input': false,
        }"
        :outer-class="{
          'formkit-outer': false,
          'input-text': true,
        }"
        @input="update"
      />
    </div>
  </div>
  <div class="row my-2" :class="fullWidth ? 'd-none' : ''">
    <label class="col-form-label col-md-2"
      >{{ label }} <sup v-show="important">*</sup>
    </label>
    <div class="col-md-9">
      <!-- <FormKit
          id="test"
          type="text"
          :name="label"
          validation="required"
          :input-class="{
            'form-control': true,
            'formkit-input': false,
          }"
          :outer-class="{
            'formkit-outer': false,
          }"
          v-model="data"
          @input="update"
        /> -->

      <FormKit
        id="test"
        v-model="data"
        type="textarea"
        :name="label"
        validation="required"
        rows="5"
        :input-class="{
          'form-control': true,
          'formkit-input': false,
        }"
        :outer-class="{
          'formkit-outer': false,
        }"
        @input="update"
      />
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "TextAreaSingle",
  props: {
    label: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      required: true,
    },
    nameVar: {
      type: String,
      required: true,
    },
    important: {
      type: Boolean,

      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:test", "update-data"],
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.data = this.file;
  },
  methods: {
    update() {
      this.$emit("update-data", this.data, this.nameVar);
    },
  },
};
</script>

<style lang="scss"></style>
