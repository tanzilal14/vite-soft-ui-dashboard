<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <card-box title="Filter Customer">
        <template #content>
          <TextInputSingle
            label="Cust. ID"
            :important="true"
            :file="data.customer_id"
            name-var="customer_id"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Cust. Name"
            :important="true"
            :file="data.customer_name"
            name-var="customer_name"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Address"
            :file="data.customer_address"
            name-var="customer_address"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Lab Phone"
            :file="data.lab_phone"
            name-var="lab_phone"
            type="number"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Lab Email"
            :file="data.lab_email"
            name-var="lab_email"
            type="email"
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
      <!-- <pre wrap>
        {{ choosen }}
      </pre> -->
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">List Customer</h6>
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

                  <!-- <div v-else-if="props.column.field === 'action'">
                    <span
                      style="font-size: 14px"
                      class="edit"
                      href="#"
                      @click="edit(props.row)"
                      ><i
                        style="cursor: pointer"
                        title="Edit"
                        class="bi bi-pencil text-warning cursor"
                      ></i></span
                    >&nbsp;
                    <span
                      style="font-size: 14px"
                      class="delete"
                      href="#"
                      @click="delact(props.row)"
                      ><i
                        style="cursor: pointer"
                        title="Delete"
                        class="bi bi-trash text-danger cursor"
                      ></i></span
                    >&nbsp;
                  </div> -->
                  <div v-else-if="props.column.field === 'action'">
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

import moment from "moment";

import { Modal } from "bootstrap";
import { Form, Field } from "vee-validate";
import Inputmask from "inputmask";
import CardBox from "@/views/components/Layout/CardBox.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
export default {
  name: "Customer",
  components: {
    Form,
    Field,
    CardBox,
    VueGoodTable,
    TextInputSingle,
  },
  emits: ["add-customer"],
  data() {
    return {
      date: [],
      data: {
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
      },
      choosen: {
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
      },
      loading: false,

      modal: null,
      form: {
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
      },
      defform: {
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
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
          label: "Name",
          field: "customer_name",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Phone",
          field: "lab_phone",
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
          label: "Email",
          field: "lab_email",
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
        this.$emit("add-customer", newVal);
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

    choose(data) {
      this.choosen.id = data.id;
      this.choosen.customer_name = data.customer_name;
      this.choosen.lab_email = data.lab_email;
      this.choosen.lab_phone = data.lab_phone;
      this.choosen.address = data.address;
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
    cancel() {
      this.modal.hide();

      this.form = Object.assign({}, this.defform);
    },
    add() {
      this.modal.show();
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
              mutation: qm.CLINICIAN_DELETE,
              variables: {
                input: { id: data.id },
              },
            })
            .then((result) => {
              console.log(result);
              self.loading = false;
              self.cancel();
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
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
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
        if (key != "id") {
          newfilter[key] = {
            iLike: "%" + value + "%",
          };
        }
      }

      this.$apollo
        .query({
          query: qm.CUSTOMER,
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
          self.totalRecords = result.data.customers.totalCount;
          self.isLoading = false;
          // self.rows = result.data;
          self.rows = result.data.customers.nodes;
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
