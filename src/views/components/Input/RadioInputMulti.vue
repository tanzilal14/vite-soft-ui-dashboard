<template>
  <div class="col-auto">
    <RadioInputSingle
      :file="data.item"
      name-var="item"
      @update-data="updateData"
    />
  </div>
  <div class="col-auto">
    <TextInputSingle
      :only-form="true"
      :file="data.text"
      name-var="text"
      @update-data="updateData"
    />
  </div>
</template>

<script>
import RadioInputSingle from "@/views/components/Input/RadioInputSingle.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";

export default {
  name: "RadioInputMulti",
  components: {
    RadioInputSingle,
    TextInputSingle,
  },
  props: {
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
      data: {
        item: "",
        text: "",
      },
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
