<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('close')">
        <div
          class="modal-container"
          :style="{ width: width }"
          @click.prevent=""
        >
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0 text-primary"></h5>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
              <button
                class="btn mb-0 bg-danger text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click.self="$emit('close')"
              >
                <i class="cursor-pointer fa fa-times"></i> &nbsp; Close
              </button>
            </div>
          </div>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ShowModal",
  props: {
    width: {
      type: String,
      default: "80vw",
    },
  },
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
