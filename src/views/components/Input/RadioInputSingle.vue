<template>
  <input :id="makeId(item)" v-model="data" :value="item" type="radio" hidden />
  <label :for="makeId(item)" class="button-title btn ms-auto">
    <strong>{{ item }}</strong>
  </label>
</template>

<script>
export default {
  name: "RadioInputSingle",
  props: {
    item: {
      type: String,
      required: true,
      default: "hehe",
    },
    file: {
      type: String,
      required: true,
    },
    nameVar: {
      type: String,
      required: true,
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
