<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <card-box title="Filter Clinician">
        <template #content>
          <TextInputSingle
            label="Name"
            :file="data.name"
            name-var="name"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Phone"
            :file="data.phone"
            name-var="phone"
            type="number"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Fax"
            :file="data.fax"
            name-var="fax"
            type="number"
            @update-data="updateData"
          />
          <TextInputSingle
            label="Email"
            :file="data.email"
            name-var="email"
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
              <h6 class="mb-0 text-success">List Clinician</h6>
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
  <div
    id="modal-form"
    ref="formModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-form"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <Form
          ref="form"
          v-slot="{ errors }"
          role="form"
          method="POST"
          :validation-schema="schema"
          class="needs-validation"
          @submit="save"
        >
          <div class="modal-header">
            <h5 id="formModalLabel" class="modal-title text-success">
              Form Add Clinician
            </h5>
            <button
              type="button"
              class="btn-close text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <!-- <span aria-hidden="true">×</span> -->
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="name" class="col-form-label">Name :</label>
              <Field
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                :class="'form-control ' + (errors.name ? 'is-invalid' : '')"
              />
              <div class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
            <div class="form-group">
              <label for="phone" class="col-form-label">Phone:</label>
              <Field
                id="phone"
                v-model="form.phone"
                name="phone"
                class="form-control"
              />
              <!-- <Field as="textarea" name="price" :class="'form-control '+(errors.mes ? 'is-invalid' : 'is-valid')" id="message-text" /> -->
              <div class="invalid-feedback">
                {{ errors.phone }}
              </div>
            </div>
            <div class="form-group">
              <label for="fax" class="col-form-label">Fax:</label>
              <Field
                id="fax"
                v-model="form.fax"
                as="textarea"
                name="fax"
                class="form-control"
              />
              <div class="invalid-feedback">
                {{ errors.fax }}
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <Field
                id="email"
                v-model="form.email"
                as="textarea"
                name="email"
                class="form-control"
              />
              <div class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              :disabled="loading"
              class="btn bg-gradient-secondary"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              v-if="!loading"
              type="submit"
              :disabled="loading"
              class="btn bg-gradient-success"
            >
              Save
            </button>
            <button
              v-else
              class="btn bg-gradient-success"
              type="button"
              :disabled="loading"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <i>Saving...</i>
            </button>
          </div>
        </Form>
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
import * as qm from "../graphqlquery";

import moment from "moment";

import { Modal } from "bootstrap";
import { Form, Field } from "vee-validate";
import Inputmask from "inputmask";
import CardBox from "@/views/components/Layout/CardBox.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
export default {
  name: "Clinician",
  components: {
    Form,
    Field,
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
        phone: "",
        fax: "",
        email: "",
      },
      choosen: {
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
      loading: false,

      modal: null,
      form: {
        id: "",
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
      defform: {
        id: "",
        name: "",
        phone: "",
        fax: "",
        email: "",
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
          field: "name",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Phone",
          field: "phone",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Fax",
          field: "fax",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Email",
          field: "email",
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
        this.$emit("add-clinician", newVal);
      },
      deep: true,

      immediate: true,
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.formModal);
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },

    edit(data) {
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.email = data.email;
      this.form.fax = data.fax;
      this.form.phone = data.phone;

      this.modal.show();
      return false;
    },
    choose(data) {
      this.choosen.id = data.id;
      this.choosen.name = data.name;
      this.choosen.email = data.email;
      this.choosen.fax = data.fax;
      this.choosen.phone = data.phone;
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
        name: "",
        phone: "",
        fax: "",
        email: "",
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
        newfilter[key] = {
          iLike: "%" + value + "%",
        };
      }

      this.$apollo
        .query({
          query: qm.CLINICIAN,
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
          self.totalRecords = result.data.clinicians.totalCount;
          self.isLoading = false;
          self.rows = result.data.clinicians.nodes;
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
