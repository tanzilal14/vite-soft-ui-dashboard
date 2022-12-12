<template>
  <div class="py-4 container-fluid">
    <SearchLaboratorium />
    <form action="" class="histology-form" @submit.prevent="">
      <div class="row">
        <ClinicianInformation
          v-for="(count, index) in countCLinician"
          :key="index"
          v-model:name="form.clinicianInformation.name"
          v-model:phone="form.clinicianInformation.phone"
          v-model:fax="form.clinicianInformation.fax"
          v-model:email="form.clinicianInformation.email"
          :count="index"
          @hapus-clinician="hapusClinician($event)"
          :countCLinician="countCLinician"
        />
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <div>
            <button
              class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
              @click="addClinician"
            >
              <i class="cursor-pointer fa fa-user-plus"></i> &nbsp; Add
              Clinician
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <CustomerInformation
          v-model:customer_id="form.customerinformation.customer_id"
          v-model:customer_name="form.customerinformation.customer_name"
          v-model:customer_address="form.customerinformation.customer_address"
          v-model:lab_phone="form.customerinformation.lab_phone"
          v-model:lab_email="form.customerinformation.lab_email"
        />
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
                      :class="[patientVisit ? 'active' : '']"
                      @click="togglePatienVisit()"
                    >
                      Past Visit
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
              <PatientVisit :patientVisit="patientVisit" />
              <PatientCard :patientCard="patientCard" />
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div>
                  <router-link to="/form-sitologi">
                    <button
                      class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                    >
                      NEXT
                    </button>
                  </router-link>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ClinicianInformation from "@/views/components/Histologi/ClinicianInformation.vue";
import CustomerInformation from "@/views/components/Histologi/CustomerInformation.vue";
import PatientInformation from "@/views/components/Histologi/PatientInformation.vue";
import PatientCard from "@/views/components/Histologi/PatientCard.vue";
import PatientVisit from "@/views/components/Histologi/PatientVisit.vue";
import SearchLaboratorium from "@/views/components/Histologi/SearchLaboratorium.vue";
import { reactive } from "vue";

export default {
  name: "Sitology",
  components: {
    ClinicianInformation,
    CustomerInformation,
    PatientInformation,
    PatientVisit,
    PatientCard,
    SearchLaboratorium,
  },
  setup() {
    const form = reactive({
      clinicianInformation: {
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
      customerinformation: {
        customer_id: "",
        customer_name: "",
        customer_address: "",
        lab_phone: "",
        lab_email: "",
      },
    });

    return { form };
  },
  data() {
    return {
      patienInformation: true,
      patientVisit: false,
      patientCard: false,
      countCLinician: [0],
    };
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = ["/sitologi", "/form-sitologi"];
  },
  methods: {
    hapusClinician(indexClinician) {
      this.countCLinician.splice(indexClinician, 1);
    },
    addClinician() {
      this.countCLinician.push(this.countCLinician.length);
    },
    togglePatienInformation() {
      this.patienInformation = true;
      this.patientVisit = false;
      this.patientCard = false;
    },
    togglePatienVisit() {
      this.patienInformation = false;
      this.patientVisit = true;
      this.patientCard = false;
    },
    togglePatienCard() {
      this.patienInformation = false;
      this.patientVisit = false;
      this.patientCard = true;
    },
  },
};
</script>

<style lang="scss"></style>
