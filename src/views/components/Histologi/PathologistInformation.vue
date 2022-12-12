<template>
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-header pb-0 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="mb-0 text-primary">
            Pathologist
            <span v-show="count > 0">{{ count + 1 }}</span> Information
          </h5>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
            <div>
              <button
                class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click="searchPathologist"
              >
                <i class="cursor-pointer fa fa-search"></i> &nbsp; Search
                Pathologist
              </button>
            </div>
            <div v-show="countPathologist.length > 1">
              <button
                class="btn mb-0 bg-danger text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click="deletePathologist(count)"
              >
                <i class="cursor-pointer fa fa-minus"></i> &nbsp; Delete
                Pathologist
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <label class="col-form-label col-md-2">Name <sup>*</sup> </label>
          <div class="col-md-9">
            <input
              id="name"
              readonly
              type="text"
              class="form-control"
              :value="name"
              @input="$emit('update:name', $event.target.value)"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-form-label col-md-2">Phone </label>
          <div class="col-md-9">
            <input
              id="phone"
              readonly
              type="number"
              class="form-control"
              :value="phone"
              @input="$emit('update:phone', $event.target.value)"
            />
          </div>
        </div>
        <br />

        <div class="row">
          <label class="col-form-label col-md-2">Email </label>
          <div class="col-md-9">
            <input
              id="email"
              readonly
              type="email"
              class="form-control"
              :value="email"
              @input="$emit('update:email', $event.target.value)"
            />
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
  <div id="SwalGan" class="d-none">
    <clinician></clinician>
  </div>
</template>

<script>
import Clinician from "@/views/Clinician.vue";

export default {
  name: "PathologistInformation",
  components: {
    Clinician,
  },
  props: {
    count: {
      type: Number,
      default: 1,
    },
    countPathologist: {
      type: Object,
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },
  },
  emits: ["update:email", "update:phone", "update:name", "hapus-pathologist"],
  methods: {
    searchPathologist() {
      let el = document.getElementById("SwalGan");
      this.$swal({
        html: el.innerHTML,
        width: "80vw",
        showCancelButton: false,
        showConfirmButton: false,
      });
    },
    deletePathologist(indexPathologist) {
      // var self = this;
      this.$swal({
        title: "Hapus Data Pathologist",
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
          console.log("huhuhu gann");
          this.$emit("hapus-pathologist", indexPathologist);
        }
      });
    },
  },
};
</script>
