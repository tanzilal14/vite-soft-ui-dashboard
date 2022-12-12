<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <card-box title="Filter Patient">
        <template #content>
          <TextInputSingle
            label="Name"
            :important="true"
            :file="data.name"
            name-var="name"
            @update-data="updateData"
          />

          <TextInputSingle
            label="Nomor Identitas (KTP / Passport)"
            type="number"
            :file="data.identityNumber"
            name-var="identityNumber"
            @update-data="updateData"
          />

          <TextInputSingle
            label="Medical Record No."
            type="number"
            :file="data.medicalRecordNumber"
            name-var="medicalRecordNumber"
            @update-data="updateData"
          />

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <div>
              <button
                class="btn mb-0 bg-gradient-danger btn-sm null null ms-auto mb-0 pull-right"
                @click="resetFilter"
              >
                Reset</button
              >&nbsp;
              <button
                class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0 pull-right"
                @click="fetchData"
              >
                Search
              </button>
            </div>
          </div>
        </template>
      </card-box>

      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">List Patient</h6>
              <!-- <button
                class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0"
                @click="add"
              >
                Add New
              </button> -->
            </div>
          </div>
          <div class="card-body pt-0 pb-2 pl-2">
            <div class="table-responsive">
              <vue-good-table
                class="mb-3"
                style-class="vgt-table striped"
                theme="polar-bear"
                mode="remote"
                :total-rows="totalRecords"
                :is-loading="isLoading"
                :pagination-options="{
                  enabled: true,
                  perPage: 10,
                  perPageDropdown: [10, 50, 100],
                  dropdownAllowAll: true,
                }"
                :rows="rows"
                :columns="columns"
                @page-change="onPageChange"
                @sort-change="onSortChange"
                @column-filter="onColumnFilter"
                @per-page-change="onPerPageChange"
              >
                <template #table-row="props" :index="index" :columns="columns">
                  <span v-if="props.column.field === 'id'">{{
                    props.index +
                    (serverParams.page - 1) * serverParams.perPage +
                    1
                  }}</span>
                  <span v-else-if="props.column.field === 'createdAt'">{{
                    moment(props.formattedRow[props.column.field]).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )
                  }}</span>
                  <div v-else-if="props.column.field === 'action'">
                    <button
                      class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0 pull-right"
                      @click="choose(props.row)"
                    >
                      Choose
                    </button>
                  </div>
                  <span v-else>{{
                    props.formattedRow[props.column.field]
                  }}</span>
                </template>
              </vue-good-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table-next";
import * as qm from "../graphqlquery";
import TextInput from "@/views/components/Input/TextInput.vue";
import { Form, Field } from "vee-validate";
import MultiRadio from "@/views/components/Input/MultiRadio.vue";

import moment from "moment";

import CardBox from "@/views/components/Layout/CardBox.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
export default {
  name: "Patient",
  components: {
    Form,
    Field,
    CardBox,
    VueGoodTable,
    TextInputSingle,
    TextInput,
    MultiRadio,
  },
  emits: ["add-patient"],
  data() {
    return {
      date: [],
      data: {
        name: "",
        address: "",
        birthdate: "",
        createdAt: "",
        email: "",
        gender: "",
        id: "",
        identityNumber: "",
        identityType: "",
        is_active: "",
        medicalRecordNumber: "",
        phone: "",
        rt: "",
        kalgen_id: "",
        rw: "",
        subdistrict: {
          id: "",
          name: "",
          district: {
            id: "",
            name: "",
            city: {
              id: "",
              name: "",
              province: {
                id: "",
                name: "",
              },
            },
          },
        },
      },
      choosen: {
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
      loading: false,

      modal: null,
      form: {
        name: "",
        address: "",
        birthdate: "",
        createdAt: "",
        email: "",
        gender: "",
        id: "",
        identityNumber: "",
        identityType: "",
        is_active: "",
        medicalRecordNumber: "",
        phone: "",
        rt: "",
        rw: "",
        subdistrict: {
          name: "",
          district: {
            name: "",
            city: {
              name: "",
              province: {
                name: "",
              },
            },
          },
        },
      },
      defform: {
        name: "",
        address: "",
        birthdate: "",
        createdAt: "",
        email: "",
        gender: "",
        id: "",
        identityNumber: "",
        identityType: "",
        is_active: "",
        medicalRecordNumber: "",
        phone: "",
        rt: "",
        rw: "",
        subdistrict: {
          name: "",
          district: {
            name: "",
            city: {
              name: "",
              province: {
                name: "",
              },
            },
          },
        },
      },
      pageLength: 10,
      isLoading: true,
      rows: [],
      totalRecords: 0,
      columns: [
        {
          label: "No",
          field: "id",
          width: "70px",
          tdClass: "text-center",
          sortable: false,
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Medical Number",
          field: "medicalRecordNumber",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Name",
          field: "name",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Birthdate",
          field: "birthdate",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Address",
          field: "address",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Action",
          field: "action",
          sortable: false,
        },
      ],
      serverParams: {
        columnFilters: {},
        sort: [
          {
            field: "id",
            type: "desc",
          },
        ],
        page: 1,
        perPage: 10,
        pageHold: 1,
      },
    };
  },
  computed: {},
  watch: {
    choosen: {
      handler(newVal, oldVal) {
        this.$emit("add-patient", newVal);
      },
      deep: true,

      immediate: true,
    },
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },

    choose(dataChoose) {
      // console.log(dataChoose);
      // this.data = dataChoose;
      // this.choosen = dataChoose;
      this.choosen.id = dataChoose.id;
      this.choosen.name = dataChoose.name;
      this.choosen.id_type = dataChoose.identityType;
      this.choosen.id_number = dataChoose.identityNumber;
      this.choosen.medical_record = dataChoose.medicalRecordNumber;
      this.choosen.birth_date = new Date(dataChoose.birthdate).toISOString();
      this.choosen.sex = dataChoose.gender;
      this.choosen.address = dataChoose.address;
      this.choosen.rt = dataChoose.rt;
      this.choosen.rw = dataChoose.rw;
      this.choosen.province =
        dataChoose.subdistrict.district.city.province.name;
      this.choosen.city = dataChoose.subdistrict.district.city.name;
      this.choosen.district = dataChoose.subdistrict.district.name;
      this.choosen.sub_district = dataChoose.subdistrict.name;
      this.choosen.phone = dataChoose.phone;
      this.choosen.email = dataChoose.email;
      this.choosen.location = dataChoose.subdistrict;
      this.choosen.kalgen_id = dataChoose.kalgen_id;
    },

    resetFilter() {
      this.data = {
        name: "",
        address: "",
        birthdate: "",
        createdAt: "",
        email: "",
        gender: "",
        id: "",
        identityNumber: "",
        identityType: "",
        is_active: "",
        medicalRecordNumber: "",
        phone: "",
        rt: "",
        rw: "",
        subdistrict: {
          name: "",
          district: {
            name: "",
            city: {
              name: "",
              province: {
                name: "",
              },
            },
          },
        },
      };
      this.fetchData();
    },
    fetchData() {
      var self = this;

      var neworder = [
        {
          field: this.serverParams.sort[0].field,
          direction: this.serverParams.sort[0].type == "asc" ? "ASC" : "DESC",
        },
      ];
      var newfilter = {};
      for (const [key, value] of Object.entries(this.data)) {
        if (
          key == "identityNumber" ||
          key == "medicalRecordNumber" ||
          key == "name"
        ) {
          newfilter[key] = {
            iLike: "%" + value + "%",
          };
        }
      }

      this.$apollo
        .query({
          query: qm.PATIENT,
          variables: {
            filter: newfilter,
            paging: {
              limit: this.serverParams.perPage,
              offset: (this.serverParams.page - 1) * this.serverParams.perPage,
            },
            sorting: neworder,
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          // self.totalRecords = result.data;
          self.totalRecords = result.data.patients.totalCount;
          self.isLoading = false;
          // self.rows = result.data;
          self.rows = result.data.patients.nodes;
        })
        .catch((error) => {
          console.log(error);
          console.log(JSON.stringify(error, null, 2));
        });
    },
    updateParams(newProps) {
      // this.serverParams.page = this.serverParams.page + 1;
      // this.serverParams.page = this.serverParams.page * this.serverParams.page;
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
      this.fetchData();
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
      this.fetchData();
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      });
      this.fetchData();
    },

    onColumnFilter(params) {
      this.updateParams(params);
      this.fetchData();
    },
  },
};
</script>
