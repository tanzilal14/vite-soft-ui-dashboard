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
        <card-box title="">
          <template #content>
            <div class="row">
              <div class="col-md-6">
                <text-input label="Diagnosis Klinis">
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
              </div>
              <div class="col-md-6"></div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <text-input label="Obat / Antibiotik 48 jam terakhir">
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
              </div>
              <div class="col-md-6">
                <text-input label="Keterangan">
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
              </div>
            </div>
          </template>
        </card-box>

        <card-box title="">
          <template #content>
            <div class="row justify-content-center">
              <div class="col-md-4 dashedbox py-3">
                <div class="row">
                  <div class="col-md-6">
                    <i class="fa fa-star mx-2"></i> Puasa 10 - 12
                  </div>
                  <div class="col-md-6">
                    <i class="fa fa-circle mx-2"></i> Urin 24 jam
                  </div>
                </div>
              </div>
            </div>
          </template>
        </card-box>

        <card-box title="">
          <template #content>
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Hematologi</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Lengkap / Anemia</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Hematologi',
                    'Hematologi Rutin',
                    'Eosinofil',
                    'Retikulosit',
                    'Gambaran Darah Tepi',
                    'Laju Endap Darah (LED)',
                    'Golongan Darah ABO & Rh',
                    'Serum Iron (SI)',
                    'TIBC',
                    'Ferritin',
                    'Transferin',
                    'Vitamin B12',
                    'Asam Folat',
                    'Coombs Test',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[12].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Kimia Klinik</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Renal / Hipertensi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Urea Nitrogen',
                    'Kreatinin eGFR',
                    'Asam Urat (AU)',
                    'Urea Nitrogen, urin',
                    'Kreatinin, urin',
                    'Asam Urat (AU), urin',
                    'Cystatin-C',
                    'β2 Microglobulin',
                    'β2 Microglobulin, urin',
                    'Kreatinin Clearance',
                    'Albumin, urin',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[2].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[3, 4, 5, 9, 10].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Kimia Klinik</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Faal Hati</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'SGOT (AST)',
                    'SGPT (ALT)',
                    'Gamma-GT (GGT)',
                    'Alkali Fosfatase (ALP)',
                    'Cholinesterase (CHE)',
                    'Bilirubin Total',
                    'Bilirubin Direk',
                    'Protein Total (TP)',
                    'Albumin',
                    'Globulin (Tp+Alb)',
                    'Protein Elektroforesis',
                    'Amilase',
                    'Lipase',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Analisis</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Urine</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Urin Lengkap',
                    'Protein, urin 24 jam',
                    'Protein, urin',
                    'Protein Bence-Jones, urin',
                    'Protein Bence-Jones, urin',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[1].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Imunologi</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Hepatitis</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'HBsAg, rapid ICT',
                    'HBsAg',
                    'HBsAg, konfirmasi',
                    'Anti-HBs',
                    'HBeAg',
                    'Anti-HBe',
                    'Anti-HBe',
                    'Anti-HAV Total',
                    'Anti-HAV IgM',
                    'Anti-HCV',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Hemostasis</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Waktu Pendarahan (BT)',
                    'Waktu Pembekuan',
                    'Tes Tourniquet',
                    'Waktu Trombin (TT)',
                    'Waktu Protrombin (PT)',
                    'APTT',
                    'Fibrinogen',
                    'D-Dimer',
                    'Agregasi Trombosit',
                    'Viskositas Darah',
                    'Protein C, aktivitas',
                    'Protein S, aktivitas',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Diabetes</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Glukosa, puasa',
                    'Glukosa, 2 jam PP',
                    'Glukosa, sewaktu',
                    'HbA1c',
                    'Insulin',
                    'Insulin, 2 jam PP',
                    'C-Peptida',
                    'Glycated Albumin (GA)',
                    'TTGO',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[0, 4, 6, 8].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Fungsi Cardiac</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'CK (CPK)',
                    'CK-MB',
                    'LDH',
                    'Homosistein',
                    'Troponin T',
                    'Troponin I',
                    'NT-pro BNP',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Feces</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Feses Lengkap',
                    'Feses Rutin',
                    'Darah Samar Feses',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Torch</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'TORCH Syndrome Panel',
                    'Anti-Toxoplasma IgG',
                    'Anti-Toxoplasma IgM',
                    'Anti-Toxoplasma IgG Avidity',
                    'Anti-Rubella IgG',
                    'Anti-Rubella IgM',
                    'Anti-CMV IgG',
                    'Anti-CMV IgM',
                    'Anti-CMV IgG Avidity',
                    'Anti-HSV1 IgG',
                    'Anti-HSV1 IgM',
                    'Anti-HSV2 IgG',
                    'Anti-HSV2 IgM',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Hematologi Lain</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Hb Elektroforesis',
                    'G6PD',
                    'CD4',
                    'CD8',
                    'ACA IgG',
                    'ACA IgM',
                    'Lupus Antikoagulan',
                    'Beta 2 Glikoprotein IgG',
                    'Beta 2 Glikoprotein IgM',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Lemak</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Kolesterol Total',
                    'LDL-Kolesterol Direk (LDL-K)',
                    'HDL-Kolesterol (HDL-K)',
                    'Trigliserida (TG)',
                    'Apolipoprotein-A1 (Apo-A1)',
                    'Apolipoprotein-B (Apo-B)',
                    'Lipoprotein(a) (Lp-a)',
                    'Small-Dense LDL',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[3, 4, 5, 6, 7].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Elektrolit</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Natrium (Na)',
                    'Kalium (K)',
                    'Klorida (Cl)',
                    'Kalsium (Ca)',
                    'Magnesium (Mg)',
                    'Fosfor Anorganik',
                    'Natrium (Na), urin',
                    'Kalium (K), urin',
                    'Klorida (Cl), urin',
                    'Kalsium (Ca), urin',
                    'Fosfor Anorganik, urin',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2"></div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>STD / HIV</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'VDRL',
                    'TPHA',
                    'Anti-Chlamydia IgG',
                    'Anti-Chlamydia IgM',
                    'Anti-HIV',
                    'Anti-HIV, konfirmasi',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <hr style="height: 0.2rem" />
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Imunologi</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Rheumatoid</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'RF',
                    'CRP',
                    'hr-CRP',
                    'ASTO',
                    'ANA (IF) & ANA Profile',
                    'ANA (IF)',
                    'ANA Profile',
                    'Anti-ds-DNA IgG',
                    'Anti-CCP IgG',
                    'Tes LE',
                    'C3 Komplemen',
                    'C4 Komplemen',
                    'Procalcitonin (PCT)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Endokrinologi</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Tiroid</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Free T3 (FT3)',
                    'Free T4 (FT4)',
                    'TSH',
                    'Triioodothyronine (T3)',
                    'Thyroxine (T4)',
                    'T3 Uptake',
                    'Free T4-Index (FTI)',
                    'Thyroglobulin',
                    'Anti-Thyroglobulin',
                    'TSH Receptor Antibody',
                    'Anti-TPO',
                    'Calcitonin',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Lain-lain</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Skrining Pengguna Narkoba</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Paket NAPZA',
                    'Amphetamine (AMP)',
                    'Marijuana (THC)',
                    'Cocaine',
                    'Alkohol',
                    'Benzodiazepine (BZD)',
                    'MDMA',
                    'Methamphetamine (MET)',
                    'Morfine/Opiat',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Lain-lain</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Alergi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'IgE Total',
                    'Alergi Makanan SEA IgE',
                    'Atopy Indonesia 1 IgE',
                    'Inhalasi SEA IgE',
                    'Pediatric Alergi IgE',
                    'Atopy China IgE',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <h5>Molekuler</h5>

                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Molekuler PK</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'BCR-ABL, kualitatif',
                    'BCR-ABL, kuantitatif',
                    'BCR-ABL Mutation (T315I)',
                    'JAK2 Mutation (V617F)',
                    'BRCA 1-2 Germline Mutation',
                    'BRCA 1-2 Somatic Mutation',
                    'HLA Typing A, B, C, DP, DQ, DR',
                    'HLA Typing A, B, DRB1, DRB345',
                    'EGFR Mutasi ct-DNA Liq. Biopsy',
                    'OncoPANEL-Lung (12 Genes)',
                    'HBV-DNA, Real-time PCR',
                    'HCV-DNA, Real-time PCR',
                    'HCV Genotype-PCR',
                    'HIV-1 RNA, Real-Time PCR',
                    'MTB DNA, Real-Time PCR',
                    'Salmonella PCR',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Penanda Tumor</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'α-Fetoprotein (AFP)',
                    'CEA',
                    'Total PSA',
                    'Free PSA',
                    'PSA, Free/Total ratio',
                    'CA 15-3',
                    'CA 125',
                    'CA 19-9',
                    'CA 72-4',
                    'NSE',
                    'SCC',
                    'CYFRA21-1',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Reproduksi - Gestasi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'LH',
                    'FSH',
                    'Prolactin',
                    'Testosterone, serum',
                    'Progesterone',
                    'Estradiol (E2), serum',
                    'Cortisol (COR), serum',
                    'β-HCG, serum',
                    'Tes Kehamilan',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[0, 4, 6, 8].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Pemantauan Obat Terapeutik</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Carbamazepine, kuantitatif',
                    'Phenytoin, kuantitatif',
                    'Cyclosporin, kuantitatif',
                    'Digoxin, kuantitatif',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Osteoporosis</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    '25-hydroxy Vitamin D',
                    'N-Mid Osteocalcin',
                    'CTX (C-Telopeptide)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Imunologi Lain</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Imunologi Lain',
                    'Anti-Dengue IgG',
                    'Anti-Dengue IgM',
                    'Dengue NS1 antigen',
                    'Anti-Salmonella IgM',
                    'Anti-Chikungunya IgM',
                    'Anti-Leptospira IgM',
                    'Anti-Mycoplasma IgG',
                    'Anti-Mycoplasma IgM',
                    'Anti-H. pylori IgG',
                    'IgG',
                    'IgA',
                    'IgM',
                    'Malaria, mikroskopik',
                    'Filariasis, mikroskopik',
                    'Rotavirus Antigen, feses',
                    'Fecal Calprotectin',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Hormon Lain</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in ['DHEA-S', 'GH, serum', 'PTH Intact']"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Logam Berat</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Panel Logam Berat',
                    'Mangan (Mn), darah',
                    'Tembaga (Cu), darah',
                    'Zinc (Zn), darah',
                    'Cobalt (Co), darah',
                    'Air raksa (Hg), darah',
                    'Cadmium (Cd), darah',
                    'Selenium (Se), darah',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2 mx-md-2">
                <div class="row">
                  <div class="col">
                    <hr />
                    <h6>Lain</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'ADA, serum',
                    'Urea Breath Test (UBT)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1 d-flex align-items-center">
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
                        class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                      >
                        {{ item }}
                      </label>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-star mx-2"
                      ></i>
                      <i
                        v-show="[].includes(index)"
                        class="fa fa-circle mx-2"
                      ></i>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
          </template>
        </card-box>

        <card-box title="">
          <template #content>
            <text-input label="Tanggal Pengambilan Sampel">
              <template #input>
                <Datepicker v-model="date" :enable-time-picker="false">
                </Datepicker>
              </template>
            </text-input>
            <time-input label="Jam Pengambilan Sampel">
              <template #time-start>
                <input
                  v-model="box2.jam_pengambilan_sampel_start"
                  type="text"
                  class="form-control"
                />
              </template>
              <template #time-end>
                <input
                  v-model="box2.jam_pengambilan_sampel_end"
                  type="text"
                  class="form-control"
              /></template>
            </time-input>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <div>
                <label class="">Nama Petugas</label>
                <input
                  id=""
                  v-model="box3.innolab_id"
                  type="text"
                  name=""
                  class="form-control"
                />
              </div>
            </div>
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
import TimeInput from "@/views/components/Input/TimeInput.vue";

import MultiRadio from "@/views/components/Input/MultiRadio.vue";
import TextAreaInput from "@/views/components/Input/TextAreaInput.vue";

export default {
  name: "RequestFormMikrobiologi",
  components: {
    RadioInput,
    TextInput,
    MultiRadio,
    TextAreaInput,
    CardBox,
    TimeInput,
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
        jam_pengambilan_sampel_start: "",
        jam_pengambilan_sampel_end: "",
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
