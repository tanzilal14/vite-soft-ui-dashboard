<template>
  <div class="patient-past-visit" :class="[patientVisit ? '' : 'd-none']">
    <div>
      <div class="row">
        <div class="col text-center">
          <h4>Patient Profile</h4>
        </div>
        <div class="col text-center">
          <h4>Heart Rate</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <div class="card">
            <div class="card-header"><h3>Patient's Name</h3></div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h6>Date of Birth</h6>
                  <strong>Jan 1, 1987</strong>
                </div>
                <div class="col">
                  <h6>Gender</h6>
                  <strong>Female</strong>
                </div>
                <div class="col">
                  <h6>BPJS No.</h6>
                  <strong>4214552135</strong>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col">
                  <h6>Indication</h6>
                  <strong>Medical - Gastroentritis & GERD</strong>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col">
                  <h6>Risk</h6>
                  <strong class="text-success">Extremely Low</strong>
                </div>
                <div class="col">
                  <h6>Symptoms</h6>
                  <strong class="text-success">Extremely Low</strong>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <h6>N&V</h6>
                  <strong class="text-success">No</strong>
                </div>
                <div class="col">
                  <h6>Chemicals</h6>
                  <strong class="text-success">No</strong>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <h6>Injury</h6>
                  <strong class="text-success">No</strong>
                </div>
                <div class="col">
                  <h6>Site</h6>
                  <strong class="text-warning">Spread</strong>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <h6>Progress</h6>
                  <strong class="text-danger">Worsening</strong>
                </div>
                <div class="col">
                  S
                  <h6>Severity</h6>
                  <strong class="text-warning">6/10</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col card">
              <div class="row justify-content-center p-4 align-items-center">
                <div class="col d-flex justify-content-end">
                  <img
                    class="image-histologi"
                    src="@/assets/img/image/heart.png"
                    alt=""
                  />
                </div>
                <div class="col">
                  <div class="row">
                    <h2>98 <span>bpm</span></h2>
                  </div>
                  <div class="row">
                    <h5 class="text-success">Normal</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col card">
              <div class="row justify-content-center p-4 align-items-center4">
                <div class="col d-flex justify-content-end">
                  <img
                    class="image-histologi"
                    src="@/assets/img/image/blood.png"
                    alt=""
                  />
                </div>
                <div class="col">
                  <div class="row">
                    <h2>102/72 <span>mmhg</span></h2>
                  </div>
                  <div class="row">
                    <h5 class="text-success">Normal</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col card">
              <div class="row justify-content-center p-4 align-items-center">
                <div class="col d-flex justify-content-end">
                  <img
                    class="image-histologi"
                    src="@/assets/img/image/sugar.png"
                    alt=""
                  />
                </div>
                <div class="col">
                  <div class="row">
                    <h2>80 <span>mg/dL</span></h2>
                  </div>
                  <div class="row">
                    <h5 class="text-success">Normal</h5>
                  </div>
                </div>
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
  name: "PatientVisit",
  props: {
    patientVisit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.image-histologi {
  height: 165px;
}
</style>
