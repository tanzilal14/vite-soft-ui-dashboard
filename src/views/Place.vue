<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
            <div class="card-header pb-0 mb-3">
                <div class="d-flex align-items-center">
                    <h6 class="mb-0 text-success">List Place</h6>
                    <button @click="add" class="btn mb-0 bg-gradient-success btn-sm null null ms-auto mb-0">Add New</button>
                </div>
            </div>
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
                            <span v-else-if="props.column.field === 'image_url'"><img @click="openimage(props.formattedRow[props.column.field])" style="width:64px;" :src="props.formattedRow[props.column.field]" /></span>
                            <span v-else-if="props.column.field === 'createdAt'">{{ moment(props.formattedRow[props.column.field]).format('DD-MM-YYYY HH:mm:ss') }}</span>
                            <div v-else-if="props.column.field === 'action'">
                                <span style="font-size:14px;" @click="edit(props.row)" class="edit" href="#"><i style="cursor:pointer;" title="Edit" class="bi bi-pencil text-warning cursor"></i></span>&nbsp;
                                <span style="font-size:14px;" @click="delact(props.row)" class="delete" href="#"><i style="cursor:pointer;" title="Delete" class="bi bi-trash text-danger cursor"></i></span>&nbsp;
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
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <Form role="form" method="POST" @submit="save" ref="form" :validation-schema="schema" v-slot="{ errors }" class="needs-validation">
          <div class="modal-header">
            <h5 class="modal-title text-success" id="formModalLabel">Form Place</h5>
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
                <label for="address" class="col-form-label">Address:</label>
                <Field as="textarea" name="address" :class="'form-control '+(errors.address ? 'is-invalid' : '')" v-model="form.address" id="address" />
                <div class="invalid-feedback">
                    {{errors.address}}
                </div>
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">Description:</label>
                <Field as="textarea" name="description" :class="'form-control '+(errors.description ? 'is-invalid' : '')" v-model="form.description" id="description" />
                <div class="invalid-feedback">
                    {{errors.description}}
                </div>
              </div>
              <!-- <div class="form-group">
                <label for="images" class="col-form-label">Images:</label>
                <Field name="images" :class="'form-control '+(errors.images ? 'is-invalid' : '')" v-model="form.images" id="images" />
                <div class="invalid-feedback">
                    {{errors.images}}
                </div>
              </div> -->
              <div v-if="form.id != '' && form.image_url != '' && form.image_url != null" class="form-group">
                <img style="width:128px;" :src="form.image_url" />
              </div>
              <div class="form-group">
                <label for="image" class="col-form-label">Image:</label>
                <input
                    type="file"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                >
              </div> 
              <div class="form-group">
                <l-map ref="map" style="width:100%;height:70vh;"
                    :zoom="zoom"
                    :minZoom="0"
                    :maxZoom="18"
                    :center="[
                    position.lat || userLocation.lat || defaultLocation.lat,
                    position.lng || userLocation.lng || defaultLocation.lng
                    ]"
                    >
                    <l-tile-layer
                    :url="tileProvider.url"
                    :attribution="tileProvider.attribution"
                    />
                    <l-marker
                    v-if="position.lat && position.lng"
                    visible
                    draggable
                    v-model:lat-lng="position"
                    @dragstart="dragging = true"
                    @dragend="dragging = false"
                    />
                    <!-- <l-tooltip :content="tooltipContent" 
                    :options="{ permanent: true }" /> -->
                </l-map>
              </div>
              <div class="form-group">
                <label for="latitude" class="col-form-label">Latitude:</label>
                <Field name="latitude" :class="'form-control '+(errors.latitude ? 'is-invalid' : '')" v-model="form.latitude" id="latitude" />
                <div class="invalid-feedback">
                    {{errors.latitude}}
                </div>
              </div>
              <div class="form-group">
                <label for="longitude" class="col-form-label">Longitude:</label>
                <Field name="longitude" :class="'form-control '+(errors.longitude ? 'is-invalid' : '')" v-model="form.longitude" id="longitude" />
                <div class="invalid-feedback">
                    {{errors.longitude}}
                </div>
              </div>
              <div class="form-group">
                <label for="region_id" class="col-form-label">Region:</label>
                <v-select id="region_id" :options="regions" v-model="form.region_id" :reduce="(option) => option.id" label="name"></v-select>
                <div class="invalid-feedback">
                    {{errors.region_id}}
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="loading" class="btn bg-gradient-secondary" @click="cancel">Cancel</button>
            <button type="submit" :disabled="loading" v-if="!loading" class="btn bg-gradient-success">Save</button>
            <button class="btn bg-gradient-success" type="button" :disabled="loading" v-else>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <i>Saving...</i>
            </button>
          </div>
            </Form>
        </div>
      </div>
    </div>
    <modal-image :dialog="dialog_image" :srcimg="srcimage" @close="dialog_image=false" />
</template>

<script setup>

const schema = {
  name: 'required',
  latitude: 'required',
  longitude: 'required',
  address: 'required',
  description: 'required',
//   images: 'required',
//   region_id: 'required',
};
</script>
<script>
import { VueGoodTable } from 'vue-good-table-next';
import * as qm from "../graphqlquery";
import VsudButton from "@/components/VsudButton.vue";
import {isProxy, toRaw } from 'vue';
import moment from 'moment';
import id from 'moment/locale/id';
import { Modal } from 'bootstrap';
import { Form,Field } from 'vee-validate';
import Inputmask from "inputmask";
import { LMap, LGeoJson,LMarker,LTileLayer ,LTooltip} from "@vue-leaflet/vue-leaflet";
import { icon } from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import ModalImage from './components/ModalImage.vue';

export default {
  name: "PlaceTable",
  components: {
    VsudButton,
    Form,
    Field,
    LMap,
    LMarker,
    LTileLayer,
    LGeoJson,
    LTooltip,
    VueGoodTable
  },
  props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: -7.250445,
        lng: 112.768845
      })
    }
  },
  data() {
    return {
        dialog_image:false,
        srcimage:null,
        loading: false,
        userLocation: {},
        icon: icon({
            iconRetinaUrl: iconRetinaUrl,
            iconUrl: iconUrl,
            shadowUrl: shadowUrl
        }),
        dragging:false,
        position: {lat: -7.250445,
        lng: 112.768845},
        address:"",
        tileProvider: {
            attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
        zoom: 15,
        loading:false,
        regions:[],
        modal: null,
        form : {
            id:'',
            name:'',
            address:'',
            description:'',
            images:'',
            latitude:'',
            longitude:'',
            region_id:null,
            image_url:''
        },
        defform : {
            id:'',
            name:'',
            address:'',
            description:'',
            images:'',
            latitude:'',
            longitude:'',
            region_id:null,
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
            label: "Image",
            field: "image_url",
            filterOptions: {
                enabled: false,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Name",
            field: "name",
            width:"100px",
            filterOptions: {
                enabled: true,
                placeholder: "Filter Search",
            },
            },
            {
            label: "Address",
            field: "address",
            width:"300px",
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
        file:null
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

    watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        this.$emit("input", { position: value, address: this.address });
        this.form.latitude = value.lat;
        this.form.longitude = value.lng;
      }
    }
  },
  computed : {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "/\n/g"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }/\n/g <strong>lng:</strong> ${this.position.lng}`;
    }
  },
  created() {
    this.loadMaster();
    this.fetchData();
    this.getUserPosition();
  },
  methods : {
    openimage(img){
        this.srcimage = img;
        this.dialog_image = true;
    },
    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;
      return address;
    },
    onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
    },
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      }
    },
    loadMaster(){
        var self = this;
        this.$apollo.query({
            query: qm.REGIONS,
            variables:{
                filter:{},
                paging:{
                    limit:1000,
                    offset:0
                },
                sorting:[]
            },
            fetchPolicy: 'no-cache'
        }).then((result) => {
            self.regions = result.data.regions.nodes;
        }).catch((error) => {
          
        })
    },
    edit(data){
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.latitude = data.latitude.toString();
        this.form.longitude = data.longitude.toString();
        this.form.description = data.description;
        this.form.address = data.address;
        this.form.region_id = data.region.id;
        this.form.images = data.images;
        this.form.image_url = data.image_url;
        this.userLocation = {
            lat:data.latitude,
            lng:data.longitude
        }
        this.position = {
            lat:data.latitude,
            lng:data.longitude
        }
        this.$refs.map.leafletObject.panTo([data.latitude,data.longitude]);
        setTimeout(() => {
            console.info(this.$refs.map);
            // //mapObject is a property that is part of leaflet
            // this.$refs.map.leafletObject.invalidateSize(); 
            window.dispatchEvent(new Event('resize'));
        }, 200);
        this.modal.show();
        return false;
    },
    async save(){
        if(this.form.region_id == '' || this.form.region_id == null){
            this.$swal.fire('Error','Region Required','error');
            return;
        }
        this.loading = true;
        var self = this;
        this.form.latitude = parseFloat(this.form.latitude);
        this.form.longitude = parseFloat(this.form.longitude);
        this.form.region_id = parseInt(this.form.region_id);
        if(self.file !== null){
            await self.$apollo.mutate({
                mutation: qm.UPLOAD_IMAGE,
                variables: {
                    file:self.file,
                    input:{
                        category:'PLACE'
                    }
                },
                context: {
                    hasUpload: true,
                    fetch: customFetch
                }
            }).then((result) => {
                if(result.data.uploadImages[0].filename !== undefined){
                    self.form.images = result.data.uploadImages[0].filename;
                }
            }).catch((error) => {
                
            })
        }
        if(this.form.id == ''){
            delete this.form.id;
            await self.$apollo.mutate({
                mutation: qm.PLACE_CREATE,
                variables: {
                    input:{
                        place:this.form
                    }
                }
            }).then((result) => {
                self.fetchData();
                self.cancel();
                self.$swal.fire('Success','Data Saved Successfuly','success');
            }).catch((error) => {
                // console.info(error);
                self.$swal.fire('Error',error.toString(),'error');
            }).then(()=>{
              
            })
        }else{
            let objupdate = {
                id:this.form.id,
                update:{
                    name:this.form.name,
                    address:this.form.address,
                    images:this.form.images,
                    latitude:this.form.latitude,
                    longitude:this.form.longitude,
                    description:this.form.description,
                    region_id:this.form.region_id
                }
            }
            await self.$apollo.mutate({
                mutation: qm.PLACE_UPDATE,
                variables: {
                    input:objupdate
                }
            }).then((result) => {
                self.fetchData();
                self.cancel();
                self.$swal.fire('Success','Data Saved Successfuly','success');
            }).catch((error) => {
                // console.info(error);
                self.$swal.fire('Error',error.toString(),'error');
            }).then(()=>{

            })
        }
        this.loading = false;
    },
    cancel(){
        this.file = null;
        this.zoom= 15;
        this.$refs.image.value = null;
        this.userLocation = {};
        this.position = {lat: -7.250445,
        lng: 112.768845};
        this.form = Object.assign({}, this.defform);
        this.modal.hide();
    },
    add(){
        this.$refs.map.leafletObject.panTo([this.position.lat,this.position.lng]);
        setTimeout(() => {
            console.info(this.$refs.map);
            // //mapObject is a property that is part of leaflet
            // this.$refs.map.leafletObject.invalidateSize(); 
            window.dispatchEvent(new Event('resize'));
        }, 200);
        this.modal.show();
    },
    delact(data){
        console.info(data);
        var self = this;
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
                    mutation: qm.PLACE_DELETE,
                    variables: {
                        id:data.id
                    }
                }).then((result) => {
                    self.fetchData();
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
            self.totalRecords = result.data.places.totalCount;
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
    },
    onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
            this.file = files[0] // this is an image file that can be sent to server...
        }
    }
  }
};
</script>