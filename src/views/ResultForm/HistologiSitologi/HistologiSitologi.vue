<template>
  <div class="py-4 container-fluid">
    <form class="" @submit.prevent="">
      <card-box title="">
        <template #content>
          <div class="row">
            <div class="col-md-6">
              <div class="row mt-4">
                <div class="col">
                  <TextInputSingle
                    label="Dr."
                    :file="data.dr_name"
                    name-var="dr_name"
                    @update-data="updateData"
                  />
                </div>
                <div class="col d-flex align-items-center">
                  <div>
                    <button
                      class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                    >
                      <i class="cursor-pointer fa fa-user-plus icon-medium"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <multi-radio>
                  <template #main-radio>
                    <div
                      v-for="(item, index) in ['Clinician', 'Pathologist']"
                      :key="index"
                      class="col-auto"
                    >
                      <input
                        :id="makeId(item)"
                        v-model="data.dr_type"
                        type="radio"
                        :value="item"
                        hidden
                      />
                      <label
                        :for="makeId(item)"
                        class="button-title btn-sm null null ms-auto"
                      >
                        <strong>{{ item }}</strong>
                      </label>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="row">
                <SelectInputSingle
                  label="Hospital"
                  :options="data.options_hospital"
                  :file="data.options_hospital[0]"
                  name-var="hospital_choose"
                  @input="updateData"
                />
              </div>
              <div class="row">
                <SelectInputSingle
                  label="City"
                  :options="data.options_city"
                  :file="data.options_city[0]"
                  name-var="city_choose"
                  @input="updateData"
                />
              </div>
              <div class="row">
                <TextInputSingle
                  label="Ref."
                  :file="data.ref"
                  name-var="ref"
                  @update-data="updateData"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col d-flex align-items-center justify-content-end">
                  <span class="mx-4">Jakarta,</span>
                  <DateInputSingle
                    :only-form="true"
                    :file="data.date"
                    name-var="date"
                    @input="updateData"
                  />
                </div>
              </div>
              <div class="row mx-5">
                <div class="col d-flex align-items-center justify-content-end">
                  <div>
                    <button
                      class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                    >
                      <i class="cursor-pointer fa fa-book icon-medium"></i>
                      &nbsp; Review Patient Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </card-box>
      <card-box title="">
        <template #content>
          <tabs :tab-list="tabList" tab-name="">
            <template #tabPanel-1>
              <div class="row">
                <div class="col d-flex align-items-center">
                  <h6 class="me-4">Dear dr.</h6>
                  <TextInputSingle
                    :only-form="true"
                    :file="data.dear_dr"
                    name-var="dear_dr"
                    @update-data="updateData"
                  />
                </div>
                <h6 class="my-2">
                  We would like to inform you about the outcome of the Histology
                  & Cytology test of the following case:
                </h6>
                <DateInputSingle
                  :only-form="false"
                  label="Received Date"
                  :file="data.date"
                  name-var="date"
                  @input="updateData"
                />
                <TextInputSingle
                  label="Kalgen ID"
                  :file="data.kalgen_id"
                  name-var="kalgen_id"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="PA Number"
                  :file="data.pa_number"
                  name-var="pa_number"
                  @update-data="updateData"
                />

                <text-input label="Patient ID Number">
                  <template #input>
                    <div class="row">
                      <div class="col-md-6">
                        <multi-radio>
                          <template #main-radio>
                            <div
                              v-for="(item, index) in ['KTP', 'Passport']"
                              :key="index"
                              class="col-auto"
                            >
                              <input
                                :id="makeId(item)"
                                v-model="data.patient_id_card"
                                type="radio"
                                :value="item"
                                hidden
                              />
                              <label
                                :for="makeId(item)"
                                class="button-title btn-sm null null ms-auto"
                              >
                                <strong>{{ item }}</strong>
                              </label>
                            </div>
                          </template>
                        </multi-radio>
                      </div>

                      <div class="col-md-6">
                        <TextInputSingle
                          :only-form="true"
                          :file="data.patient_id"
                          name-var="patient_id"
                          @update-data="updateData"
                        />
                      </div>
                    </div>
                  </template>
                </text-input>

                <TextInputSingle
                  label="Patient Name"
                  :file="data.patient_name"
                  name-var="patient_name"
                  @update-data="updateData"
                />
                <text-input label="Sex">
                  <template #input>
                    <div class="row">
                      <multi-radio>
                        <template #main-radio>
                          <div
                            v-for="(item, index) in ['Man', 'Woman']"
                            :key="index"
                            class="col-auto"
                          >
                            <input
                              :id="makeId(item)"
                              v-model="data.patient_sex"
                              type="radio"
                              :value="item"
                              hidden
                            />
                            <label
                              :for="makeId(item)"
                              class="button-title btn-sm null null ms-auto"
                            >
                              <strong>{{ item }}</strong>
                            </label>
                          </div>
                        </template>
                      </multi-radio>
                    </div>
                  </template>
                </text-input>
                <div class="row">
                  <label class="col-form-label col-md-2">Birth Date</label>
                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-md-6">
                        <input
                          v-model="data.patient_birth_date"
                          type="text"
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-6 d-flex align-items-center">
                        <label class="col-form-label col-md-2 mx-2">Age</label>
                        <input
                          v-model="data.patient_age"
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
                  label="Test Type"
                  :file="data.test_type"
                  name-var="test_type"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="Ukuran Jaringan"
                  :file="data.ukuran_jaringan"
                  name-var="ukuran_jaringan"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="Asal Jaringan"
                  :file="data.asal_jaringan"
                  name-var="asal_jaringan"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="Specimen"
                  :file="data.specimen"
                  name-var="specimen"
                  @update-data="updateData"
                />
                <TextAreaSingle
                  :full-width="false"
                  label="Clinical Diagnosis"
                  :file="data.clinical_diagnosis"
                  name-var="clinical_diagnosis"
                  @update-data="updateData"
                />

                <TextInputSingle
                  label="Internal Pathologist"
                  :file="data.internal_pathologist"
                  name-var="internal_pathologist"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="Quantity of Block"
                  :file="data.quantity_block"
                  name-var="quantity_block"
                  @update-data="updateData"
                />

                <TextAreaSingle
                  :full-width="false"
                  label="Result"
                  :file="data.result"
                  name-var="result"
                  @update-data="updateData"
                />
                <TextAreaSingle
                  :full-width="false"
                  label="Note"
                  :file="data.note"
                  name-var="note"
                  @update-data="updateData"
                />
                <TextInputSingle
                  label="Keterangan Hasil"
                  :file="data.keterangan_hasil"
                  name-var="keterangan_hasil"
                  @update-data="updateData"
                />
                <div class="row mt-5">
                  <div class="col-md-4">
                    <label class="col-form-label d-block"
                      >Sincerely yours,
                    </label>
                    <input
                      type="text"
                      class="p-5"
                      style="width: 50px"
                      placeholder="TTD"
                    />
                    <TextInputSingle
                      :only-form="true"
                      :file="data.sign_name"
                      name-var="sign_name"
                      @update-data="updateData"
                    />
                    <TextInputSingle
                      :only-form="true"
                      :file="data.sign_type"
                      name-var="sign_type"
                      @update-data="updateData"
                    />
                  </div>
                </div>
                <hr class="rounded-1 my-3" style="height: 0.2rem" />
                <TextAreaSingle
                  :full-width="false"
                  label="References"
                  :file="data.references"
                  name-var="references"
                  @update-data="updateData"
                />
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button
                    class="btn mb-0 bg-secondary-gradient btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                  >
                    <span class="">Cancel</span>
                  </button>
                  <div>
                    <button
                      class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                    >
                      <span class="">Save</span>
                    </button>
                  </div>
                </div>
                <div
                  class="col d-flex justify-content-end mt-4 align-items-center"
                >
                  <input
                    id="not_using"
                    v-model="data.failed"
                    type="checkbox"
                    name=""
                  />
                  <label class="ms-2 not_using failed-color" for="not_using"
                    >Failed to process the sample</label
                  >
                </div>
              </div>
            </template>
            <template #tabPanel-2>
              <PatientCard :patient-card="true" />
            </template>
          </tabs>
        </template>
      </card-box>
    </form>
  </div>
</template>

<script>
import CardBox from "@/views/components/Layout/CardBox.vue";
import Tabs from "@/views/components/Layout/Tabs.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import MultiRadio from "@/views/components/Input/MultiRadio.vue";
import SelectInputSingle from "@/views/components/Input/SelectInputSingle.vue";
import DateInputSingle from "@/views/components/Input/DateInputSingle.vue";
import TextInput from "@/views/components/Input/TextInput.vue";
import TextAreaSingle from "@/views/components/Input/TextAreaSingle.vue";
import PatientCard from "@/views/components/Histologi/PatientCard.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HistologiSitologi",
  components: {
    CardBox,
    TextInputSingle,
    MultiRadio,
    SelectInputSingle,
    DateInputSingle,
    Tabs,
    PatientCard,
    TextInput,
    TextAreaSingle,
  },

  data() {
    return {
      tabList: ["Result Form", "Medical Reports"],
      data: {
        dr_name: "",
        dr_type: "",
        options_hospital: ["RS A", "RS B", "RS C"],
        hospital_choose: "",
        options_city: ["City  A", "City  B", "City  C"],
        city_choose: "",
        ref: "",
        date: "",
        dear_dr: "",
        received_date: "",
        kalgen_id: "",
        pa_number: "",
        patient_id: "",
        patient_id_card: "",
        patient_name: "",
        patient_sex: "",
        patient_birth_date: "",
        patient_age: "",
        test_type: "",
        ukuran_jaringan: "",
        asal_jaringan: "",
        specimen: "",
        clinical_diagnosis: "",
        internal_pathologist: "",
        quantity_block: "",
        result: "",
        note: "",
        keterangan_hasil: "",
        sign_name: "",
        sign_type: "",
        references: "",
        failed: "",
      },
    };
  },
  beforeMount() {
    this.$store.state.currentNamePage = ["Information", "Request Form"];
    this.$store.state.currentUrlPage = [
      "/result-form/histologi-sitologi",
      "/histologi-request",
    ];
    // this.$store.commit("setUrlPage", ["/histologi", "/histologi-request"]);
    // this.$store.commit("setNamePage", ["Information", "Request Form"]);
  },
  methods: {
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    makeId(data) {
      return data.toLowerCase().split(" ").join("_");
    },
  },
};
</script>

<style scoped></style>
