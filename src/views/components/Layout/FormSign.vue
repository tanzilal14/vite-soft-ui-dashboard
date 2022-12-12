<template>
  <div class="row">
    <label class="col-form-label col"></label>
    <div class="col-md-9">
      <div class="row text-center">
        <div class="col-md-4"><h6>Date</h6></div>
        <div class="col-md-4"><h6>Analyst Name</h6></div>
        <div class="col-md-2"><h6>Sign</h6></div>
        <div class="col-md-2 d-flex"></div>
      </div>
    </div>
  </div>
  <slot name="input"></slot>

  <br />
</template>

<script>
export default {
  name: "FormSign",
};
</script>

<style lang="scss"></style>
