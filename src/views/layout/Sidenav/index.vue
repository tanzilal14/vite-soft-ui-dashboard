<template>
  <aside
    id="sidenav-main"
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl overflow-hidden"
    :class="$store.state.isRTL ? 'me-3 rotate-caret' : 'ms-3'"
    :data-color="sidenavActiveBgColors"
  >
    <div class="sidenav-header">
      <a class="m-0" href="/">
        <img :src="logo" class="" alt="main_logo" />
      </a>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :card-bg="customClass" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/image/logo.png";

export default {
  name: "IndexComponent",
  components: {
    SidenavList,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      logo,
      sidenavActiveBgColors: "success",
    };
  },
};
</script>
