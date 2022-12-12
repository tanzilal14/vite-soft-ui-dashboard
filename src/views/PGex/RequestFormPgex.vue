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
            <text-input label="Clinical Diagnosis">
              <template #input>
                <textarea
                  id=""
                  v-model="box1.clinical_diagnosis"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
              </template>
            </text-input>
            <text-input label="Pathologist Diagnosis">
              <template #input>
                <textarea
                  id=""
                  v-model="box1.pathologist_diagnosis"
                  name=""
                  class="form-control"
                  cols="20"
                  rows="5"
                ></textarea>
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

        <card-box title="Test(s) Requested">
          <!-- Todo:
         1. add sub text
         2. adjust width -->
          <template #content>
            <hr style="height: 0.2rem" />
            <div class="row">
              <div class="col-md-4">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Colorectal Cancer</h6>
                  </div>
                </div>
                <multi-radio
                  v-for="(item, index) in [
                    'OncoPANEL-CRC (All RAS, BRAF, MMR/MSI, Innomune Level) for Predictive, Prognosis, Hereditary Risk',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                    'Stage',
                    'Mestastasis',
                    'Region of Origin',
                    'Previous Chemoterapy',
                  ]"
                  :key="index"
                >
                  <template #sub-radio-input>
                    <div class="box-test-sub-1">
                      <input
                        :id="makeId(item)"
                        v-model="box2.colorectal_cancer_sub"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="makeId(item)"
                        class="button-sub btn-sm null ms-auto label-sub"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                  <template #sub-radio-input-text>
                    <input
                      v-model="box2.colorectal_cancer_sub_text"
                      type="text"
                      placeholder="Insert "
                      class="form-control"
                    />
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'Package : All RAS + BRAF Mutation',
                    'KRAS Mutation (exon 2)',
                    'Extended RAS Mutation (KRAS exon 3,4 ; NRAS exon 2,3,4)',
                    'All RAS Mutation  (KRAS exon 2 + Extended RAS)',
                    'BRAF Mutation (V600E)',
                    'MMR / MSI IHC (MLH1, MSH2, MSH6, PMS2)',
                    'PD-L1 IHC (Combined Positivity Score)',
                    'Innomune Level (CD3, CD8)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
              <div class="col-md-4">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Breast Cancer</h6>
                  </div>
                </div>
                <multi-radio
                  v-for="(item, index) in [
                    'ER, PR, HER2 IHC',
                    'ER, PR, HER2 IHC + Additional Marker(s):',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                        'p53',
                        'Ki-67',
                        'Topoisomerase2A',
                      ]"
                      :key="index"
                      class="box-test-sub"
                    >
                      <input
                        :id="makeId(item)"
                        v-model="box2.innoct_small"
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
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'Single Breast Marker IHC (non package)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                        'ER',
                        'p53',
                        'PR',
                        'Ki-67',
                        'HER2',
                        'Topoisomerase2A (Top2a)',
                      ]"
                      :key="index"
                      class="col-md-6 box-test-sub-1"
                    >
                      <input
                        :id="`${makeId(item)}_inno`"
                        v-model="box2.innoct_small"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="`${makeId(item)}_inno`"
                        class="button-sub btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'HER2 CISH (dual color)',
                    'PD-L1 IHC for TNBC',
                    'MammaPrint (70 Signature Genes)',
                    'BRCA 1&2 Mutation Sequencing (NGS) with indication',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                        'Cancer patient, with/o family history of cancer',
                        'Healthy individual, with/o family history of cancer',
                      ]"
                      :key="index"
                      class="box-test-sub"
                    >
                      <input
                        :id="makeId(item)"
                        v-model="box2.innoct_small"
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
                </multi-radio>
              </div>
              <div class="col-md-4">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Others</h6>
                  </div>
                </div>
                <multi-radio
                  v-for="(item, index) in [
                    'BCR-ABL Quantitative (Deep Molecular Response, for Major fusion protein only)',
                    'BCR-ABL Quanlitative (Major p210, Minor p190, Micro p230 fusion protein)',
                    'BCR-ABL Mutation (T315I, Y253F, Y253H, E255K, E255V, M351T)',
                    'JAK2 Mutation (V617F)',
                    'Package : IDH 1&2 Mutation +  MGMT Methylation + EGFR IHC',
                    'MGMT Methylation',
                    'IDH 1&2 Mutation',
                    'EGFR IHC',
                    'Lymphoma Predictive Panel (4 markers) single test only:',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                        'CD-20',
                        'CD-3',
                        'CD-45',
                        'Ki67',
                      ]"
                      :key="index"
                      class="col-md-6 box-test-sub-1"
                    >
                      <input
                        :id="`${makeId(item)}_inno`"
                        v-model="box2.innoct_small"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="`${makeId(item)}_inno`"
                        class="button-sub btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'HLA Typing Essential (A, B, DRB)',
                    'HLA Typing Complete (A, B, C, DR, DQ, DP) High Resolution Level NGS',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
            </div>
            <hr style="height: 0.2rem" />
            <div class="row">
              <div class="col-md-8">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Lung Cancer</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <multi-radio
                      v-for="(item, index) in [
                        'EGFR Mutation EXPRESS (1 day)',
                        'EGFR Mutation',
                        'ALK IHC',
                        'PD-L1 IHC (Tumor Proprotion Score)',
                        'TTF-1 IHC',
                      ]"
                      :key="index"
                    >
                      <template #main-radio-without-flex>
                        <input
                          :id="makeId(item)"
                          v-model="box2.colorectal_cancer_main"
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
                    <multi-radio
                      v-for="(item, index) in [
                        'OncoPANEL-Lung (NGS) 12 genes (EGFR, ALK, ROS1, BRAF, KRAS, NRAS, MET, RET, PIK3CA, MAP2K1, ERBB2, TP53) for Predictive, Resistance, and Monitoring Targeted Therapy. Cancer Type:',
                      ]"
                      :key="index"
                    >
                      <template #main-radio-without-flex>
                        <input
                          :id="makeId(item)"
                          v-model="box2.colorectal_cancer_main"
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
                            'Non-Small Cell Lung Cancer',
                            'Small Cell Lung Cancer',
                            'Soft Tissue Sarcoma',

                            'Unknown Primary Origin',
                          ]"
                          :key="index"
                          class="box-test-sub"
                        >
                          <input
                            :id="makeId(item)"
                            v-model="box2.innoct_small"
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
                      <template #sub-radio-input>
                        <div
                          v-for="(item, index) in ['Other Solid Tumor']"
                          :key="index"
                          class="box-test-sub-1 mx-2"
                        >
                          <input
                            :id="makeId(item)"
                            v-model="box2.vries_sub"
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
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Insert"
                          class="form-control"
                        />
                      </template>
                    </multi-radio>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Additional Service</h6>
                  </div>
                </div>
                <multi-radio
                  v-for="(item, index) in ['Processing slide staining only']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                        'H&E',
                        'ER',
                        'PR',
                        'HER2',
                        'p53',
                        'Ki-67',
                        'Topoisomerase2A (Top2a)',
                      ]"
                      :key="index"
                      class="col-md-6 box-test-sub-1"
                    >
                      <input
                        :id="`${makeId(item)}_inno`"
                        v-model="box2.innoct_small"
                        type="radio"
                        :value="item"
                        hidden
                        class="input-sub"
                      />
                      <label
                        :for="`${makeId(item)}_inno`"
                        class="button-sub btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'PA review / second opinion (per 2 slides)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <input
                      :id="makeId(item)"
                      v-model="box2.colorectal_cancer_main"
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
                    <div class="box-test-sub-1">
                      <input
                        :id="makeId(item)"
                        v-model="box2.colorectal_cancer_sub"
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
                      v-model="box2.colorectal_cancer_sub_text"
                      type="text"
                      placeholder="Quantity "
                      class="form-control"
                    />
                  </template>
                </multi-radio>
              </div>
            </div>
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
  name: "RequestFormPgex",
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
        clinical_diagnosis: "",
        pathologist_diagnosiss: "",
        result_reporting_method: "",
        result_reporting_method_email: "",
      },
      box2: {
        colorectal_cancer_main: "",
        colorectal_cancer_sub: "",
        colorectal_cancer_sub_text: "",
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
