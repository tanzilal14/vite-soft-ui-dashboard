<template>
  <div class="row my-2">
    <label class="col-form-label col-md-2" :class="onlyForm ? 'd-none' : ''"
      >{{ label }} <sup v-show="important">*</sup>
    </label>
    <div :class="onlyForm ? 'col' : 'col-md-9'">
      <!-- <FormKit
        id="test"
        :disabled="disabled"
        v-model="data"
        :type="type"
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
      /> -->

      <!-- <Field v-model="data" :name="label" :type="type" :rules="rules" />
      <ErrorMessage as="div" :name="label" v-slot="{ message }">
        <p>Error:</p>
        <p>{{ message }}</p>
      </ErrorMessage> -->
      <Field
        v-slot="{ field, errors, errorMessage }"
        v-model="data"
        :name="label"
        :type="type"
        :rules="rules"
      >
        <input v-bind="field" type="text" />
        <span>{{ errors }}</span>
        <!-- Or -->
      </Field>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  name: "TextInputValidate",
  components: { Field, ErrorMessage },
  props: {
    rules: {
      type: String,
      default: "required",
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
