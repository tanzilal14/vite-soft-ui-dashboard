<template>
  <pre class="d-none">
    {{ data }}
  </pre>
  <div class="py-4 container-fluid">
    <FormKit
      id="histologiForm"
      type="form"
      :actions="false"
      @submit="formAction"
    >
      <SearchLaboratorium
        name-var="lab"
        :data-source="data.lab"
        @input="updateData"
      />

      <div class="row">
        <ClinicianInformation
          v-for="(count, index) in data.clinicianInformation"
          :key="index"
          :count="index"
          :count-clinician="data.clinicianInformation.length"
          name-var="clinicianInformation"
          :data-source="count"
          @hapus-clinician="hapusClinician($event)"
          @update-input="updateDataHistologi"
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
          name-var="customerinformation"
          :data-source="data.customerinformation"
          @update-input="updateDataPatient"
        />
      </div>
      <card-box title="">
        <template #content>
          <tabs :tab-list="tabList" tab-name="Patient Information">
            <template #tabPanel-1>
              <PatientInformation
                :patien-information="true"
                :data-source="data.patientInformation"
                name-var="patientInformation"
                @update-input="updateDataPatient"
              />
            </template>
            <template #tabPanel-2>
              <PatientCard :patient-card="true" />
            </template>
          </tabs>
        </template>
      </card-box>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <div>
          <!-- <router-link to="/histologi-request"> -->
          <button
            class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
            @click="submitForm"
          >
            NEXT
          </button>
          <!-- </router-link> -->
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script>
import ClinicianInformation from "@/views/components/Histologi/ClinicianInformation.vue";
import CustomerInformation from "@/views/components/Histologi/CustomerInformation.vue";
import PatientInformation from "@/views/components/Histologi/PatientInformation.vue";
import PatientCard from "@/views/components/Histologi/PatientCard.vue";
import SearchLaboratorium from "@/views/components/Histologi/SearchLaboratorium.vue";
import CardBox from "../components/Layout/CardBox.vue";
import Tabs from "@/views/components/Layout/Tabs.vue";
// import Customer from "@/views/Customer.vue";
// import Clinician from "@/views/Clinician.vue";
// import Patient from "@/views/Patient.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Histology",
  components: {
    ClinicianInformation,
    CustomerInformation,
    PatientInformation,
    PatientCard,
    CardBox,
    SearchLaboratorium,
    // Customer,
    Tabs,
    // Clinician,
    // Patient,
  },
  data() {
    return {
      tabList: ["Information", "Medical Reports"],
      edit: true,
      updateClinician: true,

      data: {
        lab: {
          name: "",
          id: "",
        },
        clinicianInformation: [
          {
            name: "",
            phone: "",
            fax: "",
            email: "",
          },
        ],
        customerinformation: {
          address: "",
          customer_name: "",
          id: "",
          lab_email: "",
          lab_phone: "",
        },
        patientInformation: {
          name: "",
          id_type: "",
          id_number: "",
          medical_record: "",
          birth_date: "",
          sex: "",
          address: "",
          rt: "",
          rw: "",
          province: "",
          city: "",
          district: "",
          sub_district: "",
          phone: "",
          email: "",
          location: "",
        },
      },
    };
  },

  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = ["/histologi", "/histologi-request"];
  },
  mounted() {
    if (this.edit) {
      this.data.lab = { ...this.dataEdit.lab };
      this.data.clinicianInformation = [...this.dataEdit.getClinicians];
      this.data.customerinformation = this.dataEdit.customer;
      this.data.patientInformation = {
        id: this.dataEdit.patient.id,
        kalgen_id: this.dataEdit.patient.kalgen_id,
        name: this.dataEdit.patient.name,
        id_type: this.dataEdit.patient.identityType,
        id_number: this.dataEdit.patient.identityNumber,
        medical_record: this.dataEdit.patient.medicalRecordNumber,
        birth_date: this.dataEdit.patient.birthdate,
        sex: this.dataEdit.patient.gender,
        address: this.dataEdit.patient.address,
        rt: this.dataEdit.patient.rt,
        rw: this.dataEdit.patient.rw,
        province: {
          id: this.dataEdit.patient.subdistrict.district.city.province.id,
          name: this.dataEdit.patient.subdistrict.district.city.province.name,
        },
        city: {
          id: this.dataEdit.patient.subdistrict.district.city.id,
          name: this.dataEdit.patient.subdistrict.district.city.name,
        },
        district: {
          id: this.dataEdit.patient.subdistrict.district.id,
          name: this.dataEdit.patient.subdistrict.district.name,
        },
        sub_district: {
          id: this.dataEdit.patient.subdistrict.id,
          name: this.dataEdit.patient.subdistrict.name,
        },
        phone: this.dataEdit.patient.phone,
        email: this.dataEdit.patient.email,
        location: this.dataEdit.patient.subdistrict,
      };
    }
  },
  created() {
    this.edit = this.$route.query.edit;
    // this.edit = (this.edit === Object.keys(this.dataEdit).length) === 0;
    // alert(Object.keys(this.dataEdit).length === 0);
    if (this.edit) {
      this.dataEdit = this.$store.state.update_histologi;
      if (Object.keys(this.dataEdit).length === 0) {
        this.edit = false;
        this.$router.push("/histologi");
      }
    }
  },
  beforeUpdate() {
    if (this.edit && this.updateClinician) {
      this.data.clinicianInformation = [...this.dataEdit.getClinicians];
      this.data.lab = { ...this.dataEdit.lab };
      this.data.customerinformation = this.dataEdit.customer;

      // this.updateClinician = false;
    }
  },
  methods: {
    submitForm() {
      this.$formkit.submit("histologiForm");
    },
    formAction() {
      // this.fetchData();
      alert("all validated");
    },
    move() {
      this.$store.state.histologi.feed = this.data;
      this.$router.push("/histologi-request");
    },
    updateDataHistologi(data, nameVar, index) {
      this.data[nameVar][index] = data;
    },
    updateDataPatient(data, nameVar) {
      this.data[nameVar] = data;
    },

    addClinician() {
      this.data.clinicianInformation.push({
        name: "",
        phone: "",
        fax: "",
        email: "",
        id: "",
      });
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    hapusClinician(index) {
      this.data.clinicianInformation.splice(index, 1);
    },

    // ...mapMutations(["setNamePage", "setUrlPage"]),
  },
};
</script>

<style scoped></style>
