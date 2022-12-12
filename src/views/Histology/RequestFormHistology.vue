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
        <card-box title="Request Information">
          <template #content>
            <TextInputSingle
              label="Note"
              :important="true"
              :file="data.note"
              name-var="note"
              @update-data="updateData"
            />
            <TextInputSingle
              label="Contraception (if any)"
              :important="true"
              :file="data.contraception"
              name-var="contraception"
              @update-data="updateData"
            />
            <radio-input label="Result Reporting Method">
              <template #input-radio>
                <div
                  v-for="(item, index) in ['Take Out', 'Delivery']"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="data.result_reporting_method"
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
                    v-model="data.result_reporting_method"
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
                  v-model="data.result_reporting_method_email"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
          </template>
        </card-box>
        <card-box title="Sample Information">
          <template #content>
            <TextInputSingle
              label="Tissue Location"
              :important="true"
              :file="data.tissue"
              name-var="tissue"
              @update-data="updateData"
            />
            <br />
            <radio-input label="Collection Method">
              <template #input-radio>
                <div
                  v-for="(item, index) in [
                    'Biopsy',
                    'Curretage',
                    'Excision',
                    'Scrape',
                  ]"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="data.collecting_method"
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
                    :id="makeId(item)"
                    v-model="data.collecting_method"
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
                  v-model="data.collecting_method_others"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>

            <TimeInput
              label="Operation Time"
              :important="true"
              type="time"
              :file="data.operation_time_start"
              name-var="operation_time_start"
              @update-data="updateData"
            />
            <TimeInput
              label="Time Tissue Taken Out"
              :important="true"
              type="time"
              :file="data.tissue_taken_start"
              name-var="tissue_taken_start"
              @update-data="updateData"
            />
            <TimeInput
              label="Time Start Fixation"
              :important="true"
              type="time"
              :file="data.start_fixation_start"
              name-var="start_fixation_start"
              @update-data="updateData"
            />

            <radio-input label="Fixation Reagent">
              <template #input-radio>
                <div
                  v-for="(item, index) in ['Nuetral Buffered Formalin 10%']"
                  :key="index"
                >
                  <input
                    :id="makeId(item)"
                    v-model="data.fixation_reagent"
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
                    :id="`${makeId(item)}_1`"
                    v-model="data.fixation_reagent"
                    type="radio"
                    hidden
                    :value="item"
                  />
                  <label
                    :for="`${makeId(item)}_1`"
                    class="btn mb-0 border-primary btn-sm null null ms-auto mb-0 pull-right"
                    >{{ item }}
                  </label>
                </div>
                <input
                  v-model="data.fixation_reagent_others"
                  type="text"
                  class="form-control p-0 m-0"
                />
              </template>
            </radio-input>
          </template>
        </card-box>

        <div v-if="load_product">
          <card-box title="Test(s) Requested">
            <template #content>
              <div class="row">
                <div class="col-md-8">
                  <div class="col">
                    <h5>Innolab Clear Tissue (InnoCT)</h5>
                  </div>
                  <div class="col d-flex">
                    <input
                      id="not_using"
                      v-model="data.check_using_kalgen"
                      type="checkbox"
                    />
                    <label class="mx-2 not_using" for="not_using"
                      >Not Using Kalgen Innolab's HistoPreservative Kit or NB
                      Formalin</label
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <MultiSelect
                    :item="product_list.getProducts[0]"
                    :multi-column="{
                      4: ['col-md-3', '5rem'],
                      5: ['col-md-3', '5rem'],
                    }"
                    name-var="pathological"
                    @changeMain="updateData"
                  />
                </div>
                <div class="col-md-6">
                  <MultiSelect
                    :item="product_list.getProducts[1]"
                    :multi-column="{}"
                    name-var="vries"
                    @changeMain="updateData"
                  />
                  <MultiSelect
                    :item="product_list.getProducts[2]"
                    :multi-column="{}"
                    :class-list="['button-title', 'button-title', 'button-sub']"
                    name-var="additional"
                    @changeMain="updateData"
                  />
                </div>
              </div>
            </template>
          </card-box>
        </div>
        <div v-else>
          <card-box title="">
            <template #content>
              <h5>Fetch Data Product...</h5>
            </template>
          </card-box>
        </div>

        <card-box title="Additional Service">
          <template #content>
            <text-area-input label="Clinical diagnosis">
              <template #input>
                <textarea
                  id=""
                  v-model="data.clinical_diagnosis"
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
                  v-model="data.main_symptom"
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
                  v-model="data.previous_cytology"
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
                    v-model="data.patient_type"
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
                    v-model="data.patient_type"
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
                  v-model="data.patient_text"
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
                    v-model="data.order_type"
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
                    v-model="data.sample_type"
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
                    v-model="data.sample_text"
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
                    v-model="data.courier"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <label class="">Receiver</label>
                  <input
                    id=""
                    v-model="data.receiver"
                    type="text"
                    name=""
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <label class="">Innolab ID</label>
                  <input
                    id=""
                    v-model="data.innolab_id"
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
                  v-model="data.other_text"
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
              @click="createTransactionFeeder"
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
import TimeInput from "@/views/components/Input/TimeInput.vue";
import MultiRadio from "@/views/components/Input/MultiRadio.vue";
import TextAreaInput from "@/views/components/Input/TextAreaInput.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";
import MultiSelect from "@/views/components/Layout/MultiSelect.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import RadioInputSingle from "@/views/components/Input/RadioInputSingle.vue";
import RadioInputMulti from "@/views/components/Input/RadioInputMulti.vue";
import { mapState } from "vuex";
import * as qm from "@/graphqlquery";

export default {
  name: "RequestFormHistology",
  components: {
    TextInput,
    RadioInput,
    TimeInput,
    MultiRadio,
    CardBox,
    TextAreaInput,
    RadioInputMulti,
    RadioInputSingle,
    TextInputSingle,
    MultiSelect,
  },

  setup() {},
  data() {
    return {
      product_list: {},
      data: {
        note: "",
        contraception: "",
        result_reporting_method: "",
        result_reporting_method_email: "",
        tissue: "",
        collecting_method: "",
        collecting_method_others: "",
        operation_time_start: 0,
        operation_time_end: 0,
        tissue_taken_start: 0,
        tissue_taken_end: 0,
        start_fixation_start: 0,
        start_fixation_end: 0,
        fixation_reagent: "",
        fixation_reagent_others: "",

        pathological: {
          main: {
            select: "",
            select_text: "",
          },
          sub: {
            select: "",
            select_text: "",
          },
          sub2: {
            select: "",
            select_text: "",
          },
        },

        vries: {
          main: {
            select: "",
            select_text: "",
          },
          sub: {
            select: "",
            select_text: "",
          },
          sub2: {
            select: "",
            select_text: "",
          },
        },
        additional: {
          main: {
            select: "",
            select_text: "",
          },
          sub: {
            select: "",
            select_text: "",
          },
          sub2: {
            select: "",
            select_text: "",
          },
        },
        check_using_kalgen: "",
        clinical_diagnosis: "",
        main_symptom: "",
        previous_cytology: "",
        patient_type: "",
        patient_text: "",
        order_type: "",
        sample_type: "",
        sample_text: "",
        courier: "",
        receiver: "",
        innolab_id: "",
        other_text: "",
      },
      idTransaction: "5439c2ff-c831-42a9-baa9-9083b9949167",
      load_product: false,
    };
  },
  computed: {
    ...mapState(["histologi"]),
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async createTransactionFeeder() {
      var self = this;
      await self.$apollo
        .mutate({
          mutation: qm.FEEDER_TRANSACTION_HISTOLOGI_CREATE,
          variables: {
            input:
              //  {
              //   clinician_ids: ["96a8a406-f51c-4adc-8645-beba890adedb"],
              //   lab_id: "5e837655-b7b1-4bcd-bf29-5425ddf546b9",
              //   customer_id: "71ad457d-c35e-42f5-84f7-6b8dfabe2641",
              //   patient_id: "fdc09e31-8f6a-49b4-9b48-2ebc4cd71eee",
              //   feeder_id: "6f12172a-7b91-4549-9e83-24f595ca667b",
              //   iuo_patient_type: "Insurance",
              //   iuo_order_type: "Courier",
              //   iuo_sample_receiving_condition: "Not Good",
              //   products: [
              //     { product_id: "85453813-fca8-4c41-9821-110662ac40b7" },
              //   ],
              // },
              {
                clinician_ids: this.makeList(
                  this.histologi.feed.clinicianInformation,
                  "id"
                ),
                lab_id: this.histologi.feed.lab.id,
                customer_id: this.histologi.feed.customerinformation.id,
                patient_id: this.histologi.feed.patientInformation.id,
                feeder_id: "6f12172a-7b91-4549-9e83-24f595ca667b",
                iuo_patient_type: this.data.patient_type,
                iuo_order_type: this.data.order_type,
                iuo_sample_receiving_condition: this.data.sample_type,
                products: [
                  this.extractId(this.data.pathological.main.select),
                  this.extractId(this.data.pathological.sub.select),
                  this.extractId(this.data.vries.main.select),
                  this.extractId(this.data.vries.sub.select),
                  this.extractId(this.data.additional.sub.select),
                ],
              },
          },
        })
        .then((result) => {
          // console.log(JSON.parse(JSON.stringify(result)));
          this.idTransaction = result.data.feederTransactionCreate[0].id;
          this.createTransactionHistologyFeeder();
          // self.$swal.fire("Success", "Data Saved Successfuly", "success");
        })
        .catch((error) => {
          console.log(JSON.parse(JSON.stringify(error)));

          self.$swal.fire("Error", error.toString(), "error");
        })
        .then(() => {});
    },
    async createTransactionHistologyFeeder() {
      var self = this;
      await self.$apollo
        .mutate({
          mutation: qm.FEEDER_TRANSACTION_CREATE,
          variables: {
            input: {
              histology: {
                transaction_id: this.idTransaction,
                rf_notes: this.data.note,
                rf_contraception: this.data.contraception,
                rf_result_reporting_method: this.data.result_reporting_method,
                rf_result_reporting_email:
                  this.data.result_reporting_method_email,
                si_tissue_location: this.data.tissue,
                si_collection_method: [this.data.collecting_method],
                si_operation_time: this.makeTime(
                  this.data.operation_time_start
                ),
                si_time_tissue_take_out: this.makeTime(
                  this.data.tissue_taken_start
                ),
                si_time_start_fixation: this.makeTime(
                  this.data.start_fixation_start
                ),
                si_fixation_reagent: this.data.fixation_reagent,
                si_fixation_reagent_other: this.data.fixation_reagent_others,
                as_clinical_diagnosis: this.data.clinical_diagnosis,
                as_main_symptom_n_desc_of_the_disease: this.data.main_symptom,
                tnc: "lorem ipsum",
                other_order_or_comment: this.data.other_text,
              },
            },
          },
        })
        .then((result) => {
          console.log(JSON.parse(JSON.stringify(result)));
          // this.idTransaction = result.data.feederTransactionCreate[0].id;

          self.$swal.fire("Success", "Data Saved Successfuly", "success");
        })
        .catch((error) => {
          console.log(JSON.parse(JSON.stringify(error)));

          self.$swal.fire("Error", error.toString(), "error");
        })
        .then(() => {});
    },
    fetchProducts(id = "6f12172a-7b91-4549-9e83-24f595ca667b") {
      this.$apollo
        .query({
          query: qm.PRODUCT_LIST,
          variables: {
            filter: {
              id: { eq: id },
            },
            paging: {
              limit: 10,
            },
            sorting: [],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.product_list = result.data.feederForms.nodes[0];
          this.load_product = true;
        })
        .catch((error) => {
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        });
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    makeVar(data) {
      return eval(`box3.${this.makeId(data)}`);
    },
    showRequest() {
      let el = document.getElementById("swalFormRequest");
      this.$swal({
        html: el.innerHTML,
        width: "60vw",

        backdrop: true,
        showCancelButton: true,
        confirmButtonText: "Buat Pesanan",
        cancelButtonText: "Edit Pesananan",

        reverseButtons: true,
        allowOutsideClick: () => true,
        customClass: {
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
