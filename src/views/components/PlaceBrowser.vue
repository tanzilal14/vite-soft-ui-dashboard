<template>
  <div class="modal fade" ref="formModal" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-success" id="formModalLabel">List Place</h5>
          </div>
          <div class="modal-body">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body pt-0 pb-2 pl-2">
                            <div class="table-responsive">
                                <vue-good-table
                                    class="mb-3"
                                    styleClass="vgt-table striped"
                                    theme="polar-bear"
                                    mode="remote"
                                    @page-change="onPageChange"
                                    @sort-change="onSortChange"
                                    @column-filter="onColumnFilter"
                                    @per-page-change="onPerPageChange"
                                    :totalRows="totalRecords"
                                    :isLoading="isLoading"
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
                                            <button class="btn bg-gradient-success" type="button" @click="select(props.formattedRow)">Choose</button>
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
          <div class="modal-footer">
            <button type="button" :disabled="loading" class="btn bg-gradient-secondary" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import * as qm from "../../graphqlquery";
import VsudButton from "@/components/VsudButton.vue";
import { Modal } from 'bootstrap';
import { Form,Field } from 'vee-validate';
import Inputmask from "inputmask";

export default {
  name: "PlaceBrowser",
  components: {
    VsudButton,
    Form,
    Field,
    VueGoodTable
  },
  data() {
    return {
        loading:false,
        regions:[],
        modal: null,
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
            label: "Address",
            field: "address",
            filterOptions: {
                enabled: true,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Latitude",
            field: "latitude",
            filterOptions: {
                enabled: false,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Longitude",
            field: "longitude",
            filterOptions: {
                enabled: false,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Region",
            field: "region.name",
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
                field: 'id',
                type: 'desc'
            }
            ],
            page: 1, 
            perPage: 10
        },
        resolve: null,
        reject: null,
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.formModal)
  },
  computed : {
  },
  created() {
  },
  methods : {
    cancel(){
        this.serverParams = {
            columnFilters: {
            },
            sort: [
            {
                field: 'id',
                type: 'desc'
            }
            ],
            page: 1, 
            perPage: 10
        };
        this.fetchData();
        this.modal.hide();
        this.resolve({success:false,data:null});
    },
    select(row){
        this.modal.hide();
        this.resolve({success:true,data:row});
    },
    open() {
        this.modal.show();
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
        this.fetchData();
    },
    fetchData() {
        console.info(this.serverParams);
        var self = this;
        var neworder = [{
            field:this.serverParams.sort[0].field,
            direction:this.serverParams.sort[0].type == "asc" ? 'ASC' : 'DESC'
        }];
        var newfilter = {};
        for (const [key, value] of Object.entries(this.serverParams.columnFilters)) {
            if(key == 'price'){
                newfilter[key] = {
                    eq:parseInt(value)
                }
            }else{
                newfilter[key] = {
                    iLike:'%'+value+'%'
                }
            }
        }
        this.$apollo.query({
            query: qm.PLACES,
            variables:{
                filter:newfilter,
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
            self.rows = result.data.places.nodes;
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
    }
  }
};
</script>