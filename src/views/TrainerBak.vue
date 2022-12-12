<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
            <div class="card-header pb-0 mb-3">
                <div class="d-flex align-items-center">
                    <h6 class="mb-0">List Trainer</h6>
                    <button @click="add" class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0">Add New</button>
                </div>
            </div>
            <div class="card-body pt-0 pb-2 pl-2">
                <div class="table-responsive">
                    <DataTable
                        :ajax="getData"
                        :options="options"
                        style="width:100% !important;"
                        ref="table"
                        class="table align-items-center justify-content-center mb-0"
                        >
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card mb-4">
            <div class="card-header pb-0 mb-3">
                <div class="d-flex align-items-center">
                    <h6 class="mb-0">List Trainer</h6>
                    <button @click="add" class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0">Add New</button>
                </div>
            </div>
            <div class="card-body pt-0 pb-2 pl-2">
                <div class="table-responsive">
                    <vue-good-table
                        styleClass="vgt-table striped"
                        theme="polar-bear"
                        mode="remote"
                        @page-change="onPageChange"
                        @sort-change="onSortChange"
                        @column-filter="onColumnFilter"
                        @per-page-change="onPerPageChange"
                        :totalRows="totalRecords"
                        v-model.sync="isLoading"
                        :pagination-options="{
                            enabled: true,
                            perPage: 10,
                            perPageDropdown: [10, 50, 100],
                            dropdownAllowAll: false,
                        }"
                        :rows="rows"
                        :columns="columns"
                        >
                        <template v-slot:table-row="props" v-bind:index="index" v-bind:columns="columns">
                            <span v-if="props.column.field === 'id'">{{ props.index+((serverParams.page - 1) * 10)+1 }}</span>
                            <span v-else-if="props.column.field === 'createdAt'">{{ moment(props.formattedRow[props.column.field]).format('DD-MM-YYYY HH:mm:ss') }}</span>
                            <div v-else-if="props.column.field === 'action'">
                                <span style="font-size:14px;" @click="edit(props.row)" class="edit" href="#"><i style="cursor:pointer;" title="Edit" class="bi bi-pencil text-warning cursor"></i></span>&nbsp;
                                <span style="font-size:14px;" @click="delete(props.row)" class="delete" href="#"><i style="cursor:pointer;" title="Delete" class="bi bi-trash text-danger cursor"></i></span>&nbsp;
                            </div>
                            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" ref="formModal" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <Form role="form" method="POST" @submit="save" ref="form" :validation-schema="schema" v-slot="{ errors }" class="needs-validation">
          <div class="modal-header">
            <h5 class="modal-title" id="formModalLabel">Form Trainer</h5>
            <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <!-- <span aria-hidden="true">×</span> -->
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label for="name" class="col-form-label">Name :</label>
                <Field type="text" name="name" :class="'form-control '+(errors.name ? 'is-invalid' : '')" v-model="form.name" id="name" />
                <div class="invalid-feedback">
                    {{errors.name}}
                </div>
              </div>
              <div class="form-group">
                <label for="price" class="col-form-label">Price:</label>
                <Field name="price" :class="'form-control thousand '+(errors.price ? 'is-invalid' : '')" v-model="form.price" id="price" />
                <!-- <Field as="textarea" name="price" :class="'form-control '+(errors.mes ? 'is-invalid' : 'is-valid')" id="message-text" /> -->
                <div class="invalid-feedback">
                    {{errors.price}}
                </div>
              </div>
              <div class="form-group">
                <label for="image_url" class="col-form-label">Image Url:</label>
                <Field name="image_url" :class="'form-control '+(errors.image_url ? 'is-invalid' : '')" v-model="form.image_url" id="image_url" />
                <div class="invalid-feedback">
                    {{errors.image_url}}
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn bg-gradient-secondary" @click="cancel">Cancel</button>
            <button type="submit" class="btn bg-gradient-primary">Save</button>
          </div>
            </Form>
        </div>
      </div>
    </div>
</template>

<script setup>

const schema = {
  name: 'required',
  price: 'required',
  image_url: 'required',
};
</script>
<script>
import { VueGoodTable } from 'vue-good-table-next';
import DataTable from 'datatables.net-vue3';
import DataTableBs5 from 'datatables.net-bs5';
import * as qm from "../graphqlquery";
import VsudButton from "@/components/VsudButton.vue";
import {isProxy, toRaw } from 'vue';
import moment from 'moment';
import id from 'moment/locale/id';
import { Modal } from 'bootstrap';
import { Form,Field } from 'vee-validate';
import Inputmask from "inputmask";

DataTable.use(DataTableBs5);

export default {
  name: "PlaceTable",
  components: {
    VsudButton,
    DataTable,
    Form,
    Field,
    VueGoodTable
  },
  data() {
    return {
        modal: null,
        form : {
            id:'',
            name:'',
            price:'',
            image_url:''
        },
        defform : {
            id:'',
            name:'',
            price:'',
            image_url:''
        },
        pageLength: 10,
        isLoading: true,
        rows:[],
        totalRecords:0,
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
                enabled: true,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Price",
            field: "price",
            filterOptions: {
                enabled: true,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Image Url",
            field: "image_url",
            filterOptions: {
                enabled: true,
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
            columnFilters: {
            },
            sort: [
            {
                field: 'createdAt',
                type: 'desc'
            }
            ],
            page: 1, 
            perPage: 10
        }
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.formModal)
    var selector = document.getElementsByClassName("thousand");
    Inputmask('decimal', {
        'alias': 'numeric',
        'groupSeparator': '.',
        'autoGroup': true,
        'digits': 0,
        'radixPoint': ".",
        'digitsOptional': false,
        'allowMinus': false,
        'rightAlign': false,
        'prefix': '',
        'placeholder': ''
    }).mask(selector);
  },
  computed : {
    options() {
        var self = this;
        return {
            filter : true,
            sortable: false,
            info: true,
            paging: true,
            processing: true,
            serverSide: true,
            ordering : true,
            order : [[0,'desc']],
            responsive:true,
            // ajax : this.getData,
            columns: [
                { data: "createdAt", width: 50 },
                { data: "name" },
                { data: "price" },
                { data: "image_url",sortable:false },
                { data: "createdAt",sortable:false },
                { data: "id", width: 70,orderable:false}
            ],
            columnDefs: [
                {
                    render: function(data,type,row,index){
                        let info = self.getTable();
                        if(info)
                            return index.row+info.start+1;
                        return index.row+1;
                    },
                    targets : [0]
                },
                {
                    render: function(data,type,row,index){
                        if(data)
                            return formatAsCurrency(data);
                        return '';
                    },
                    targets : [2]
                },
                {
                    render: function(data,type,row,index){
                        let fdate = moment(data).format('DD-MM-YYYY HH:mm:ss');
                        return fdate;
                    },
                    targets : [4]
                },
                {
                    render: function(data,type,row,index){
                        var html = '<span style="font-size:14px;" data-index="'+index.row+'" class="edit" href="#"><i style="cursor:pointer;" title="Edit" class="bi bi-pencil text-warning cursor"></i></span>&nbsp;';
                        html += '<span style="font-size:14px;" data-index="'+index.row+'" class="delete" href="#"><i style="cursor:pointer;" title="Delete" class="bi bi-trash text-danger cursor"></i></span>&nbsp;';
                        return html;
                    },
                    targets : [5]
                }
            ],
            drawCallback: function(e,response){
                const edits = document.querySelectorAll(".edit");
                edits.forEach(edit => edit.addEventListener('click', function(){self.edit(edit.dataset.index);}));
                const dlts = document.querySelectorAll(".delete");
                dlts.forEach(dlt => dlt.addEventListener('click', function(){self.delete(dlt.dataset.index);}))
            }
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods : {
    edit(d){
        var self = this;
        const t = this.$refs.table.dt();
 		const data = t.row(d).data();
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.price = data.price.toString();
        this.form.image_url = data.image_url;
        this.modal.show();
        return false;
    },
    save(){
        var self = this;
        console.info(this.form);
        if(this.form.id == ''){
            delete this.form.id;
            this.form.price = parseInt(this.form.price.replaceAll('.',''));
            self.$apollo.mutate({
                mutation: qm.TRAINER_CREATE,
                variables: {
                    input:{
                        trainer:this.form
                    }
                }
            }).then((result) => {
                self.refresh();
                self.cancel();
                self.$swal.fire('Success','Data Saved Successfuly','success');
            }).catch((error) => {
                // console.info(error);
                self.$swal.fire('Error',error.toString(),'error');
            })
        }else{
            this.form.price = parseInt(this.form.price.replaceAll('.',''));
            let objupdate = {
                id:this.form.id,
                update:{
                    name:this.form.name,
                    price:this.form.price,
                    image_url:this.form.image_url,
                }
            }
            self.$apollo.mutate({
                mutation: qm.TRAINER_UPDATE,
                variables: {
                    input:objupdate
                }
            }).then((result) => {
                self.refresh();
                self.cancel();
                self.$swal.fire('Success','Data Saved Successfuly','success');
            }).catch((error) => {
                // console.info(error);
                self.$swal.fire('Error',error.toString(),'error');
            })
        }
    },
    cancel(){
        this.form = Object.assign({}, this.defform);
        this.modal.hide();
    },
    add(){
        this.modal.show();
    },
    delete(d){
        var self = this;
        var t = this.$refs.table.dt();
 		var data = t.row(d).data();
        this.$swal({
            title: "Delete "+data.name,
            text: "Are You sure?",
            icon: 'warning',
            backdrop:true,
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#44A32B',
            cancelButtonColor: '#dc3545',
            reverseButtons: true,
            preConfirm: function(){
                self.$apollo.mutate({
                    mutation: qm.TRAINER_DELETE,
                    variables: {
                        id:data.id
                    }
                }).then((result) => {
                    self.refresh();
                    self.$swal.fire('Success','Data Deleted Successfuly','success');
                }).catch((error) => {
                    self.$swal.fire('Error',error.toString(),'error');
                })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
            
        });
        return false;
    },
    getTable(){
        const t = this.$refs.table.dt();
        if(t)
            return t.page.info();
        return null;
    },
    refresh(){
        console.info('refreshed');
        var t = this.$refs.table;
        t.dt().ajax.reload();
    },
    getData(data, callback, settings){
        var self = this;
        var neworder = [{
            field:data.columns[data.order[0].column].data,
            direction:data.order[0].dir == "asc" ? 'ASC' : 'DESC'
        }]
        this.$apollo.query({
            query: qm.TRAINERS,
            variables:{
                filter:data.search.value != "" ? {name:{like:data.search.value}} : {},
                paging:{
                    limit:data.length,
                    offset:data.start
                },
                sorting:neworder
            },
            fetchPolicy: 'no-cache'
        }).then((result) => {
            var d = {
                draw : data.draw,
                recordsTotal : 1,
                recordsFiltered : 1,
                data : result.data.trainers.nodes
            }
            callback(d);
        }).catch((error) => {
            
        })
    },
    fetchData() {
        console.info(this.serverParams);
        var self = this;
        var neworder = [{
            field:this.serverParams.sort[0].field,
            direction:this.serverParams.sort[0].type == "asc" ? 'ASC' : 'DESC'
        }]
        this.$apollo.query({
            query: qm.TRAINERS,
            variables:{
                filter:{},
                paging:{
                    limit:this.serverParams.perPage,
                    offset:this.serverParams.page - 1
                },
                sorting:neworder
            },
            fetchPolicy: 'no-cache'
        }).then((result) => {
            self.totalRecords = 10
            self.isLoading = false;
            self.rows = result.data.trainers.nodes;
        }).catch((error) => {
            
        })
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.fetchData();
    },

    onPerPageChange(params) {
      this.updateParams({perPage: params.currentPerPage});
      this.fetchData();
    },

    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params[0].type,
          field: params[0].field,
        }],
      });
      this.fetchData();
    },
    
    onColumnFilter(params) {
      this.updateParams(params);
      this.fetchData();
    },
  }
};
</script>
>

<style>
@import 'bootstrap';
@import 'datatables.net-dt';
@import 'datatables.net-bs5';

div.dataTables_wrapper div.dataTables_length select {
    width:55px;
}
</style>