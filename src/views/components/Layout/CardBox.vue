<template>
  <div class="col-12">
    <div class="card mb-4">
      <div v-show="title != ''" class="card-header pb-0 mb-2">
        <div class="d-flex align-items-center">
          <h5 class="mb-0 text-primary">{{ title }}</h5>
        </div>
      </div>
      <div class="card-body">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBox",
  props: {
    title: {
      required: true,
      default: "Default Title",
      type: String,
    },
  },
};
</script>

<style lang="scss"></style>
