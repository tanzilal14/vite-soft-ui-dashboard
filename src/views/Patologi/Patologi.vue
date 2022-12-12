<template>
  <div class="py-4 container-fluid">
    <SearchLaboratorium />

    <form class="histology-form" @submit.prevent="">
      <div class="row">
        <DoctorInformation
          v-for="(item, index) in dokter"
          :key="index"
          v-model:name="item.name"
          v-model:phone="item.phone"
          v-model:alamat="item.alamat"
          v-model:email="item.email"
          :count="index"
          :countDokter="dokter.length"
          @hapus-dokter="hapusDokter($event)"
        />
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <div>
            <button
              class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
              @click="addDokter"
            >
              <i class="cursor-pointer fa fa-user-plus"></i> &nbsp; Add Dokter
            </button>
          </div>
        </div>
      </div>
      <div v-show="dokter[0].name != ''" class="row">
        <pre>{{ dokter }}</pre>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card mb-4">
            <div class="card-header pb-0 mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-primary">Patient Information</h5>
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      :class="[patienInformation ? 'active' : '']"
                      @click="togglePatienInformation()"
                    >
                      Information
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      :class="[patientCard ? 'active' : '']"
                      @click="togglePatienCard()"
                    >
                      Medical Reports
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <PatientInformation :patienInformation="patienInformation" />

              <PatientCard :patientCard="patientCard" :horizontalShow="false" />
            </div>
          </div>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <div>
          <router-link to="/form-patologi">
            <button
              class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
            >
              NEXT
            </button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DoctorInformation from "@/views/components/Histologi/DoctorInformation.vue";

import PatientInformation from "@/views/components/Histologi/PatientInformation.vue";
import PatientCard from "@/views/components/Histologi/PatientCard.vue";

import SearchLaboratorium from "@/views/components/Histologi/SearchLaboratorium.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Patologi",
  components: {
    PatientInformation,
    PatientCard,
    SearchLaboratorium,

    DoctorInformation,
  },

  data() {
    return {
      patienInformation: true,
      dokter: [
        {
          name: "",
          email: "",
          alamat: "",
          phone: "",
        },
      ],
      patientCard: false,

      box4: {
        sample_collection: "",
        sample_collection_text: "",
        sample_source: "",
        sample_source_text: "",
      },
    };
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Pemeriksaan"];
    this.$store.state.currentUrlPage = ["/patologi", "/form-patologi"];
    // this.$store.commit("setUrlPage", ["/histologi", "/histologi-request"]);
    // this.$store.commit("setNamePage", ["Information", "Request Form"]);
  },
  methods: {
    makeId(data) {
      return data.toLowerCase().split(" ").join("_");
    },

    addDokter() {
      this.dokter.push({
        name: "",
        email: "",
        alamat: "",
        phone: "",
      });
      console.log("tambah");

      console.log(this.dokter);
    },
    hapusDokter(index) {
      this.dokter.splice(index, 1);
      console.log("hapus");
      console.log(this.dokter);
    },
    togglePatienInformation() {
      this.patienInformation = true;

      this.patientCard = false;
    },

    togglePatienCard() {
      this.patienInformation = false;

      this.patientCard = true;
    },

    // ...mapMutations(["setNamePage", "setUrlPage"]),
  },
};
</script>

<style scoped></style>
