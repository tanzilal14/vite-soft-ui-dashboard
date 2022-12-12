<template>
  <div class="py-4 container-fluid">
    <SearchLaboratorium />

    <form class="histology-form" @submit.prevent="">
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
        <PathologistInformation
          v-for="(count, index) in countPathologist"
          :key="index"
          v-model:name="form.pathologistInformation.name"
          v-model:phone="form.pathologistInformation.phone"
          v-model:email="form.pathologistInformation.email"
          :count="index"
          @hapus-pathologist="hapusPathologist($event)"
          :countPathologist="countPathologist"
        />
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
          <div>
            <button
              class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
              @click="addPathologist"
            >
              <i class="cursor-pointer fa fa-user-plus"></i> &nbsp; Add
              Pathologist
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
      <card-box title="Sample Information">
        <template #content>
          <radio-input label="Sample Collection Method">
            <template #input-radio>
              <div
                v-for="(item, index) in ['Biopsy', 'Surgery', 'FNAB']"
                :key="index"
              >
                <input
                  :id="makeId(item)"
                  v-model="box4.sample_collection"
                  type="radio"
                  hidden
                  :value="item"
                />
                <label
                  :for="makeId(item)"
                  class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                  >{{ item }}
                </label>
              </div>
            </template>
            <template #input-text>
              <div v-for="(item, index) in ['Other']" :key="index">
                <input
                  :id="makeId(item)"
                  v-model="box4.sample_collection"
                  type="radio"
                  hidden
                  :value="item"
                />
                <label
                  :for="makeId(item)"
                  class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                  >{{ item }}
                </label>
              </div>
              <input
                v-model="box4.sample_collection_text"
                type="text"
                class="form-control p-0 m-0"
              />
            </template>
          </radio-input>
          <radio-input label="Sample Receiving Condition" :main="false">
            <template #input-radio-sub>
              <div
                v-for="(item, index) in ['Primer', 'Metastasis']"
                :key="index"
                class="col-md-2"
              >
                <input
                  :id="`${makeId(item)}_internal`"
                  v-model="box4.sample_source"
                  type="radio"
                  hidden
                  :value="item"
                />
                <label
                  :for="`${makeId(item)}_internal`"
                  class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                  >{{ item }}
                </label>
              </div>
              <div class="col-md-2">
                <input
                  v-model="box4.sample_source_text"
                  type="text"
                  class="form-control"
                />
              </div>
            </template>
          </radio-input>
        </template>
      </card-box>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <div>
          <router-link to="/form-molekuler">
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
  <!-- test -->
  <div class="py-4 container-fluid d-none">
    <div class="card">
      <div class="card-header">
        <h5>Cari Data Clininician</h5>
      </div>
      <div class="card-body">
        <div v-if="loading">Loading...</div>

        <div v-else-if="error">Error: {{ error.message }}</div>

        <!-- {{ clinician }} -->

        <ul v-else-if="result && clinician">
          <li v-for="user of clinician" :key="user.id">
            {{ user.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ClinicianInformation from "@/views/components/Histologi/ClinicianInformation.vue";
import PathologistInformation from "@/views/components/Histologi/PathologistInformation.vue";
import CustomerInformation from "@/views/components/Histologi/CustomerInformation.vue";
import PatientInformation from "@/views/components/Histologi/PatientInformation.vue";
import PatientCard from "@/views/components/Histologi/PatientCard.vue";
import RadioInput from "@/views/components/Input/RadioInput.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";

import SearchLaboratorium from "@/views/components/Histologi/SearchLaboratorium.vue";
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { reactive } from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Molekuler",
  components: {
    ClinicianInformation,
    CustomerInformation,
    PatientInformation,
    RadioInput,
    PatientCard,
    SearchLaboratorium,
    PathologistInformation,
    CardBox,
  },
  setup() {
    const form = reactive({
      clinicianInformation: {
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
      pathologistInformation: {
        name: "",
        phone: "",

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

    const { result, loading, error } = useQuery(gql`
      query {
        clinicians {
          nodes {
            email
            fax
            id
            name
            phone
          }
        }
      }
    `);

    const clinician = computed(() => result.value?.clinicians.nodes ?? []);

    return {
      form,
      result,
      clinician,
      loading,
      error,
    };
  },
  data() {
    return {
      patienInformation: true,

      patientCard: false,
      countCLinician: this.makeArray(0),
      countPathologist: this.makeArray(0),
      box4: {
        sample_collection: "",
        sample_collection_text: "",
        sample_source: "",
        sample_source_text: "",
      },
    };
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = ["/molekuler", "/form-molekuler"];
    // this.$store.commit("setUrlPage", ["/histologi", "/histologi-request"]);
    // this.$store.commit("setNamePage", ["Information", "Request Form"]);
  },
  methods: {
    makeId(data) {
      return data.toLowerCase().split(" ").join("_");
    },
    makeArray(highEnd) {
      var arr = [];
      var lowEnd = 0;
      while (lowEnd <= highEnd) {
        arr.push(lowEnd++);
      }

      return arr;
    },
    hapusClinician(indexClinician) {
      this.countCLinician.splice(indexClinician, 1);
    },
    addClinician() {
      this.countCLinician.push(this.countCLinician.length);
    },
    hapusPathologist(indexPathologist) {
      this.countPathologist.splice(indexPathologist, 1);
    },
    addPathologist() {
      this.countPathologist.push(this.countPathologist.length);
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
