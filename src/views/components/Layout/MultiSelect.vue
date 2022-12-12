<template>
  <hr style="height: 0.2rem" class="rounded" />
  <h6>{{ item.name }}</h6>

  <div v-for="(item2, index2) in item.children" :key="index2" class="">
    <div class="ms-2">
      <MultiSelectComponent
        :listProduct="listProduct"
        :parent-name="item.name"
        :item="item2"
        :index="index2"
        name-var="main"
        :button-class="classList[0]"
        :dataSource="data.main"
        @changeSub="updateData"
      />
    </div>

    <div v-if="item2.children" class="row">
      <div
        v-for="(item3, index3) in item2.children"
        :key="index3"
        :class="
          multiColumn.hasOwnProperty(index2) ? multiColumn[index2][0] : ''
        "
      >
        <div class="ms-4">
          <MultiSelectComponent
            :listProduct="listProduct"
            :parent-name="item.name"
            :item="item3"
            :index="index3"
            name-var="sub"
            :dataSource="data.sub"
            :button-class="classList[1]"
            @changeSub="updateData"
            :multiColumn="
              multiColumn.hasOwnProperty(index2) ? multiColumn[index2][1] : ''
            "
          />
        </div>

        <div v-if="item3.children" class="row">
          <div v-for="(item4, index4) in item3.children" :key="index4" class="">
            <div class="ms-6">
              <MultiSelectComponent
                :listProduct="listProduct"
                :parent-name="item.name"
                :item="item4"
                :index="index4"
                name-var="sub2"
                :dataSource="data.sub2"
                :button-class="classList[2]"
                @changeSub="updateData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelectComponent from "@/views/components/Layout/MultiSelectComponent.vue";

export default {
  name: "MultiSelect",
  components: {
    MultiSelectComponent,
  },
  // props: ["parent"],
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    listProduct: {
      type: Object,
      default: () => {},
    },
    nameVar: {
      type: String,
      default: "",
    },
    classList: {
      type: Array,
      default: () => {
        return ["button-title", "button-sub", "button-sub"];
      },
    },
    multiColumn: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["changeMain"],
  data() {
    return {
      disabled_text: true,
      data: {
        main: {
          select: "",
          select_text: "",
        },
        sub: {
          select: "",
          select_text: "",
        },
        sub2: {
          select: "",
          select_text: "",
        },
      },
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit("changeMain", newVal, this.nameVar);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
  },
};
</script>

<style lang="scss"></style>
