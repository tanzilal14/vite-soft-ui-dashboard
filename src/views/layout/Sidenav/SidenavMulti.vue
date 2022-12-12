<template>
  <li class="nav-item d-flex align-items-center" @click="$emit('dropdownGan')">
    <sidenav-collapse :nav-text="mainNav" :to="nav1.url[0]">
      <template #icon>
        <icon :name="nav1.icon[0]" />
      </template>
    </sidenav-collapse>
    <i
      class="cursor-pointer fa"
      :class="[isDropdown ? 'fa-chevron-down' : 'fa-chevron-up']"
    ></i>
  </li>
  <li
    v-for="(item, index) in nav1.name"
    :key="index"
    class="nav-item dropdown-1 animate__animated animate__fadeInLeft"
    :class="[isDropdown ? '' : 'd-none']"
  >
    <sidenav-collapse :nav-text="item" :to="nav1.url[index]">
      <template #icon>
        <icon :name="nav1.icon[index]" />
      </template>
    </sidenav-collapse>
  </li>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavMulti",
  components: {
    Icon,
    SidenavCollapse,
  },

  props: {
    isDropdown: {
      required: true,
      default: false,
      type: Boolean,
    },
    nav1: {
      required: true,

      type: Object,
    },
    mainNav: {
      required: true,
      default: "Default Sub",
      type: String,
    },
  },
  emits: ["dropdownGan"],
  data() {
    return {
      showDropdown: this.isDropdown,
    };
  },
  methods: {},
};
</script>
<style scoped>
.dropdown-1 {
  margin-left: 2rem;
}
</style>
