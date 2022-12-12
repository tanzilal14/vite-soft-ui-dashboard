<template> 
    <div class="modal fade" ref="imageModal" id="modal-image" tabindex="-1" role="dialog" aria-labelledby="modal-image" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-success" id="formModalLabel">Image Preview</h5>
          </div>
          <div class="modal-body">
              <img :src="srcimg+'?v='+cachekey"  style="width:100%;" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn bg-gradient-secondary" @click="cancel">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: "ModalImage",
  components: {
  },
  data() {
    return {
        modal: null,
        cachekey:1
    }
  },
    props: ['dialog','srcimg'],
  mounted() {
    this.modal = new Modal(this.$refs.imageModal)
  },
  computed : {
  },
  created() {
    
  },
  watch:{
    srcimg(val){
        console.info(val);
    },
    dialog(val){
        if(val){
            this.cachekey++;
            this.modal.show();
        }else
            this.modal.hide();
    }
  },
  methods : {
    cancel(){
        this.$emit('close');
    },
  }
};
</script>