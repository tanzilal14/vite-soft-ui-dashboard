<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">Filter</h6>
            </div>
          </div>
          <div class="card-body">
            <FormKit
              type="form"
              id="feederTransaction"
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
                rules="required"
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
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">List feederTransactions</h6>
              <button
                class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0"
                @click="add"
              >
                Add New
              </button>
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
                  dropdownAllowAll: false,
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
                    props.index + (serverParams.page - 1) * 10 + 1
                  }}</span>
                  <span v-else-if="props.column.field === 'createdAt'">{{
                    moment(props.formattedRow[props.column.field]).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )
                  }}</span>
                  <span v-else-if="props.column.field === 'price'">{{
                    currencyFormated(props.formattedRow[props.column.field])
                  }}</span>
                  <span v-else-if="props.column.field === 'status'">
                    <span
                      :class="
                        'badge bg-' +
                        alias_status[props.formattedRow[props.column.field]]
                      "
                      >{{ props.formattedRow[props.column.field] }}</span
                    >
                  </span>
                  <div v-else-if="props.column.field === 'action'">
                    <!-- <span style="font-size:14px;" @click="edit(props.row)" class="edit" href="#"><i style="cursor:pointer;" title="Edit" class="bi bi-pencil text-warning cursor"></i></span>&nbsp;
                                <span style="font-size:14px;" @click="delact(props.row)" class="delete" href="#"><i style="cursor:pointer;" title="Delete" class="bi bi-trash text-danger cursor"></i></span>&nbsp; -->
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
    <div class="modal-dialog modal-dialog-centered" role="document">
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
            <h5 id="formModalLabel" class="modal-title">Form Transactions</h5>
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
              <label for="price" class="col-form-label">Price:</label>
              <Field
                id="price"
                v-model="form.price"
                name="price"
                :class="
                  'form-control thousand ' + (errors.price ? 'is-invalid' : '')
                "
              />
              <!-- <Field as="textarea" name="price" :class="'form-control '+(errors.mes ? 'is-invalid' : 'is-valid')" id="message-text" /> -->
              <div class="invalid-feedback">
                {{ errors.price }}
              </div>
            </div>
            <div class="form-group">
              <label for="image_url" class="col-form-label">Image Url:</label>
              <Field
                id="image_url"
                v-model="form.image_url"
                name="image_url"
                :class="
                  'form-control ' + (errors.image_url ? 'is-invalid' : '')
                "
              />
              <div class="invalid-feedback">
                {{ errors.image_url }}
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
              class="btn bg-gradient-primary"
            >
              Save
            </button>
            <button
              v-else
              type="submit"
              :disabled="loading"
              class="btn bg-gradient-primary"
            >
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
  price: "required",
  image_url: "required",
};
</script>
<script>
import TextInputValidate from "@/views/components/Input/TextInputValidate.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";

import { VueGoodTable } from "vue-good-table-next";
import * as qm from "../../graphqlquery";
import VsudButton from "@/components/VsudButton.vue";
import { isProxy, toRaw } from "vue";
import moment from "moment";
import id from "moment/locale/id";
import { Modal } from "bootstrap";
import { Form, Field } from "vee-validate";
import Inputmask from "inputmask";

export default {
  name: "FeederTransaction",
  components: {
    VsudButton,
    Form,
    Field,
    VueGoodTable,
    TextInputValidate,
    TextInputSingle,
  },
  data() {
    return {
      data: {
        name: "",
        medicalRecordNumber: "",
        identityNumber: "",
      },
      date: [],
      alias_status: {
        SUCCESS: "success",
        FAILED: "danger",
        CANCEL: "secondary",
        PENDING: "warning",
      },
      filter: {
        status: "",
        type: "",
        payment_method: "",
        phone_number: "",
      },
      loading: false,
      modal: null,
      form: {
        id: "",
        name: "",
        price: "",
        image_url: "",
      },
      defform: {
        id: "",
        name: "",
        price: "",
        image_url: "",
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
          field: "patient.name",
          sortable: false,
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Identity Number",
          field: "patient.identityNumber",
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
        // {
        //   label: "Clinical Diagnosis",
        //   field: "patient.as_clinical_diagnosis",
        //   filterOptions: {
        //     enabled: false,
        //     placeholder: "Filter Search",
        //   },
        // },
        // {
        //   label: "Main Symptom",
        //   field: "histology.as_main_symptom_n_desc_of_the_disease",
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
      },
    };
  },
  computed: {},
  mounted() {
    this.modal = new Modal(this.$refs.formModal);
    var selector = document.getElementsByClassName("thousand");
    Inputmask("decimal", {
      alias: "numeric",
      groupSeparator: ".",
      autoGroup: true,
      digits: 0,
      radixPoint: ".",
      digitsOptional: false,
      allowMinus: false,
      rightAlign: false,
      prefix: "",
      placeholder: "",
    }).mask(selector);
  },
  created() {
    this.fetchData();
  },
  methods: {
    submitForm() {
      this.$formkit.submit("feederTransaction");
    },
    formAction() {
      this.fetchData();
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    currencyFormated(value) {
      value = parseInt(value) || 0;
      return formatAsCurrency(value, 0);
    },
    edit(data) {
      console.info(data);
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.price = data.price.toString();
      this.form.image_url = data.image_url;
      this.modal.show();
      return false;
    },
    save() {
      var self = this;
      if (this.form.id == "") {
        delete this.form.id;
        this.form.price = parseInt(this.form.price.replaceAll(".", ""));
        this.loading = true;
        self.$apollo
          .mutate({
            mutation: qm.TRAINER_CREATE,
            variables: {
              input: {
                transaction: this.form,
              },
            },
          })
          .then((result) => {
            self.fetchData();
            self.cancel();
            self.$swal.fire("Success", "Data Saved Successfuly", "success");
          })
          .catch((error) => {
            // console.info(error);
            self.$swal.fire("Error", error.toString(), "error");
          })
          .then(() => {
            self.loading = false;
          });
      } else {
        this.form.price = parseInt(this.form.price.replaceAll(".", ""));
        this.loading = true;
        let objupdate = {
          id: this.form.id,
          update: {
            name: this.form.name,
            price: this.form.price,
            image_url: this.form.image_url,
          },
        };
        self.$apollo
          .mutate({
            mutation: qm.TRAINER_UPDATE,
            variables: {
              input: objupdate,
            },
          })
          .then((result) => {
            self.fetchData();
            self.cancel();
            self.$swal.fire("Success", "Data Saved Successfuly", "success");
          })
          .catch((error) => {
            // console.info(error);
            self.$swal.fire("Error", error.toString(), "error");
          })
          .then(() => {
            self.loading = false;
          });
      }
    },
    cancel() {
      this.form = Object.assign({}, this.defform);
      this.modal.hide();
    },
    add() {
      this.modal.show();
    },
    delact(data) {
      console.info(data);
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
              mutation: qm.TRAINER_DELETE,
              variables: {
                id: data.id,
              },
            })
            .then((result) => {
              self.fetchData();
              self.$swal.fire("Success", "Data Deleted Successfuly", "success");
            })
            .catch((error) => {
              self.$swal.fire("Error", error.toString(), "error");
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {});
      return false;
    },
    resetFilter() {
      this.date = [];
      this.filter = {
        status: "",
        phone_number: "",
        payment_method: "",
        type: "",
      };
      this.fetchData();
    },
    async fetchData() {
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

      await this.$apollo
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
              offset: this.serverParams.page - 1,
            },
            sorting: neworder,
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          self.totalRecords = 10;
          self.isLoading = false;
          self.rows = result.data.feederTransactions.nodes;
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        });
    },
    updateParams(newProps) {
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
    formatpicker(date) {
      return `${moment(date[0]).format("DD/MM/YYYY")} - ${moment(
        date[1]
      ).format("DD/MM/YYYY")}`;
    },
  },
};
</script>
