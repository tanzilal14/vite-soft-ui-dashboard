<template>
  <div class="row my-2">
    <label class="col-form-label col-md-2" :class="onlyForm ? 'd-none' : ''"
      >{{ label }} <sup v-show="important">*</sup>
    </label>

    <div class="col-md-9">
      <Datepicker
        v-model="data"
        :required="true"
        :enable-time-picker="false"
        text-input
        :format="format"
      >
      </Datepicker>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateInputSingle",
  props: {
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
    onlyForm: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:test", "update-data", "input"],
  data() {
    return {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      data: "",
    };
  },
  watch: {
    data(newData, oldData) {
      this.$emit("input", newData, this.nameVar);
    },
    file(newData, oldData) {
      this.data = newData;
    },
  },
  mounted() {
    this.data = this.file;
  },
  methods: {
    format(date) {
      const day = date.getDate();
      // const month = date.getMonth() + 1;
      const month = this.monthNames[date.getMonth()];
      const year = date.getFullYear();

      // return `${year}-${month}-${day}`;
      return `${day} ${month} ${year}`;
    },
  },
};
</script>

<style lang="scss"></style>
