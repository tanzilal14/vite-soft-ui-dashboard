<template>
  <div
    :class="{
      flex: variant === 'horizontal',
    }"
    class="row"
  >
    <div class="col-md-6">
      <h4>{{ tabName }}</h4>
    </div>
    <div class="col-md-6 d-flex justify-content-end">
      <ul
        :class="{
          flex: variant === 'vertical',
        }"
        class="tab-ul"
      >
        <li v-for="(tab, index) in tabList" :key="index">
          <label
            :for="`${index}`"
            class="px-3 pt-1"
            :class="index + 1 === activeTab ? 'activeTab' : ''"
            v-text="tab"
          />
          <input
            :id="`${index}`"
            v-model="activeTab"
            type="radio"
            :name="`-tab`"
            hidden
            :value="index + 1"
          />
        </li>
      </ul>
    </div>

    <template v-for="(tab, index) in tabList">
      <div v-if="index + 1 === activeTab" :key="index">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    tabName: {
      type: String,
      default: "",
    },

    variant: {
      type: String,
      required: false,
      default: () => "vertical",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
  },

  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
