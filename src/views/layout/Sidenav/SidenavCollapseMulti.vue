<template>
  <li class="nav-item">
    <sidenav-collapse nav-text="Product" :to="{ name: 'Product' }">
      <template #icon>
        <icon name="foundation" />
      </template>
    </sidenav-collapse>
  </li>
  <ul>
    <li class="nav-item">
      <sidenav-collapse nav-text="Product" :to="{ name: 'Product' }">
        <template #icon>
          <icon name="foundation" />
        </template>
      </sidenav-collapse>
    </li>
  </ul>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import Icon from "@/components/Icon.vue";

export default {
  name: "SidenavCollapseMulti",
  components: {
    Icon,

    SidenavCollapse,
  },
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: true,
    };
  },
};
</script>

<style>
.nav-multi {
  list-style-type: none;
}
</style>
