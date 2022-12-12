<template>
  <div class="row my-2">
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

      <v-select v-model="data" :options="options" @input="update"></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInputSingle",
  props: {
    longWidth: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      required: true,
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
    options: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:test", "update-data", "input"],
  data() {
    return {
      data: "",
    };
  },
  watch: {
    data(newData, oldData) {
      this.$emit("input", newData, this.nameVar);
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
