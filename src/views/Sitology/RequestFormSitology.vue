<template>
  <div class="py-4 container-fluid">
    <div id="swalFormRequest" class="card d-none">
      <div class="card-header bg-primary">
        <div class="row">
          <h3 class="text-white p-3">Konfirmasi Pesanan</h3>
        </div>
      </div>
      <div class="card-body px-md-9">
        <div class="row">
          <h4 class="text-primary d-flex justify-content-start">
            Customer Information
          </h4>
          <div class="row mt-3">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Customer Name</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>RS EMC Pulomas</h6>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Patient Name</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>Joe</h6>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Birth Date (DMY)</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>07-04-2000</h6>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Sex</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>Male</h6>
            </div>
          </div>
        </div>
        <hr class="rounded-1" style="height: 0.2rem" />
        <div class="row">
          <h4 class="text-primary d-flex justify-content-start">
            Clinician Information
          </h4>
          <div class="row mt-3">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Clinician Name</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>Ryan</h6>
            </div>
          </div>
        </div>
        <hr class="rounded-1" style="height: 0.2rem" />
        <div class="row">
          <h4 class="text-primary d-flex justify-content-start">
            Request Form
          </h4>
          <div class="row mt-3">
            <div class="col-md-6 d-flex justify-content-start">
              <h6>Result Reporting Method</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <h6>Email: mail@mail.com</h6>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-4 d-flex justify-content-start">
              <h6>Test(s) Requested</h6>
            </div>
            <div
              class="col-md-8 d-flex justify-content-end align-items-end flex-column"
            >
              <h6 class="font-weight-bolder">Pathological Tissue Microscopy</h6>
              <p class="p-0 m-0">InnoCT - Medium Size</p>
              <p class="p-0 m-0">Solid tissue (4-8 cm)</p>

              <h6 class="font-weight-bolder mt-3">Additional Service</h6>
              <p class="p-0 m-0">
                Pathology review / second opinion (per 2 slides)
              </p>
              <p class="p-0 m-0">Slides: 2</p>
            </div>
          </div>
        </div>
        <hr class="rounded-1" style="height: 0.2rem" />
      </div>
    </div>
    <form class="histologi-request" @submit.prevent="">
      <div class="row">
        <card-box title="Request Form">
          <template #content>
            <text-input label="Note">
              <template #input>
                <input v-model="box1.note" type="text" class="form-control" />
              </template>
            </text-input>

            <radio-input label="Result Reporting Method">
              <template #input-radio>
                <div
                  v-for="(item, index) in ['Take Out', 'Delivery']"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box1.result_reporting_method"
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
                <div v-for="(item, index) in ['Email']" :key="index">
                  <input
                    :id="makeId(item)"
                    v-model="box1.result_reporting_method"
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
                  v-model="box1.result_reporting_method_email"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
          </template>
        </card-box>
        <card-box title="Sample Information">
          <template #content>
            <text-input label="Specimen Location">
              <template #input>
                <input
                  v-model="box2.specimen"
                  type="text"
                  class="form-control"
                />
              </template>
            </text-input>

            <radio-input label="Hormon Status">
              <template #input-radio>
                <div
                  v-for="(item, index) in [
                    'Pre-menopause',
                    'Menopause',
                    'Post natal',
                    'Pregnant',
                  ]"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box2.hormon_status"
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
                <div
                  v-for="(item, index) in [
                    'First day of last menstruation (HPHT)',
                  ]"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box2.hormon_status"
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
                  v-model="box2.hormon_status_text"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>

            <radio-input label="Gynaecology Status">
              <template #input-radio>
                <div
                  v-for="(item, index) in [
                    'Normal',
                    'Erosion',
                    'Leucorrhea',
                    'Abnormal discharge',
                    'Coital / contact bleed',
                  ]"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box2.gynaecology_status"
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
                <div v-for="(item, index) in ['Others']" :key="index">
                  <input
                    :id="`${makeId(item)}_gyn`"
                    v-model="box2.gynaecology_status"
                    type="radio"
                    hidden
                    :value="item"
                  />
                  <label
                    :for="`${makeId(item)}_gyn`"
                    class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                    >{{ item }}
                  </label>
                </div>
                <input
                  v-model="box2.gynaecology_status_text"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
            <radio-input label="Fixation">
              <template #input-radio>
                <div
                  v-for="(item, index) in ['Alcohol 96%', 'Dry fixation']"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box2.fixation"
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
                <div v-for="(item, index) in ['Others']" :key="index">
                  <input
                    :id="`${makeId(item)}_fix`"
                    v-model="box2.fixation"
                    type="radio"
                    hidden
                    :value="item"
                  />
                  <label
                    :for="`${makeId(item)}_fix`"
                    class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                    >{{ item }}
                  </label>
                </div>
                <input
                  v-model="box2.fixation_text"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
          </template>
        </card-box>

        <card-box title="Test(s) Requested">
          <template #content
            ><div class="row">
              <div class="col-md-6">
                <hr class="rounded-2" style="width: 90%; height: 0.2rem" />

                <div class="row mt-4">
                  <div class="col">
                    <h6>General Cytology</h6>
                  </div>
                </div>
                <multi-radio
                  v-for="(item, index) in [
                    'Fine needle aspiration biopsy (FNAB)',
                    'Trans bronchial needle aspiration (TBNA)',
                    'Trans thoracal needle aspiration (TTNA)',
                    'Bronchoalveolar lavage (BAL)',
                    'Bronchial brushing',
                    'Bronchial washing',
                    'Body fluid',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.general_cytology_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div
                      v-for="(item, index) in [
                        'Pleural efusion',
                        'Cerebro spinal fluid (CSF)',
                        'Cyst fluid',
                        'Ascites',
                      ]"
                      :key="index"
                      class="mx-4"
                    >
                      <input
                        :id="makeId(item)"
                        v-model="box2.general_cytology_sub"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="makeId(item)"
                        class="button-sub-custom btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                  <template #sub-radio-input>
                    <div v-for="(item, index) in ['Others']" :key="index">
                      <input
                        :id="`${makeId(item)}_cyt`"
                        v-model="box2.general_cytology_sub"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="`${makeId(item)}_cyt`"
                        class="button-sub-custom btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                  <template #sub-radio-input-text>
                    <input
                      v-model="box2.general_cytology_sub_text"
                      type="text"
                      placeholder="Insert Total Hours"
                      class="form-control"
                    />
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in ['Sputum 1x', 'Sputum 3x', 'Urine']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.general_cytology_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <hr style="width: 90%; height: 0.2rem" />
                <h5>Gynaecology</h5>
                <multi-radio
                  v-for="(item, index) in ['Conventional Pap smear review']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.gynaecology"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
              </div>
              <div class="col-md-6">
                <hr style="width: 90%; height: 0.2rem" />
                <div class="row">
                  <div class="col">
                    <h5>Additional Service</h5>
                  </div>
                  <h6>Special Requests</h6>
                </div>
                <multi-radio
                  v-for="(item, index) in ['TB suspected review']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.additional_service_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'Add : Unstained slide',
                    'Add : Papanicolaou slide',
                    'Add : Giemsa slide',
                    'Add : H&E slide',
                  ]"
                  :key="index"
                >
                  <template #main-radio-input-title>
                    <input
                      :id="makeId(item)"
                      v-model="box2.additional_service_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                  <template #main-radio-input-text>
                    <input
                      v-model="box2.additional_service_main_text"
                      type="text"
                      placeholder="Insert Quantity"
                      class="form-control"
                    />
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in ['Produce a Cell block']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.general_cytology_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <hr style="width: 90%; height: 0.2rem" />
                <multi-radio
                  v-for="(item, index) in [
                    'Processing cytology_ PA only, without review',
                    'Pathology review / second opinion (per 2 slides)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.additional_service_main"
                      type="radio"
                      :value="item"
                      hidden
                      class=""
                    />
                    <label
                      :for="makeId(item)"
                      class="button-title-custom text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in ['Slide', 'FFPE']"
                  :key="index"
                >
                  <template #sub-radio-input>
                    <div class="mx-4 col-md-2 box-test-sub-1">
                      <input
                        :id="makeId(item)"
                        v-model="box2.additional_service_sub"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="makeId(item)"
                        class="button-sub btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                  <template #sub-radio-input-text>
                    <input
                      v-model="box2.additional_service_sub_text"
                      type="text"
                      placeholder="Insert Total Hours"
                      class="form-control"
                    />
                  </template>
                </multi-radio>
              </div>
            </div>
          </template>
        </card-box>

        <card-box title="Additional Service">
          <template #content>
            <text-area-input label="Clinical diagnosis">
              <template #input>
                <textarea
                  id=""
                  v-model="box3.clinical_diagnosis"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
              </template>
            </text-area-input>
            <text-area-input
              label="Main symptom and description of the disease"
            >
              <template #input>
                <textarea
                  id=""
                  v-model="box3.main_symptom"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
              </template>
            </text-area-input>
            <text-area-input
              label="Previous cytology or histopathology testing result"
            >
              <template #input>
                <textarea
                  id=""
                  v-model="box3.previous_cytology"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
              </template>
            </text-area-input>
          </template>
        </card-box>
        <card-box title="Internal Use Only">
          <template #content>
            <radio-input label="Patient Type">
              <template #input-radio>
                <div
                  v-for="(item, index) in [
                    'Private',
                    'Corporate',
                    'Government',
                    'Insurance',
                    'Pharma',
                  ]"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="box3.patient_type"
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
                <div v-for="(item, index) in ['Others']" :key="index">
                  <input
                    :id="`${makeId(item)}_internal`"
                    v-model="box3.patient_type"
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
                <input
                  v-model="box3.patient_text"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
            <radio-input label="Order Type ">
              <template #input-radio>
                <div v-for="(item, index) in ['VVIP', 'Courier']" :key="index">
                  <input
                    :id="makeId(item)"
                    v-model="box3.order_type"
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
            </radio-input>
            <radio-input label="Sample Receiving Condition" :main="false">
              <template #input-radio-sub>
                <div
                  v-for="(item, index) in ['Good', 'Not Good']"
                  :key="index"
                  class="col-md-2"
                >
                  <input
                    :id="`${makeId(item)}_internal`"
                    v-model="box3.order_type"
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
                    v-model="box3.order_type_text"
                    type="text"
                    class="form-control"
                  />
                </div>
              </template>
              <template #input-radio-sub-addition>
                <div class="col-md-3">
                  <label class="">Courier</label>
                  <input
                    id=""
                    v-model="box3.courier"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <label class="">Receiver</label>
                  <input
                    id=""
                    v-model="box3.receiver"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <label class="">Innolab ID</label>
                  <input
                    id=""
                    v-model="box3.innolab_id"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </div>
              </template>
            </radio-input>
          </template>
        </card-box>

        <card-box title="Terms And Conditions">
          <template #content>
            <div class="row">
              <div class="col">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Omnis, nemo placeat. Aspernatur ipsa ducimus eum porro,
                  commodi ipsum doloremque blanditiis eius corporis mollitia,
                  praesentium ipsam quaerat at, itaque illo nisi!
                </p>
              </div>
            </div>
          </template>
        </card-box>

        <card-box title="Other Order / Comment">
          <template #content>
            <text-area-input label="">
              <template #input>
                <textarea
                  id=""
                  v-model="box3.other_text"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
              </template>
            </text-area-input>
          </template>
        </card-box>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            class="btn mb-0 bg-secondary-gradient btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
          >
            <span class="">Cancel</span>
          </button>
          <div>
            <button
              class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
              @click="showRequest"
            >
              <span class="">Save</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TextInput from "@/views/components/Input/TextInput.vue";
import RadioInput from "@/views/components/Input/RadioInput.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";

import MultiRadio from "@/views/components/Input/MultiRadio.vue";
import TextAreaInput from "@/views/components/Input/TextAreaInput.vue";

export default {
  name: "RequestFormSitology",
  components: {
    RadioInput,
    TextInput,
    MultiRadio,
    TextAreaInput,
    CardBox,
  },

  setup() {},
  data() {
    return {
      box1: {
        note: "",
        result_reporting_method: "",
        result_reporting_method_email: "",
      },
      box2: {
        specimen: "",
        hormon_status: "",
        hormon_status_text: "",
        gynaecology_status: "",
        gynaecology_status_text: "",
        fixation: "",
        fixation_text: "",
        general_cytology_main: "",
        general_cytology_sub: "",
        general_cytology_sub_text: "",
        gynaecology: "",
        additional_service_main: "",
        additional_service_main_text: "",
        additional_service_sub: "",
        additional_service_sub_text: "",
      },
      box3: {
        clinical_diagnosis: "",
        main_symptom: "",
        previous_cytology: "",
        patient_type: "",
        patient_text: "",
        order_type: "",
        order_type_text: "",
        courier: "",
        receiver: "",
        innolab_id: "",
        other_text: "",
      },
    };
  },
  methods: {
    makeId(data) {
      return data.toLowerCase().split(" ").join("_");
    },
    showRequest() {
      let el = document.getElementById("swalFormRequest");
      this.$swal({
        html: el.innerHTML,
        width: "60vw",
        // showCancelButton: false,
        // showConfirmButton: false,
        backdrop: true,
        showCancelButton: true,
        confirmButtonText: "Buat Pesanan",
        cancelButtonText: "Edit Pesananan",
        // confirmButtonColor: "#44A32B",
        // cancelButtonColor: "#dc3545",
        reverseButtons: true,
        allowOutsideClick: () => true,
        customClass: {
          // container: "your-container-class",
          // popup: "your-popup-class",
          // header: "your-header-class",
          // title: "your-title-class",
          // closeButton: "your-close-button-class",
          // icon: "your-icon-class",
          // image: "your-image-class",
          // content: "your-content-class",
          // input: "your-input-class",
          // actions: "your-actions-class",
          confirmButton:
            "btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center",
          cancelButton:
            "btn mb-0 bg-secondary-gradient btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center",
          // footer: "your-footer-class",
        },
      });
    },
  },
};
</script>

<style scoped></style>
