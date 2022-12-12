<template>
  <nav aria-label="breadcrumb">
    <h4 class="mb-0 font-weight-bolder" :class="textWhite ? 'text-white' : ''">
      {{ currentPage }}
    </h4>
    <hr class="p-0 mt-2" />
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb d-flex flex-row"
      :class="$store.state.isRTL ? '' : ' me-sm-6'"
    >
      <li
        v-for="(name, index) in $store.state.currentNamePage"
        :key="name"
        class="text-sm breadcrumb-item"
        :class="textWhite"
      >
        <router-link
          class="opacity-10"
          :to="$store.state.currentUrlPage[index]"
        >
          {{ name }}</router-link
        >
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "BreadcrumbsComponent",
  // setup() {
  //   this.currentPage = capitalising(this.currentPage);
  // },
  props: {
    currentPage: {
      required: true,
      type: String,
      default: "",
    },
    textWhite: {
      type: String,
      default: "",
    },
  },
  computed: {
    capitalising: function (data) {
      var capitalized = [];
      data.split(" ").forEach((word) => {
        capitalized.push(
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      });
      return capitalized.join(" ");
    },
  },
};
</script>
<style scoped>
.breadcrumb-item .router-link-exact-active {
  cursor: pointer;
  color: #006a4b;
  font-weight: 900;
}
</style>
