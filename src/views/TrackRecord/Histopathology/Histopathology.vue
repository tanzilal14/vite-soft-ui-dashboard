<template>
  <div class="py-4 container-fluid">
    <form class="" @submit.prevent="">
      <card-box title="">
        <template #content>
          <TextInputSingle
            label="KalGen Innolab ID"
            :file="data.kalgenid"
            name-var="kalgenid"
            @update-data="updateData"
          />

          <div class="row">
            <label class="col-form-label col d-flex justify-content-start"
              >Patient Name</label
            >
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-6">
                  <input
                    v-model="data.patient_name"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 d-flex align-items-center">
                  <label
                    class="col-form-label col d-flex justify-content-start mx-2"
                    >Age</label
                  >
                  <input
                    v-model="data.age"
                    type="number"
                    class="form-control mx-2"
                  />
                  <p>years</p>
                </div>
              </div>
            </div>
          </div>
          <br />

          <TextInputSingle
            label="Clinician / Pathologist"
            :file="data.clinician_patologist"
            name-var="clinician_patologist"
            @update-data="updateData"
          />
          <text-input label="Hospital">
            <template #input>
              <v-select
                v-model="data.hospital"
                :options="['RS A', 'RS B', 'RS C']"
              ></v-select>
            </template>
          </text-input>

          <TextInputSingle
            label="Analysis Requested"
            :file="data.analysis_request"
            name-var="analysis_request"
            @update-data="updateData"
          />
          <text-input label="Analysis Date started">
            <template #input>
              <Datepicker
                v-model="data.analysis_date"
                :enable-time-picker="false"
              >
              </Datepicker>
            </template>
          </text-input>
          <text-input label="Notes">
            <template #input>
              <textarea
                id=""
                v-model="data.note"
                name=""
                class="form-control"
                cols="20"
                rows="5"
              ></textarea>
            </template>
          </text-input>
          <div class="row"></div>
        </template>
      </card-box>
      <card-box title="Analysis Steps">
        <template #content>
          <form-sign>
            <template #input>
              <SubFormSign
                v-for="(item, index) in data.analysis_step"
                :key="index"
                :label="item.name"
                :file="item.value"
                :index="index"
                :sign="index == 0 ? true : false"
                name-var="analysis_step"
                @update-data="updateData1"
              />
            </template>
          </form-sign>
        </template>
      </card-box>
      <card-box title="Recutting">
        <template #content>
          <form-sign>
            <template #input>
              <SubFormSign
                v-for="(item, index) in data.recutting"
                :key="index"
                :label="item.name"
                :file="item.value"
                :index="index"
                :sign="index == 0 ? true : false"
                name-var="recutting"
                @update-data="updateData1"
              />
            </template>
          </form-sign>
        </template>
      </card-box>
      <card-box title="Deeper">
        <template #content>
          <form-sign>
            <template #input>
              <SubFormSign
                v-for="(item, index) in data.deeper"
                :key="index"
                :label="item.name"
                :file="item.value"
                :index="index"
                :sign="false"
                name-var="deeper"
                @update-data="updateData1"
              />
            </template>
          </form-sign>
        </template>
      </card-box>
      <card-box title="">
        <template #content>
          <div class="row">
            <div class="col-md-6">
              <TextInputSingle
                label="PA Number"
                :file="data.pa_number"
                name-var="pa_number"
                @update-data="updateData"
              />
            </div>
            <div class="col-md-6">
              <TextInputSingle
                label="KalGen Innolab ID"
                :file="data.kalgenid_2"
                name-var="kalgenid_2"
                @update-data="updateData"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <TextInputSingle
                label="Patient Name"
                :file="data.patient_name_2"
                name-var="patient_name_2"
                @update-data="updateData"
              />
            </div>
            <div class="col-md-6">
              <TextInputSingle
                label="Age"
                :file="data.age_2"
                name-var="age_2"
                @update-data="updateData"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <TextAreaSingle
                label="Macroscopic/ Description"
                :file="data.macroscopic"
                name-var="macroscopic"
                @update-data="updateData"
              />
            </div>
          </div>
        </template>
      </card-box>
      <card-box title="">
        <template #content>
          <div class="row">
            <div class="col-md-6">
              <TextInputSingle
                label="PA Number"
                :file="data.pa_number_2"
                name-var="pa_number_2"
                @update-data="updateData"
              />
            </div>
            <div class="col-md-6">
              <TextInputSingle
                label="KalGen Innolab ID"
                :file="data.kalgenid_3"
                name-var="kalgenid_3"
                @update-data="updateData"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <TextInputSingle
                label="Patient Name"
                :file="data.patient_name_3"
                name-var="patient_name_3"
                @update-data="updateData"
              />
            </div>
            <div class="col-md-6">
              <TextInputSingle
                label="Age"
                :file="data.age_3"
                name-var="age_3"
                @update-data="updateData"
              />
            </div>
          </div>

          <TextAreaSingle
            label="Microscopic"
            :file="data.microscopic"
            name-var="microscopic"
            @update-data="updateData"
          />
          <TextAreaSingle
            label="Conclusion"
            :file="data.conclusion"
            name-var="conclusion"
            @update-data="updateData"
          />
        </template>
      </card-box>
    </form>
  </div>
</template>

<script>
import CardBox from "@/views/components/Layout/CardBox.vue";
import TextInput from "@/views/components/Input/TextInput.vue";
import TextAreaSingle from "@/views/components/Input/TextAreaSingle.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import FormSign from "@/views/components/Layout/FormSign.vue";
import SubFormSign from "@/views/components/Layout/SubFormSign.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Histopathology",
  components: {
    CardBox,
    TextInput,
    TextInputSingle,
    FormSign,
    SubFormSign,
    TextAreaSingle,
  },

  data() {
    return {
      data: {
        kalgenid: "",
        patient_name: "",
        age: "",
        clinician_patologist: "",
        hospital: "",
        analysis_request: "",
        analysis_date: "",
        note: "",
        analysis_step: [
          {
            name: "Cutting Out",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Tissue Processing",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Embedding",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Cutting Block FFPE",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "HE Staining",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
        ],
        recutting: [
          {
            name: "Cutting Out",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Tissue Processing",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Embedding",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "Cutting Block FFPE",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "HE Staining",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
        ],
        deeper: [
          {
            name: "Cutting Block FFPE",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
          {
            name: "HE Staining",
            value: {
              date: "",
              analyst_name: "",
              sign: "",
            },
          },
        ],
        pa_number: "",
        kalgenid_2: "",
        patient_name_2: "",
        age_2: "",
        pa_number_2: "",
        kalgenid_3: "",
        patient_name_3: "",
        age_3: "",
        macroscopic: "",
        microscopic: "",
        conclusion: "",
      },
    };
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = [
      "/track-record/histopathology",
      "/histologi-request",
    ];
    // this.$store.commit("setUrlPage", ["/histologi", "/histologi-request"]);
    // this.$store.commit("setNamePage", ["Information", "Request Form"]);
  },
  methods: {
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },

    updateData1(data, nameVar, index) {
      this.data[nameVar][index].value = data;
    },
  },
};
</script>

<style scoped></style>
