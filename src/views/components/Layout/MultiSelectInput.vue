<template>
  <div class="">
    <div v-for="(item, index) in listData.slice(0, -1)" :key="index">
      <input
        :id="makeId(item.name + parentName + index)"
        v-model="data.select"
        :name="radioChoose"
        type="radio"
        hidden
        :value="item"
        class=""
      />
      <label
        :for="makeId(item.name + parentName + index)"
        class="p-2"
        :class="buttonClass"
        :style="{
          width: multiColumn,
        }"
        @click="
          () => {
            disabled_text = true;
          }
        "
      >
        <strong>{{ item.name }}</strong>
      </label>
    </div>
    <div v-if="qtyable" class="d-flex justify-content-start">
      <input
        :id="`${makeId(item.name + parentName + index)}`"
        v-model="data.select"
        :name="radioChoose"
        type="radio"
        hidden
        :value="item"
        class=""
      />
      <label
        :for="`${makeId(item.name + parentName + index)}`"
        class="p-2"
        :class="buttonClass"
        :style="{
          width: multiColumn,
        }"
        @click="
          () => {
            disabled_text = false;
          }
        "
        >{{ item.name }}
      </label>

      <input
        :name="radioChoose"
        :disabled="disabled_text"
        type="text"
        style="width: 10vw; height: min-content"
        class="form-control ms-4"
        @input="
          (e) => {
            data.select_text = e.target.value;
          }
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelectInput",
  // props: ["parentName", "item", "nameVar", "buttonClass"],
  props: {
    qtyable: {
      type: Boolean,
      default: false,
    },
    parentName: {
      type: String,
      default: "",
    },
    listData: {
      type: Object,
      default: () => {},
    },

    dataSource: {
      type: Object,
      default: () => {},
    },
    nameVar: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default: "btn",
    },
    multiColumn: {
      type: String,
      default: "",
    },
  },
  emits: ["changeSub"],
  data() {
    return {
      disabled_text: true,
      data: {
        select: "",
        select_text: "",
      },
    };
  },
  computed: {
    radioChoose() {
      return "input_" + this.makeId(this.parentName);
    },
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit("changeSub", newVal, this.nameVar);
      },
      deep: true,

      immediate: true,
    },
    dataSource: {
      handler(newVal, oldVal) {
        this.data = newVal;
      },
      deep: true,

      immediate: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss"></style>
