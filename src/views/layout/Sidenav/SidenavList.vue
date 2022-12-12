<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse"
  >
    <ul class="navbar-nav mt-5">
      <li class="nav-item">
        <sidenav-collapse nav-text="DASHBOARD" :to="{ name: 'Dashboard' }">
          <template #icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>

      <sidenav-multi
        :isDropdown="isDropdown1Click"
        mainNav="Feeder Form"
        :nav1="nav1"
        @dropdownGan="isDropdown1Click = !isDropdown1Click"
      ></sidenav-multi>

      <sidenav-multi
        :isDropdown="isDropdown2Click"
        mainNav="Track Record"
        :nav1="nav2"
        @dropdownGan="isDropdown2Click = !isDropdown2Click"
      ></sidenav-multi>
      <sidenav-multi
        :isDropdown="isDropdown3Click"
        mainNav="Result Form"
        :nav1="nav3"
        @dropdownGan="isDropdown3Click = !isDropdown3Click"
      ></sidenav-multi>

      <!-- <li class="nav-item">
        <sidenav-collapse nav-text="Clinician" :to="{ name: 'clinician' }">
          <template #icon>
            <icon name="components" />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse nav-text="FeederTransaction" :to="{ name: 'feeder' }">
          <template #icon>
            <icon name="components" />
          </template>
        </sidenav-collapse>
      </li>
      <!--
      <li class="nav-item">
        <sidenav-collapse nav-text="Trainer" :to="{ name: 'Trainer' }">
          <template #icon>
            <icon name="components" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Place" :to="{ name: 'Place' }">
          <template #icon>
            <icon name="tables" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Product" :to="{ name: 'Product' }">
          <template #icon>
            <icon name="foundation" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Transaction" :to="{ name: 'Transaction' }">
          <template #icon>
            <icon name="spaceship" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="User" :to="{ name: 'user' }">
          <template #icon>
            <i class="cursor-pointer fa fa-user"></i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Tnc" :to="{ name: 'tnc' }">
          <template #icon>
            <i class="cursor-pointer fa fa-book"></i>
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavMulti from "./SidenavMulti.vue";

export default {
  name: "SidenavList",
  components: {
    Icon,
    SidenavCollapse,
    SidenavMulti,
  },
  props: {
    cardBg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "Vite Soft UI Dashboard",
      controls: "dashboardsExamples",
      isActive: "active",
      isDropdown1Click: false,
      isDropdown2Click: false,
      isDropdown3Click: false,
      nav1: {
        name: [
          "Histologi",
          // "HPV DNA & LBC",
          // "Mikrobiologi",
          // "Molekuler IHC",
          // "Patologi Klinik",
          // "pGex",
          // "Sitologi",
        ],
        url: [
          "/histologi",
          // "/hpv",
          // "/mikrobiologi",
          // "/molekuler",
          // "/patologi",
          // "/pgex",
          // "/sitologi",
        ],
        icon: [
          "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
        ],
      },
      nav2: {
        name: [
          // "Cytopathology",
          // "Genomics Analysis",
          // "Genomics Analysis (NGS-Based)",
          // "Genomics Analysis (RNA Based)",
          "Histopathology",
          // "HLA Typing",
          // "HPV",
          // "IHC/CISH Analysis",
          // "LBC",
          // "MammaPrint",
          // "Panel Analysis",
        ],
        url: [
          "/track-record/histopathology",
          // "/hpv",
          // "/mikrobiologi",
          // "/molekuler",
          // "/patologi",
          // "/pgex",
          // "/sitologi",
        ],
        icon: [
          "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
        ],
      },
      nav3: {
        name: [
          // "Cytopathology",
          // "Genomics Analysis",
          // "Genomics Analysis (NGS-Based)",
          // "Genomics Analysis (RNA Based)",
          "Histologi & Sitologi",
          // "HLA Typing",
          // "HPV",
          // "IHC/CISH Analysis",
          // "LBC",
          // "MammaPrint",
          // "Panel Analysis",
        ],
        url: [
          "/result-form/histologi-sitologi",
          // "/hpv",
          // "/mikrobiologi",
          // "/molekuler",
          // "/patologi",
          // "/pgex",
          // "/sitologi",
        ],
        icon: [
          "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
          // "foundation",
        ],
      },
    };
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
<style scoped>
.dropdown-1 {
  margin-left: 2rem;
}
</style>
