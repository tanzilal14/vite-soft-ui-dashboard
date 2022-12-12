<template>
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-header pb-0 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="mb-0 text-primary">
            Clinician
            <span v-show="count > 0">{{ count + 1 }}</span> Information
          </h5>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
            <div>
              <button
                class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click.prevent="searchClinician"
              >
                <i class="cursor-pointer fa fa-search"></i> &nbsp; Search
                Clinician
              </button>
            </div>
            <div v-show="countClinician > 1">
              <button
                class="btn mb-0 bg-danger text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click.prevent="deleteClinician(count)"
              >
                <i class="cursor-pointer fa fa-minus"></i> &nbsp; Delete
                Clinician
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <TextInputSingle
          :disabled="true"
          label="Name"
          rules="required"
          :important="true"
          :file="data.name"
          name-var="name"
          @update-data="updateData"
        />
        <TextInputSingle
          :disabled="true"
          label="Phone"
          rules="required"
          :file="data.phone"
          name-var="phone"
          type="text"
          @update-data="updateData"
        />
        <TextInputSingle
          :disabled="true"
          label="Fax"
          rules="required"
          :file="data.fax"
          name-var="fax"
          type="text"
          @update-data="updateData"
        />
        <TextInputSingle
          :disabled="true"
          label="Email"
          rules="required"
          :file="data.email"
          name-var="email"
          type="email"
          @update-data="updateData"
        />
      </div>
    </div>
  </div>

  <show-modal v-show="showModal" @close="showModal = false" width="80vw">
    <template #content>
      <clinician @add-clinician="addClinicianData"></clinician>
    </template>
  </show-modal>
</template>

<script>
import Clinician from "@/views/Clinician.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import ShowModal from "@/views/components/Layout/ShowModal.vue";

export default {
  name: "ClinicianInformation",
  components: {
    Clinician,
    TextInputSingle,
    ShowModal,
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
    count: {
      type: Number,
      default: 0,
    },
    countClinician: {
      type: Number,
      default: 0,
    },
  },
  emits: ["hapus-clinician", "update-input"],
  data() {
    return {
      showModal: false,
      data: {
        id: "",
        name: "",
        phone: "",
        fax: "",
        email: "",
      },
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit("update-input", newVal, this.nameVar, this.count);
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
    // alert(this.dataSource.name);
  },
  methods: {
    addClinicianData(choosen) {
      this.showModal = false;
      this.data = choosen;
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    searchClinician() {
      this.showModal = true;
      // let el = document.getElementById("SwalGan");
      // this.$swal({
      //   html: el.innerHTML,
      //   width: "80vw",
      //   showCancelButton: false,
      //   showConfirmButton: false,
      // });
    },
    deleteClinician(indexClinician) {
      // var self = this;
      this.$swal({
        title: "Hapus Data Clinician",
        text: "Apakah anda yakin?",
        icon: "warning",
        backdrop: true,
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Batalkan",
        confirmButtonColor: "#44A32B",
        cancelButtonColor: "#dc3545",
        reverseButtons: true,
        allowOutsideClick: () => true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("hapus-clinician", indexClinician);
        }
      });
    },
  },
};
</script>
