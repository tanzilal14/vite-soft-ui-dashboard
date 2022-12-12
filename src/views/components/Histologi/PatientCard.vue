<template>
  <div class="patient-medical-card" :class="[patientCard ? '' : 'd-none']">
    <div>
      <div class="row">
        <div class="col">
          <h3>MEDICAL REPORTS</h3>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <div>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                style="height: min-content"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="horizontalShow" class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-blue-light-1 text-center">
              <h5>Hasil Test Aktif</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <div class="bg-primary border-radius-sm p-4"></div>
                </div>
                <div class="col">
                  <div class="row">
                    <h6>Berlaku Sampai Tanggal</h6>
                    <div class="row">
                      <div class="col-8">
                        <p>Minggu, 04/02/2021 18:00</p>
                      </div>
                      <div class="col-4 m-0 p-0">
                        <strong> <a href="">LIHAT DETAIL</a></strong>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <h6>Jenis Pengetesan</h6>
                    <p>Sitologi</p>
                  </div>
                  <div class="row">
                    <h6>Penjadwalan Untuk</h6>
                    <p>Stephen Strange</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <button
                  class="btn col-8 bg-primary text-white border-radius-sm p-3 text-center"
                >
                  <strong>Cek Hasil Test</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-red-light-1 text-center">
              <h5>Hasil Test Aktif</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <div class="bg-primary border-radius-sm p-4"></div>
                </div>
                <div class="col">
                  <div class="row">
                    <h6>Berlaku Sampai Tanggal</h6>
                    <div class="row">
                      <div class="col-8">
                        <p>Minggu, 04/02/2021 18:00</p>
                      </div>
                      <div class="col-4 m-0 p-0">
                        <strong> <a href="">LIHAT DETAIL</a></strong>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <h6>Jenis Pengetesan</h6>
                    <p>Sitologi</p>
                  </div>
                  <div class="row">
                    <h6>Penjadwalan Untuk</h6>
                    <p>Stephen Strange</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <button
                  class="btn col-8 bg-primary text-white border-radius-sm p-3 text-center"
                >
                  <strong>Cek Hasil Test</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!horizontalShow" class="row mt-4">
        <div class="col-12 mt-4">
          <div class="card">
            <div class="card-header bg-blue-light-1 text-center">
              <h5>Hasil Test Aktif</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <div class="bg-primary border-radius-sm p-4"></div>
                </div>
                <div class="col">
                  <div class="row">
                    <h6>Berlaku Sampai Tanggal</h6>
                    <div class="row">
                      <div class="col-8">
                        <p>Minggu, 04/02/2021 18:00</p>
                      </div>
                      <div class="col-4 m-0 p-0">
                        <strong> <a href="">LIHAT DETAIL</a></strong>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <h6>Jenis Pengetesan</h6>
                    <p>Sitologi</p>
                  </div>
                  <div class="row">
                    <h6>Penjadwalan Untuk</h6>
                    <p>Stephen Strange</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <button
                  class="btn col-8 bg-primary text-white border-radius-sm p-3 text-center"
                >
                  <strong>Cek Hasil Test</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="card">
            <div class="card-header bg-red-light-1 text-center">
              <h5>Hasil Test Aktif</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <div class="bg-primary border-radius-sm p-4"></div>
                </div>
                <div class="col">
                  <div class="row">
                    <h6>Berlaku Sampai Tanggal</h6>
                    <div class="row">
                      <div class="col-8">
                        <p>Minggu, 04/02/2021 18:00</p>
                      </div>
                      <div class="col-4 m-0 p-0">
                        <strong> <a href="">LIHAT DETAIL</a></strong>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <h6>Jenis Pengetesan</h6>
                    <p>Sitologi</p>
                  </div>
                  <div class="row">
                    <h6>Penjadwalan Untuk</h6>
                    <p>Stephen Strange</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <button
                  class="btn col-8 bg-primary text-white border-radius-sm p-3 text-center"
                >
                  <strong>Cek Hasil Test</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientCard",
  props: {
    patientCard: {
      type: Boolean,
      // required: true,
      default: false,
    },
    horizontalShow: {
      type: Boolean,
      // required: true,
      default: true,
    },
  },
};
</script>

<style lang="scss"></style>
