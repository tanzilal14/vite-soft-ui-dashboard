<template>
  <div class="row my-2">
    <label class="col-form-label col-md-2" :class="onlyForm ? 'd-none' : ''"
      >{{ label }} <sup v-show="important">*</sup>
    </label>
    <div :class="onlyForm ? 'col' : 'col-md-9'">
      <FormKit
        id="test"
        v-model="data"
        :disabled="disabled"
        :readonly="readonly"
        :type="type"
        :validation="rules"
        :name="label"
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
</template>

<script>
export default {
  name: "TextInputSingle",
  props: {
    rules: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    nameVar: {
      type: String,
      default: "",
    },
    important: {
      type: Boolean,

      default: false,
    },
    disabled: {
      type: Boolean,

      default: false,
    },
    readonly: {
      type: Boolean,

      default: false,
    },
    onlyForm: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  emits: ["update:test", "update-data"],
  data() {
    return {
      data: "",
    };
  },
  watch: {
    file: {
      handler(newVal, oldVal) {
        this.data = newVal;
      },
      deep: true,

      immediate: true,
    },
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
