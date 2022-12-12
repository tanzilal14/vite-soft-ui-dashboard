<template>
  <div :class="[patienInformation ? '' : 'd-none']">
    <div class="d-flex align-items-center justify-content-between">
      <span></span>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
        <div>
          <button
            class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
            @click.prevent="searchPatient"
          >
            <i class="cursor-pointer fa fa-search"></i> &nbsp; Search Patient
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <TextInputSingle
        rules="required"
        label="Name"
        :important="true"
        :file="data.name"
        name-var="name"
        @update-data="updateData"
      />

      <text-input label="ID">
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
                      v-model="data.id_type"
                      type="radio"
                      required
                      :value="jenis_identitas[index]"
                      hidden
                    />
                    <label :for="makeId(item)" class="button-title btn">
                      <strong>{{ item }}</strong>
                    </label>
                  </div>
                </template>
              </multi-radio>
            </div>

            <div class="col-md-6">
              <TextInputSingle
                rules="required"
                :only-form="true"
                label="id_number"
                :file="data.id_number"
                name-var="id_number"
                @update-data="updateData"
              />
            </div>
          </div>
        </template>
      </text-input>

      <TextInputSingle
        rules="required"
        label="Medical Record No."
        type="number"
        :file="data.medical_record"
        name-var="medical_record"
        @update-data="updateData"
      />
      <DateInputSingle
        :only-form="false"
        label="Birth Date (DMY)"
        :important="true"
        :file="data.birth_date"
        name-var="birth_date"
        @input="updateData"
      />
      <text-input label="Sex">
        <template #input>
          <div class="row">
            <multi-radio>
              <template #main-radio>
                <div
                  v-for="(item, index) in ['Male', 'Female']"
                  :key="index"
                  class="col-auto"
                >
                  <input
                    :id="makeId(item)"
                    v-model="data.sex"
                    type="radio"
                    required
                    :value="gender[index]"
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
      <text-input label="Address">
        <template #input>
          <div class="row">
            <div class="col-12">
              <TextInputSingle
                rules="required"
                :only-form="true"
                label="address"
                :file="data.address"
                name-var="address"
                @update-data="updateData"
              />
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-md-6">
                  <TextInputSingle
                    rules="required"
                    label="RT"
                    type="number"
                    :file="data.rt"
                    name-var="rt"
                    @update-data="updateData"
                  />
                </div>
                <div class="col-md-6">
                  <TextInputSingle
                    rules="required"
                    label="RW"
                    type="number"
                    :file="data.rw"
                    name-var="rw"
                    @update-data="updateData"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </text-input>

      <text-input label="Province">
        <template #input>
          <v-select
            v-model="data.province"
            :options="provinces"
            label="name"
            @option:selected="changeProvince"
          >
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="!data.province"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </template>
      </text-input>

      <text-input label="City">
        <template #input>
          <v-select
            v-model="data.city"
            :options="citiys"
            label="name"
            :disabled="data.province == '' ? true : false"
            @search="onSearchCity"
            @option:selected="changeCity"
          >
            <template
              v-if="data.province == '' || data.province == null ? true : false"
              #header
            >
              <div style="opacity: 0.8; color: red">
                Silahkan pilih provinsi terlebih dahulu
              </div>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="!data.city"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </template>
      </text-input>
      <text-input label="District">
        <template #input>
          <v-select
            v-model="data.district"
            :options="districts"
            label="name"
            :disabled="data.city == '' ? true : false"
            @search="onSearchDistrict"
            @option:selected="changeDistrict"
          >
            <template
              v-if="data.city == '' || data.city == null ? true : false"
              #header
            >
              <div style="opacity: 0.8; color: red">
                Silahkan pilih kota terlebih dahulu
              </div>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="!data.district"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </template>
      </text-input>
      <text-input label="Sub District">
        <template #input>
          <v-select
            v-model="data.sub_district"
            :options="subdistricts"
            label="name"
            :disabled="data.district == '' ? true : false"
            @search="onSearchSubdistrict"
          >
            <template
              v-if="
                data.sub_district == '' || data.sub_district == null
                  ? true
                  : false
              "
              #header
            >
              <div style="opacity: 0.8; color: red">
                Silahkan pilih kecamatan terlebih dahulu
              </div>
            </template>
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="!data.sub_district"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </template>
      </text-input>

      <TextInputSingle
        rules="required"
        label="Phone"
        type="text"
        :file="data.phone"
        name-var="phone"
        @update-data="updateData"
      />
      <TextInputSingle
        rules="required"
        label="Email"
        type="email"
        :file="data.email"
        name-var="email"
        @update-data="updateData"
      />
    </div>
    <div
      v-if="data.id != ''"
      class="d-flex align-items-center justify-content-between"
    >
      <span></span>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
        <div>
          <button
            class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
            @click.prevent="updatePatient"
          >
            <i class="cursor-pointer fa fas fa-file-export"></i> &nbsp; Update
            Patient Data
          </button>
        </div>
      </div>
    </div>
  </div>

  <show-modal v-show="modal" @close="modal = false">
    <template #content>
      <patient @add-patient="addPatientData"></patient>
    </template>
  </show-modal>
</template>

<script>
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import TextInput from "@/views/components/Input/TextInput.vue";
import MultiRadio from "@/views/components/Input/MultiRadio.vue";
import DateInputSingle from "@/views/components/Input/DateInputSingle.vue";
import Patient from "@/views/Patient.vue";
import ShowModal from "@/views/components/Layout/ShowModal.vue";
import * as qm from "@/graphqlquery";
// import { Modal } from "bootstrap";

export default {
  name: "PatientInformation",
  components: {
    TextInputSingle,
    TextInput,
    MultiRadio,
    DateInputSingle,
    Patient,
    ShowModal,
    // Modal,
  },

  props: {
    nameVar: {
      type: String,
      required: true,
    },
    dataSource: {
      type: Object,
      default: () => {},
    },
    patienInformation: {
      type: Boolean,
      required: true,
      defautl: false,
    },
  },
  emits: ["update-input"],
  data() {
    return {
      loading: false,
      modal: false,
      timeout: null,
      provinces: [],
      citiys: [],
      districts: [],
      subdistricts: [],
      showEdit: false,
      gender: ["L", "P"],
      jenis_identitas: ["KTP", "PASSPORT"],
      showModal: false,
      data: {
        id: "",
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
        kalgen_id: "",
      },
    };
  },

  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit("update-input", newVal, this.nameVar);
      },
      deep: true,

      immediate: true,
    },
    dataSource: {
      handler(newVal, oldVal) {
        this.data = newVal;
      },
      deep: true,

      immediate: true,
    },
  },
  mounted() {
    this.data = this.dataSource;
  },
  created() {
    this.fetchProvince();
    // this.fetchCitiys("", "35");
  },
  methods: {
    changeProvince() {
      this.fetchCitiys("", this.data.province.id);
      this.data.city = "";
      this.data.district = "";
      this.data.sub_district = "";
    },
    changeCity() {
      this.fetchDistrict("", this.data.city.name);
      this.data.district = "";
      this.data.sub_district = "";
    },

    changeDistrict() {
      this.fetchSubdistrict("", this.data.district.id);
      this.data.sub_district = "";
    },

    onSearchCity(search, loading) {
      if (search.length) {
        loading(true);
        // clear timeout variable
        clearTimeout(this.timeout);
        var self = this;
        this.timeout = setTimeout(function () {
          self.fetchCitiys(search, self.data.province.id);
        }, 500);
        loading(false);
      }
    },
    onSearchDistrict(search, loading) {
      if (search.length) {
        loading(true);
        // clear timeout variable
        clearTimeout(this.timeout);
        var self = this;
        this.timeout = setTimeout(function () {
          self.fetchDistrict(search, self.data.city.name);
        }, 500);
        loading(false);
      }
    },
    onSearchSubdistrict(search, loading) {
      if (search.length) {
        loading(true);
        // clear timeout variable
        clearTimeout(this.timeout);
        var self = this;
        this.timeout = setTimeout(function () {
          self.fetchSubdistrict(search, self.data.district.id);
        }, 500);
        loading(false);
      }
    },

    fetchProvince() {
      this.$apollo
        .query({
          query: qm.PROVINCE,
          variables: {
            filter: {},
            paging: {
              limit: 40,
            },
            sorting: [
              {
                field: "id",
                direction: "ASC",
              },
            ],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.provinces = result.data.provinces.nodes;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fecthLastKalgenId() {
      await this.$apollo
        .mutate({
          mutation: qm.GET_LAST_OF_KALGEN_ID,
          variables: {},
        })
        .then((result) => {
          this.data.kalgen_id = result.data.patientGetLastOfKalgenId.kalge_id;
          console.log(this.data.kalgen_id);
          return this.data.kalgen_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCitiys(city = "", province = "") {
      this.$apollo
        .query({
          query: qm.CITY,
          variables: {
            filter: {
              name: {
                iLike: `%${city}%`,
              },
              province: {
                id: {
                  iLike: `%${province}%`,
                },
              },
            },
            paging: {
              limit: 10,
            },
            sorting: [],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.citiys = result.data.citys.nodes;
        })
        .catch((error) => {
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        });
    },
    fetchDistrict(district = "", city = "") {
      this.$apollo
        .query({
          query: qm.DISTRICT,
          variables: {
            filter: {
              name: {
                iLike: `%${district}%`,
              },
              city: {
                name: {
                  iLike: `%${city}%`,
                },
              },
            },
            paging: {
              limit: 10,
            },
            sorting: [],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.districts = result.data.districts.nodes;
        })
        .catch((error) => {
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        });
    },
    fetchSubdistrict(subdistrict = "", district = "") {
      this.$apollo
        .query({
          query: qm.SUBDISTRICT,
          variables: {
            filter: {
              name: {
                iLike: `%${subdistrict}%`,
              },
              district: {
                id: {
                  iLike: `%${district}%`,
                },
              },
            },
            paging: {
              limit: 10,
            },
            sorting: [],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.subdistricts = result.data.subdistricts.nodes;
        })
        .catch((error) => {
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        });
    },

    addPatientData(choosen) {
      this.modal = false;
      this.data = choosen;
      this.showModal = false;
      if (choosen.city != "") {
        this.showEdit = true;
      }
      if (choosen.id) {
        // console.log(this.data.province);
        if (this.data.province != null) {
          this.fetchCitiys("", this.data.province.id);
        } else if (this.data.city != null) {
          this.fetchDistrict("", this.data.city.name);
        } else if (this.data.district != null) {
          this.fetchSubdistrict("", this.data.district.id);
        } else if (this.data.location.id) {
          this.fetchCitiys("", this.data.location.district.city.province.id);
          this.fetchDistrict("", this.data.location.district.city.name);
          this.fetchSubdistrict("", this.data.location.district.id);
        }
      }
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    searchPatient() {
      this.showModal = true;
      // this.modal.show();
      this.modal = true;
    },
    checkKalgen() {
      let kalgen_id =
        this.data.kalgen_id == null || this.data.kalgen_id == ""
          ? this.fecthLastKalgenId()
          : this.data.kalgen_id;

      alert(this.data.kalgen_id);

      return kalgen_id;
    },
    updatePatient() {
      console.log(this.data);
      let subdistrict_id = "";
      if (typeof this.data.sub_district == "string") {
        subdistrict_id = this.data.location.id;
      } else if (this.data.sub_district.id) {
        subdistrict_id = this.data.sub_district.id;
      }

      // return alert(subdistrict_id);

      let objupdate = {
        id: this.data.id,
        update: {
          address: this.data.address,
          birthdate: this.data.birth_date,
          email: this.data.email,
          gender: this.data.sex,
          identityNumber: this.data.id_number,
          identityType: this.data.id_type,
          medicalRecordNumber: this.data.medical_record,
          name: this.data.name,
          phone: this.data.phone,
          rt: this.data.rt,
          rw: this.data.rw,
          subdistrict_id: subdistrict_id,
          kalgen_id: this.data.kalgen_id,
        },
      };
      this.$apollo
        .mutate({
          mutation: qm.PATIENT_UPDATE,
          variables: {
            input: objupdate,
          },
        })
        .then((result) => {
          let dataChoose = result.data.patientUpdate;
          this.data.id = dataChoose.id;
          this.data.name = dataChoose.name;
          this.data.id_type = dataChoose.identityType;
          this.data.id_number = dataChoose.identityNumber;
          this.data.medical_record = dataChoose.medicalRecordNumber;
          this.data.birth_date = new Date(dataChoose.birthdate).toISOString();
          this.data.sex = dataChoose.gender;
          this.data.address = dataChoose.address;
          this.data.rt = dataChoose.rt;
          this.data.rw = dataChoose.rw;
          this.data.province =
            dataChoose.subdistrict.district.city.province.name;
          this.data.city = dataChoose.subdistrict.district.city.name;
          this.data.district = dataChoose.subdistrict.district.name;
          this.data.sub_district = dataChoose.subdistrict.name;
          this.data.phone = dataChoose.phone;
          this.data.email = dataChoose.email;
          this.data.location = dataChoose.subdistrict;
          this.$swal.fire(
            "Success",
            "Data pasien telah berhasil diupdate",
            "success"
          );
        })
        .catch((error) => {
          this.$swal.fire("Error", error.toString(), "error");
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        })
        .then(() => {});
    },
  },
};
</script>

<style lang="scss">
input:checked ~ label {
  background: #006a4b;
  color: white;
}
input:checked:hover ~ label {
  background: #006a4b;
  color: white;
}
</style>
