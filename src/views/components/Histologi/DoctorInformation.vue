<template>
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-header pb-0 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="mb-0 text-primary">
            Dokter
            <span v-show="count > 0">{{ count + 1 }}</span> Information
          </h5>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
            <div v-show="countDokter > 1">
              <button
                class="btn mb-0 bg-danger text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click="deleteDokter(count)"
              >
                <i class="cursor-pointer fa fa-minus"></i> &nbsp; Delete Dokter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <label class="col-form-label col-md-2"
            >Nama Dokter <sup>*</sup>
          </label>
          <div class="col-md-9">
            <input
              id="name"
              type="text"
              class="form-control"
              :value="name"
              @input="$emit('update:name', $event.target.value)"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-form-label col-md-2">Telepon </label>
          <div class="col-md-9">
            <input
              id="phone"
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
              type="email"
              class="form-control"
              :value="email"
              @input="$emit('update:email', $event.target.value)"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <label class="col-form-label col-md-2">Alamat </label>
          <div class="col-md-9">
            <input
              id="alamat"
              type="text"
              class="form-control"
              :value="alamat"
              @input="$emit('update:alamat', $event.target.value)"
            />
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorInformation",
  components: {},
  props: {
    count: {
      type: Number,
      default: 1,
    },
    countDokter: {
      type: Number,
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    alamat: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  emits: [
    "update:email",
    "update:alamat",
    "update:phone",
    "update:name",
    "hapus-dokter",
  ],
  methods: {
    deleteDokter(indexDokter) {
      // var self = this;
      this.$swal({
        title: "Hapus Data Dokter",
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
          this.$emit("hapus-dokter", indexDokter);
        }
      });
    },
  },
};
</script>
