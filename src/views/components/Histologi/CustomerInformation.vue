<template>
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-header pb-0 mb-3">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="mb-0 text-primary">Customer Information</h5>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
            <div>
              <button
                class="btn mb-0 bg-primary text-white btn-sm null null ms-auto mb-0 pull-right d-flex justify-content-center align-items-center"
                @click.prevent="searchCustomer"
              >
                <i class="cursor-pointer fa fa-search"></i> &nbsp; Search
                Customer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <TextInputSingle
          label="Cust. ID"
          rules="required"
          :readonly="true"
          :important="true"
          :file="data.id"
          name-var="id"
          @update-data="updateData"
        />
        <TextInputSingle
          label="Cust. Name"
          rules="required"
          :readonly="true"
          :important="true"
          :file="data.customer_name"
          name-var="customer_name"
          @update-data="updateData"
        />
        <TextInputSingle
          label="Address"
          rules="required"
          :readonly="true"
          :file="data.address"
          name-var="address"
          @update-data="updateData"
        />
        <TextInputSingle
          label="Lab Phone"
          rules="required"
          :readonly="true"
          :file="data.lab_phone"
          name-var="lab_phone"
          type="text"
          @update-data="updateData"
        />
        <TextInputSingle
          label="Lab Email"
          rules="required"
          :readonly="true"
          :file="data.lab_email"
          name-var="lab_email"
          type="email"
          @update-data="updateData"
        />
      </div>
    </div>
  </div>
  <show-modal v-show="showModal" @close="showModal = false" width="80vw">
    <template #content>
      <customer @add-customer="addCustomerData"></customer>
    </template>
  </show-modal>
</template>

<script>
import Customer from "@/views/Customer.vue";
import TextInputSingle from "@/views/components/Input/TextInputSingle.vue";
import ShowModal from "@/views/components/Layout/ShowModal.vue";

export default {
  name: "CustomerInformation",
  components: {
    Customer,
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
  },
  emits: ["update-input"],
  data() {
    return {
      showModal: false,
      data: {
        address: "",
        customer_name: "",
        id: "",
        lab_email: "",
        lab_phone: "",
      },
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit("update-input", newVal, this.nameVar);
      },
      deep: true,

      immediate: true,
    },
    dataSource: {
      handler(newVal, oldVal) {
        this.data = this.dataSource;
      },
      deep: true,

      immediate: true,
    },
  },
  mounted() {
    this.data = this.dataSource;
  },
  methods: {
    addCustomerData(choosen) {
      this.showModal = false;
      this.data = choosen;
    },
    updateData(data, nameVar) {
      this.data[nameVar] = data;
    },
    searchCustomer() {
      this.showModal = true;

      // let el = document.getElementById("SwalGan");
      // this.$swal({
      //   html: el.innerHTML,
      //   width: "80vw",
      //   showCancelButton: false,
      //   showConfirmButton: false,
      // });
    },
  },
};
</script>
