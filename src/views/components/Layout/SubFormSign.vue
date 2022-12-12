<template>
  <div class="row mt-3">
    <label class="col-form-label col d-flex justify-content-start">{{
      label
    }}</label>
    <div class="col-md-9">
      <div class="row">
        <div class="col-md-4">
          <Datepicker v-model="data.date" :enable-time-picker="false">
          </Datepicker>
        </div>
        <div class="col-md-4">
          <FormKit
            id="test"
            v-model="data.analyst_name"
            type="text"
            :name="nameVar + ' ' + label"
            validation="required"
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
        <div class="col-md-2">
          <FormKit
            id="test"
            v-model="data.sign"
            type="text"
            :name="nameVar + ' ' + label"
            validation="required"
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
        <div class="col-md-2 d-flex" :class="sign ? '' : 'd-none'">
          <input id="not_using" type="checkbox" name="" />
          <label class="mx-1 not_using label_small" for="not_using"
            >Use this signature for the rest of this section</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubFormSign",
  props: {
    label: {
      type: String,
      required: true,
    },
    sign: {
      type: Boolean,
      required: true,
      default: false,
    },
    file: {
      type: Object,
      required: true,
    },
    nameVar: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["update-data"],
  data() {
    return {
      data: {
        date: "",
        analyst_name: "",
        sign: "",
      },
    };
  },
  mounted() {
    this.data = this.file;
  },
  methods: {
    update() {
      this.$emit("update-data", this.data, this.nameVar, this.index);
    },
  },
};
</script>

<style lang="scss"></style>
