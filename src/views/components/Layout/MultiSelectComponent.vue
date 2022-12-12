<template>
  <div v-if="!item.selectable">
    <p>{{ item.name }}</p>
  </div>
  <div v-else-if="item.selectable" class="">
    <div v-if="!item.qtyable">
      <input
        :id="makeId(item.name + parentName + index)"
        v-model="data.select"
        :name="radioChoose"
        type="radio"
        hidden
        :value="item"
        :class="buttonClass == 'button-sub' ? 'input-sub' : ''"
        @change="reset"
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
    <div v-if="item.qtyable" class="d-flex justify-content-start">
      <input
        :id="`${makeId(item.name + parentName + index)}`"
        v-model="data.select"
        :name="radioChoose"
        type="radio"
        hidden
        :value="item"
        :class="buttonClass == 'button-sub' ? 'input-sub' : ''"
        @change="reset"
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
        @input="
          (e) => {
            data.select_text = e.target.value;
          }
        "
        :name="radioChoose"
        :disabled="disabled_text"
        type="text"
        style="width: 10vw; height: min-content"
        class="form-control ms-4"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelectComponent",
  // props: ["parentName", "item", "nameVar", "buttonClass"],
  props: {
    parentName: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
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
      default: "button-title",
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
      return this.buttonClass == "button-sub"
        ? "title" + this.makeId(this.parentName)
        : "sub" + this.makeId(this.parentName);
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
  methods: {
    reset() {
      // if (e.target.checked == false) {
      //   this.data = {
      //     select: "",
      //     select_text: "",
      //   };
      // }
      // this.data = {
      //   select: "",
      //   select_text: "",
      // };
      // console.log(e.target.checked);
      // console.log(JSON.parse(JSON.stringify(e)));
    },
  },
};
</script>

<style lang="scss"></style>
