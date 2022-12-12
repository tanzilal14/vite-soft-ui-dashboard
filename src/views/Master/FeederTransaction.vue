<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <card-box title="Filter Feed Transaction">
        <template #content>
          <FormKit
            id="feederTransaction"
            type="form"
            :actions="false"
            @submit="formAction"
          >
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
              rules=""
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
          </FormKit>
          <!-- <pre wrap>{{ data }}</pre> -->

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
                @click="submitForm"
              >
                Search
              </button>
            </div>
          </div>
        </template>
      </card-box>
      <!-- <pre wrap>
        {{ choosen }}
      </pre> -->
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">List Feed Transaction</h6>
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
                    <!-- <span
                      style="font-size: 14px"
                      class="edit"
                      href="#"
                      @click="edit(props.row)"
                      ><i
                        style="cursor: pointer"
                        title="Edit"
                        class="bi bi-pencil text-warning cursor"
                      ></i></span
                    > -->

                    <button
                      class="btn mb-0 bg-gradient-success btn-sm"
                      @click="update(props.row)"
                    >
                      <i class="cursor-pointer fa fa-pencil"></i>
                      &nbsp; Edit
                    </button>

                    &nbsp;

                    <button
                      class="btn mb-0 bg-gradient-danger btn-sm"
                      @click="delact(props.row)"
                    >
                      <i class="cursor-pointer fa fa-trash"></i>
                      &nbsp; Delete
                    </button>
                  </div>
                  <!-- <div v-else-if="props.column.field === 'action'"> -->
                  <!-- <span
                      style="font-size: 14px"
                      class="edit"
                      href="#"
                      @click="choose(props.row)"
                      ><i
                        style="cursor: pointer"
                        title="Edit"
                        class="bi bi-pencil text-warning cursor"
                      ></i></span
                    >&nbsp; -->
                  <!-- <button
                      class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0 pull-right"
                      @click="choose(props.row)"
                    >
                      Choose
                    </button>
                  </div> -->
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

<script setup>
const schema = {
  name: "required",
  email: "required",
  phone: "required",
  fax: "required",
};
</script>
<script>
import { VueGoodTable } from "vue-good-table-next";
import * as qm from "../../graphqlquery";

import moment from "moment";

import CardBox from "@/views/components/Layout/CardBox.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
export default {
  name: "FeederTransaction",
  components: {
    CardBox,
    VueGoodTable,
    TextInputSingle,
  },
  emits: ["add-clinician"],
  data() {
    return {
      date: [],
      data: {
        name: "",
        medicalRecordNumber: "",
        identityNumber: "",
      },
      choosen: {
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
      loading: false,

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
          label: "Name",
          field: "patient.name",
          sortable: false,

          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Medical Record Number",
          field: "patient.medicalRecordNumber",
          sortable: false,

          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "BirthDate",
          field: "patient.birthdate",
          sortable: false,

          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Address",
          field: "patient.address",
          sortable: false,

          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        // {
        //   label: "Email",
        //   field: "email",
        //   filterOptions: {
        //     enabled: false,
        //     placeholder: "Filter Search",
        //   },
        // },

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
        this.$emit("add-clinician", newVal);
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
    submitForm() {
      this.$formkit.submit("feederTransaction");
    },
    update(data) {
      this.$store.state.update_histologi = data;
      this.$router.push({ name: "histologi", query: { edit: true } });
    },
    formAction() {
      this.fetchData();
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },

    choose(data) {
      this.choosen = data;
    },
    async save() {
      var self = this;

      if (this.form.id == "" || this.form.id == undefined) {
        console.log(this.form.id);
        delete this.form.id;

        this.loading = true;
        var success = false;
        await self.$apollo
          .mutate({
            mutation: qm.CLINICIAN_CREATE,
            variables: {
              input: {
                clinician: this.form,
              },
            },
          })
          .then((result) => {
            console.info(result);
            success = true;
            self.form.id = result.data.clinicianCreate.id;
            self.loading = false;
            self.cancel();
            self.fetchData();
            self.$swal.fire("Success", "Data Saved Successfuly", "success");
          })
          .catch((error) => {
            this.form.id == "";
            console.log(error);
            self.loading = false;
            // self.cancel();
            self.fetchData();
            self.$swal.fire("Error", error.toString(), "error");
          })
          .then(() => {});
      } else {
        console.log(this.form.id);
        this.loading = true;
        var success = false;
        let objupdate = {
          id: this.form.id,
          update: {
            name: this.form.name,
            phone: this.form.phone,
            fax: this.form.fax,
            email: this.form.email,
          },
        };
        this.loading = true;
        await self.$apollo
          .mutate({
            mutation: qm.CLINICIAN_UPDATE,
            variables: {
              input: objupdate,
            },
          })
          .then((result) => {
            success = true;
            console.log(result);
            self.loading = false;
            self.cancel();
            self.fetchData();
            self.$swal.fire("Success", "Data Saved Successfuly", "success");
          })
          .catch((error) => {
            console.log(error);
            self.loading = false;
            // self.cancel();
            self.fetchData();
            self.$swal.fire("Error", error.toString(), "error");
          })
          .then(() => {});
      }
    },

    delact(data) {
      var self = this;
      this.$swal({
        title: "Delete " + data.name,
        text: "Are You sure?",
        icon: "warning",
        backdrop: true,
        showCancelButton: true,
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#44A32B",
        cancelButtonColor: "#dc3545",
        reverseButtons: true,
        preConfirm: function () {
          self.$apollo
            .mutate({
              mutation: qm.FEEDER_TRANSACTION_DELETE,
              variables: {
                input: { id: data.id },
              },
            })
            .then((result) => {
              console.log(result);
              self.loading = false;
              self.fetchData();

              self.$swal.fire("Success", "Data Deleted Successfuly", "success");
            })
            .catch((error) => {
              console.log(error);
              self.loading = false;
              // self.cancel();
              self.fetchData();
              self.$swal.fire("Error", error.toString(), "error");
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {});
      return false;
    },
    resetFilter() {
      this.data = {
        name: "",
        medicalRecordNumber: "",
        identityNumber: "",
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
      // var newfilter = {};
      // for (const [key, value] of Object.entries(this.data)) {
      //   newfilter[key] = {
      //     iLike: "%" + value + "%",
      //   };
      // }

      this.$apollo
        .query({
          query: qm.FEEDER_TRANSACTION,
          variables: {
            filter: {
              patient: {
                name: { iLike: `%${this.data.name}%` },
                medicalRecordNumber: {
                  iLike: `%${this.data.medicalRecordNumber}%`,
                },
                identityNumber: { iLike: `%${this.data.identityNumber}%` },
              },
            },
            paging: {
              limit: this.serverParams.perPage,
              offset: (this.serverParams.page - 1) * this.serverParams.perPage,
            },
            sorting: neworder,
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          self.totalRecords = result.data.feederTransactions.totalCount;
          self.isLoading = false;
          self.rows = result.data.feederTransactions.nodes;
        })
        .catch((error) => {
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
      console.log(JSON.stringify(params, null, 2));

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
    addsched() {
      this.schedules.push({
        id: "",
        startTime: "",
        endTime: "",
        dayname: "",
        timePerSession: "",
        product_id: this.form.id,
      });
    },
    removesched(idx) {
      if (this.schedules[idx].id != "") this.delsched.push(this.schedules[idx]);
      this.schedules.splice(idx);
    },
    formatpicker(date) {
      return `${moment(date[0]).format("DD/MM/YYYY")} - ${moment(
        date[1]
      ).format("DD/MM/YYYY")}`;
    },
    openplace() {
      this.$root.$placebrowser().then((resp) => {
        if (resp.success) {
          this.place = Object.assign({}, resp.data);
          this.form.place_id = this.place.id;
        }
      });
    },
  },
};
</script>
