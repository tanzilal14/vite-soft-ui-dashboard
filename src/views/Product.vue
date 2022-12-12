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
            <div class="row">
              <label class="col-form-label col-2">Price :</label>
              <div class="col-4">
                <input
                  id="minprice"
                  v-model="filter.minprice"
                  type="text"
                  class="form-control thousand"
                />
              </div>
              <div class="col-5">
                <input
                  id="maxprice"
                  v-model="filter.maxprice"
                  type="text"
                  class="form-control thousand"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <label class="col-form-label col-2">Created At :</label>
              <div class="col-9">
                <Datepicker
                  v-model="date"
                  range
                  auto-apply
                  :enable-time-picker="false"
                  :format="formatpicker"
                ></Datepicker>
              </div>
            </div>
            <br />
            <div class="row">
              <label class="col-form-label col-2">Name :</label>
              <div class="col-9">
                <input v-model="filter.name" type="text" class="form-control" />
              </div>
            </div>
            <br />
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
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0 text-success">List Product</h6>
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
                  <div v-else-if="props.column.field === 'action'">
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
              Form Product
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
              <label for="description" class="col-form-label"
                >Description:</label
              >
              <Field
                id="description"
                v-model="form.description"
                as="textarea"
                name="description"
                :class="
                  'form-control ' + (errors.description ? 'is-invalid' : '')
                "
              />
              <div class="invalid-feedback">
                {{ errors.description }}
              </div>
            </div>
            <div class="form-group">
              <label for="place_id" class="col-form-label">Place:</label>
              <!-- <v-select id="place_id" :options="places" v-model="form.place_id" :reduce="(option) => option.id" label="name"></v-select> -->
              <div class="row">
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="place != null ? place.name : ''"
                  />
                  <div class="invalid-feedback">
                    {{ errors.place_id }}
                  </div>
                </div>
                <div class="col-md-2">
                  <button
                    type="button"
                    :disabled="loading"
                    class="btn bg-gradient-success"
                    @click="openplace"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="place_id" class="col-form-label"
                >List Schedule:</label
              >
              <div class="row">
                <div class="col-md-12">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Day</th>
                        <th>Time Per Session</th>
                        <th>
                          <button
                            type="button"
                            style="padding: 0.25rem 1rem; font-size: 25px"
                            class="btn btn-info"
                            @click="addsched"
                          >
                            +
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in schedules" :key="'sched' + idx">
                        <td>
                          <Field
                            v-model="schedules[idx].startTime"
                            type="time"
                            :name="`schedstarttime[` + idx + `]`"
                            :class="
                              'form-control ' +
                              (errors.schedstarttime ? 'is-invalid' : '')
                            "
                          />
                        </td>
                        <td>
                          <Field
                            v-model="schedules[idx].endTime"
                            type="time"
                            :name="`schedendtime[` + idx + `]`"
                            :class="
                              'form-control ' +
                              (errors.schedendtime ? 'is-invalid' : '')
                            "
                          />
                        </td>
                        <td>
                          <Field
                            v-model="schedules[idx].dayname"
                            as="select"
                            :name="`scheddayname[` + idx + `]`"
                            :class="
                              'form-control ' +
                              (errors.scheddayname ? 'is-invalid' : '')
                            "
                            @change="
                              (e) => (schedules[idx].dayname = e.target.value)
                            "
                          >
                            <option value="">Choose Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </Field>
                        </td>
                        <td>
                          <Field
                            v-model="schedules[idx].timePerSession"
                            as="select"
                            :name="`schedtimepersession[` + idx + `]`"
                            :class="
                              'form-control ' +
                              (errors.schedtimepersession ? 'is-invalid' : '')
                            "
                            @change="
                              (e) =>
                                (schedules[idx].timePerSession = e.target.value)
                            "
                          >
                            <option value="">Choose Time Per Session</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                          </Field>
                        </td>
                        <td>
                          <button
                            v-if="idx > 0"
                            type="button"
                            style="padding: 0rem 1rem 0.25rem; font-size: 25px"
                            class="btn btn-danger"
                            @click="removesched(idx)"
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
import * as yup from "yup";
const schema = {
  name: "required",
  price: "required",
  description: "required",
  //   schedstarttime: 'required',
  //   schedendtime: 'required',
  //   scheddayname: 'required',
  //   schedtimepersession: 'required',
};
</script>
<script>
import { VueGoodTable } from "vue-good-table-next";
import * as qm from "../graphqlquery";
import VsudButton from "@/components/VsudButton.vue";
import { isProxy, toRaw, ref, onMounted } from "vue";
import moment from "moment";
import id from "moment/locale/id";
import { Modal } from "bootstrap";
import { Form, Field, FieldArray } from "vee-validate";
import Inputmask from "inputmask";

export default {
  // setup() {
  //     const date = ref();

  //     // For demo purposes assign range from the current date
  //     onMounted(() => {
  //         const startDate = new Date();
  //         const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  //         date.value = [startDate, endDate];
  //     })

  //     return {
  //         date,
  //     }
  // },
  name: "PlaceTable",
  components: {
    VsudButton,
    Form,
    Field,
    FieldArray,
    VueGoodTable,
  },
  data() {
    return {
      date: [],
      filter: {
        minprice: "",
        maxprice: "",
        name: "",
      },
      loading: false,
      places: [],
      place: null,
      schedules: [
        {
          id: "",
          startTime: "",
          endTime: "",
          dayname: "",
          timePerSession: "",
          product_id: "",
        },
      ],
      delsched: [],
      modal: null,
      form: {
        id: "",
        name: "",
        price: "",
        description: "",
        place_id: "",
      },
      defform: {
        id: "",
        name: "",
        price: "",
        description: "",
        place_id: "",
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
          label: "Price",
          field: "price",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Place",
          field: "place.name",
          filterOptions: {
            enabled: false,
            placeholder: "Filter Search",
          },
        },
        {
          label: "Created At",
          field: "createdAt",
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
            field: "createdAt",
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
    var selectorhour = document.getElementsByClassName("hour");
    Inputmask("datetime", {
      inputFormat: "hh:mm",
    }).mask(selectorhour);
  },
  created() {
    this.fetchData();
    this.loadMaster();
  },
  methods: {
    getNested(obj, ...args) {
      return args.reduce((obj, level) => obj && obj[level], obj);
    },
    currencyFormated(value) {
      value = parseInt(value) || 0;
      return formatAsCurrency(value, 0);
    },
    loadMaster() {
      var self = this;
      this.$apollo
        .query({
          query: qm.PLACES,
          variables: {
            filter: {},
            paging: {
              limit: 1000,
              offset: 0,
            },
            sorting: [],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          self.places = result.data.places.nodes;
        })
        .catch((error) => {});
    },
    edit(data) {
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.price = data.price.toString();
      this.form.description = data.description;
      this.form.place_id = data.place.id;
      this.place = Object.assign({}, data.place);
      if (data.schedules.length > 0) {
        this.schedules = [];
        data.schedules.forEach((h) => {
          this.schedules.push({
            id: h.id,
            startTime: h.startTime,
            endTime: h.endTime,
            dayname: h.dayname,
            timePerSession: h.timePerSession,
            product_id: h.product_id,
          });
        });
      }
      this.modal.show();
      return false;
    },
    async save() {
      var self = this;
      if (this.form.place_id == "" || this.form.place_id == null) {
        this.$swal.fire("Error", "Place Required", "error");
        return;
      }
      //cek schedule
      var ceksked = false;
      for (var key in self.schedules) {
        self.schedules.forEach((i, v) => {
          if (
            i.startTime == "" ||
            i.endTime == "" ||
            i.dayname == "" ||
            i.timePerSession == ""
          ) {
            ceksked = true;
          }
        });
      }
      if (ceksked) {
        this.$swal.fire("Error", "Please fill all field Schedule", "error");
        return;
      }
      if (this.form.id == "") {
        delete this.form.id;
        this.form.price = parseInt(this.form.price.replaceAll(".", ""));
        this.loading = true;
        var success = false;
        await self.$apollo
          .mutate({
            mutation: qm.PRODUCT_CREATE,
            variables: {
              input: {
                product: this.form,
              },
            },
          })
          .then((result) => {
            console.info(result);
            success = true;
            self.form.id = result.data.createOneProduct.id;
          })
          .catch((error) => {})
          .then(() => {});
        if (success) {
          for (var key in self.schedules) {
            delete self.schedules[key].id;
            self.schedules[key].product_id = self.form.id;
            self.schedules[key].timePerSession = parseInt(
              self.schedules[key].timePerSession
            );
          }
          await self.$apollo
            .mutate({
              mutation: qm.SCHEDULE_MANY_CREATE,
              variables: {
                input: self.schedules,
              },
            })
            .then((result) => {
              self.cancel();
              self.fetchData();
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
          self.loading = false;
          self.$swal.fire("Error", "Error occured", "error");
        }
      } else {
        this.form.price = parseInt(this.form.price.replaceAll(".", ""));
        this.loading = true;
        var success = false;
        let objupdate = {
          id: this.form.id,
          update: {
            name: this.form.name,
            price: this.form.price,
            description: this.form.description,
            place_id: this.form.place_id,
          },
        };
        this.loading = true;
        await self.$apollo
          .mutate({
            mutation: qm.PRODUCT_UPDATE,
            variables: {
              input: objupdate,
            },
          })
          .then((result) => {
            success = true;
          })
          .catch((error) => {})
          .then(() => {});
        if (success) {
          var newschedules = [];
          for (var key in self.schedules) {
            self.schedules[key].product_id = self.form.id;
            self.schedules[key].timePerSession = parseInt(
              self.schedules[key].timePerSession
            );
            if (self.schedules[key].id == "") {
              newschedules.push(self.schedules[key]);
            } else {
              let schedupdate = {
                id: self.schedules[key].id,
                update: {
                  product_id: self.schedules[key].product_id,
                  dayname: self.schedules[key].dayname,
                  endTime: self.schedules[key].endTime,
                  startTime: self.schedules[key].startTime,
                  timePerSession: self.schedules[key].timePerSession,
                },
              };
              await self.$apollo
                .mutate({
                  mutation: qm.SCHEDULE_UPDATE,
                  variables: {
                    input: schedupdate,
                  },
                })
                .then((result) => {})
                .catch((error) => {})
                .then(() => {});
            }
          }
          for (var key in newschedules) {
            delete newschedules[key].id;
            newschedules[key].timePerSession = parseInt(
              newschedules[key].timePerSession
            );
          }
          await self.$apollo
            .mutate({
              mutation: qm.SCHEDULE_MANY_CREATE,
              variables: {
                input: newschedules,
              },
            })
            .then((result) => {})
            .catch((error) => {})
            .then(() => {});
          if (self.delsched.length > 0) {
            var objdelete = {
              id: {},
            };
            for (var key in self.delsched) {
              objdelete.id = Object.assign({}, objdelete.id, {
                eq: self.delsched[key].id,
              });
            }
            console.info(objdelete);
            await self.$apollo
              .mutate({
                mutation: qm.SCHEDULE_MANY_DELETE,
                variables: {
                  filter: objdelete,
                },
              })
              .then((result) => {})
              .catch((error) => {})
              .then(() => {});
          }
          self.loading = false;
          self.cancel();
          self.fetchData();
          self.$swal.fire("Success", "Data Saved Successfuly", "success");
        } else {
          self.loading = false;
          self.$swal.fire("Error", "Error occured", "error");
        }
      }
    },
    cancel() {
      this.form = Object.assign({}, this.defform);
      this.schedules = [
        {
          id: "",
          startTime: "",
          endTime: "",
          dayname: "",
          timePerSession: "",
          product_id: "",
        },
      ];
      this.place = null;
      this.delsched = [];
      this.modal.hide();
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
              mutation: qm.PRODUCT_DELETE,
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
        minprice: "",
        name: "",
        maxprice: "",
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
      for (const [key, value] of Object.entries(this.filter)) {
        if (key != "minprice" && key != "maxprice") {
          newfilter[key] = {
            iLike: "%" + value + "%",
          };
        }
      }
      if (parseInt(self.filter.minprice) && parseInt(self.filter.maxprice)) {
        newfilter["price"] = {
          between: {
            lower: parseInt(self.filter.minprice.replaceAll(".", "")),
            upper: parseInt(self.filter.maxprice.replaceAll(".", "")),
          },
        };
      }
      if (self.date != null) {
        if (self.date.length > 0) {
          newfilter["createdAt"] = {
            between: {
              lower: moment(self.date[0]).format("YYYY-MM-DD"),
              upper: moment(self.date[1]).format("YYYY-MM-DD"),
            },
          };
        }
      }
      this.$apollo
        .query({
          query: qm.PRODUCTS,
          variables: {
            filter: newfilter,
            paging: {
              limit: this.serverParams.perPage,
              offset: this.serverParams.page - 1,
            },
            sorting: neworder,
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          self.totalRecords = result.data.products.totalCount;
          self.isLoading = false;
          self.rows = result.data.products.nodes;
        })
        .catch((error) => {});
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
