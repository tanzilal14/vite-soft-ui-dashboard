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

        <card-box title="Jenis Spesimen">
          <template #content>
            <hr style="height: 0.2rem" />
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Saluran Napas</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Sputum',
                    'Bilasan Bronkus (BAL)',
                    'Aspirat Endotrakeal',
                    'Usap Mulut',
                    'Usap Hidung',
                    'Usap Nasofaring',
                    'Usap Tenggorok / Faring',
                    'Abses Saluran Pernapasan',
                    'Bahan Saluran Napas Lain',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1">
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
                    </div>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Lainnya"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Saluran Cerna</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Feses',
                    'Usap Rektal',
                    'Abses Saluran Pencernaan',
                    'Bahan Saluran Cerna Lain',
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Lainnya"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Saluran Kemih dan Reproduksi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Urin Porsi Tengah',
                    'Urin Catheter',
                    'Sekret Vagina',
                    'Sekret Serviks',
                    'Sekret Uretra',
                    'Urin Kolektor',
                    'Cairan Amnion',
                    'Abses Sal. Kemih dan Reproduksi',
                    'Bhn. Sal. Kemih & Reproduksi Lain',
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Lainnya"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Saluran Kemih dan Reproduksi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Darah',
                    'Cairan Otak',
                    'Aspirasi Sumsum Tulang',
                    'Aspirasi Cairan Vitreus',
                    'Kateter Intravena',
                    'Selulitis Aspirasi',
                    'Cairan Pleura',
                    'Cairan Steril Lain',
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Lainnya"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-2">
                <div class="row mt-4">
                  <div class="col">
                    <h6>Spesimen Lain</h6>
                  </div>
                </div>

                <multi-radio v-for="(item, index) in ['Pus']" :key="index">
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Bagian"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in ['Absen Terbuka / Tertutup']"
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Bagian"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'Luka Bakar: Jaringan / Apirat / Usapan',
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Bagian"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
                <multi-radio
                  v-for="(item, index) in [
                    'Ulkus Dekubitus',
                    'Telinga (Dalam / Luar)',
                    'Mata, konjungtiva Jaringan (FNAB, Biopsi)',
                    'Spesimen Lain',
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
                      class="button-title-custom-mikrobiologi text-center btn-sm null ms-auto"
                    >
                      {{ item }}
                    </label>
                  </template>
                </multi-radio>
                <multi-radio>
                  <template #sub-radio>
                    <div class="row">
                      <div class="col">
                        <input
                          v-model="box2.vries_sub_input"
                          type="text"
                          placeholder="Lainnya"
                          class="form-control sub-input"
                        />
                      </div>
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <hr style="height: 0.2rem" />

            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-6">
                <h5>Kultur, Identifikasi, Uji Kepekaan (AST)</h5>
                <hr />
                <div class="row">
                  <div class="col">
                    <h6>Kultur + Resistensi</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'Kultur Resistensi Aerob',
                    'Kul. Res. Aerob + Anaerob',
                    'Kul. Res. Darah Aerob (2 botol)',
                    'Kul. Res. Aerob + Anaerob (4 botol)',
                    'Kultur Resistensi Jamur',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1">
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
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-6">
                <h5>Kultur Resistensi & Pola Kuman</h5>
                <hr />
                <div class="row">
                  <div class="col">
                    <h6>Innobiogram</h6>
                  </div>
                </div>

                <multi-radio
                  v-for="(item, index) in [
                    'INNOBIOGRAM - Basic',
                    'INNOBIOGRAM - Premium',
                    'INNOBIOGRAM - Platinum',
                    'INNOBIOGRAM - Silver',
                    'INNOBIOGRAM - Gold',
                    'INNOBIOGRAM - Executive',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1">
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
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-6">
                <h5>Mikroskopis</h5>
                <hr />

                <multi-radio
                  v-for="(item, index) in [
                    'Pewarnaan Gram',
                    'KOH / LPCB Fungi',
                    'Sarcoptes scabiei , KOH',
                    'Cryptococcus neoformans , Tinta India',
                    'Corynebacterium diphtheria , Neisser',
                    'Trichomonas vaginalis , Giemsa Wet Mount',
                    'Myctobacterium leprae , BTA',
                    'BTA 1x',
                    'BTA 3x',
                    'Sekret Vagina (Nugent)',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1">
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
                    </div>
                  </template>
                </multi-radio>
              </div>
              <div class="col-sm-12 col-md-6">
                <h5>Kultur Identifikasi</h5>
                <hr />

                <multi-radio
                  v-for="(item, index) in [
                    'Kultur Aerob',
                    'Kultur Aerob + Anaerob',
                    'Kultur Jamur',
                    'Kultur Mycobacterium sp.s',
                  ]"
                  :key="index"
                >
                  <template #main-radio-without-flex>
                    <div class="box-sub-1">
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
                    </div>
                  </template>
                </multi-radio>
              </div>
            </div>
            <hr style="height: 0.2rem" />

            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-6">
                <h5>Mikrobiologi Molekular - rPCR</h5>
                <hr />
                <div class="row">
                  <div class="col-md-6">
                    <multi-radio
                      v-for="(item, index) in [
                        'rPCR M. tuberculosis',
                        'rPCR Streptococcus pneumoniae',
                        'rPCR Legionella pneumophila',
                        'rPCR Mycoplasma pneumonia',
                        'rPCR Bordetella pertussis',
                        'rPCR Toxoplasma',
                        'rPCR Rubella Virus',
                        'rPCR HSV',
                        'rPCR CMV',
                        'rPCR EBV',
                        'rPCR VZV',
                      ]"
                      :key="index"
                    >
                      <template #main-radio>
                        <div class="box-sub-1">
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
                        </div>
                      </template>
                    </multi-radio>
                  </div>
                  <div class="col-md-6">
                    <multi-radio
                      v-for="(item, index) in [
                        'rPCR Pneumocytis jirovecii',
                        'rPCR Chlamydia trachomatis',
                        'rPCR Neisseria gonorrhoeae',
                        'rPCR Influenza A',
                        'rPCR Influenza B',
                        'rPCR Influenza H3N1',
                        'rPCR Influenza H1N1 pdm09',
                        'PCR Identifikasi MOTT',
                        'rPCR Helicobacter pylori',
                        'rPCR Helicobacter pylori',
                        'Resistensi M. leprae (Rif/Oflo/Dap) per ge',
                      ]"
                      :key="index"
                    >
                      <template #main-radio>
                        <div class="box-sub-1">
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
                        </div>
                      </template>
                    </multi-radio>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="row">
                  <div class="col-12">
                    <h5>Parasitologi</h5>
                    <hr />
                    <multi-radio
                      v-for="(item, index) in ['Anti-Cryptococcus']"
                      :key="index"
                    >
                      <template #main-radio-without-flex>
                        <div class="box-sub-1">
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
                        </div>
                      </template>
                    </multi-radio>
                  </div>
                  <div class="col-12 mt-5">
                    <h5>Parasitologi</h5>
                    <hr />
                    <multi-radio
                      v-for="(item, index) in [
                        'Identifikasi Res. koloni MTB Lini 1',
                        'Identifikasi Res. koloni MTB Lini 2',
                        'Identifikasi Res. koloni MTB Lini 1 dan 2',
                        'TB-IGRA',
                      ]"
                      :key="index"
                    >
                      <template #main-radio-without-flex>
                        <div class="box-sub-1">
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
                        </div>
                      </template>
                    </multi-radio>
                  </div>
                </div>
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
