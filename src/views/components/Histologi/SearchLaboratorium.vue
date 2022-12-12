<template>
  <div
    class="d-grid gap-2 d-md-flex justify-content-md-end mb-4 align-items-center"
  >
    <div class="card p-2">
      <div class="input-group">
        <v-select
          v-model="data.name"
          class="bg-white"
          :options="makeList(labs, 'name')"
          :required="true"
          @search="onSearchLab"
        >
          <template #search="{ attributes, events }">
            <input
              class="vs__search"
              :required="!data"
              v-bind="attributes"
              v-on="events"
            />
          </template>
        </v-select>

        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as qm from "@/query/histology.js";

export default {
  name: "SearchLaboratorium",
  components: {},
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
  emits: ["input"],
  data() {
    return {
      labs: [],
      data: {
        name: "",
        id: "",
      },
      timeout: "",
    };
  },
  watch: {
    data(newData, oldData) {
      var chosenData = {};
      this.labs.forEach((item) => {
        if (newData == item.name) {
          chosenData = item;
          this.$emit("input", chosenData, this.nameVar);
        }
      });
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
    // this.data = this.dataSource;
  },
  beforeMount() {
    this.fetchLab();
  },
  methods: {
    onSearchLab(search, loading) {
      if (search.length) {
        loading(true);
        // clear timeout variable
        clearTimeout(this.timeout);
        var self = this;
        this.timeout = setTimeout(function () {
          self.fetchLab(search);
        }, 500);
        loading(false);
      }
    },
    fetchLab(search = "") {
      this.$apollo
        .query({
          query: qm.LABS,
          variables: {
            filter: {
              name: {
                iLike: `%${search}%`,
              },
            },
            paging: {
              limit: 10,
            },
            sorting: [
              {
                field: "id",
                direction: "ASC",
              },
            ],
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          this.labs = result.data.labs.nodes;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$vs-dropdown-bg: #fff !default;
.v-select {
  min-width: 20vw;
}
</style>
