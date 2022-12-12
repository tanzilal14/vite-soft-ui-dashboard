<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div> -->
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <Form
                    ref="form"
                    v-slot="{ errors }"
                    role="form"
                    method="POST"
                    :validation-schema="schema"
                    class="text-start"
                    @submit="actlogin"
                  >
                    <label>Email</label>
                    <vsud-input
                      v-model="form.email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      :error="errors.email"
                    />
                    <label>Password</label>
                    <vsud-input
                      v-model="form.password"
                      type="password"
                      placeholder="Password"
                      :error="errors.password"
                      name="password"
                    />
                    <vsud-switch id="rememberMe" v-model="form.remember"
                      >Remember me</vsud-switch
                    >
                    <div class="text-center">
                      <vsud-button
                        v-if="!loading"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                        :disabled="loading"
                        >Sign in</vsud-button
                      >
                      <button
                        v-else
                        class="my-4 mb-2 w-100 mb-0 btn bg-gradient-info"
                        full-width
                        type="button"
                        :disabled="loading"
                      >
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <i>Signing in...</i>
                      </button>
                      <!-- <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                        v-else
                      ><i>Signing in..</i></vsud-button> -->
                    </div>
                  </Form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div> -->
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage: `url(${bgImg})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <app-footer /> -->
</template>
<script setup>
const schema = {
  email: "required|email",
  password: "required|min:6",
};
</script>
<script>
import { defineComponent, ref, provide, onMounted } from "vue";
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/curved-images/curved9.jpg";
import * as qm from "../graphqlquery";
const body = document.getElementsByTagName("body")[0];

import { Form, Field } from "vee-validate";

export default {
  name: "SigninPage",
  components: {
    Form,
    Field,
    AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  data() {
    return {
      loading: false,
      bgImg,
      form: {
        email: "",
        password: "",
        remember: true,
      },
    };
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    actlogin() {
      var self = this;
      this.loading = true;
      const { email, password } = this.form;
      this.$apollo
        .mutate({
          mutation: qm.LOGIN,
          variables: {
            email,
            password,
          },
        })
        .then((result) => {
          if (result.data.loginByEmail[0].token !== undefined) {
            localStorage.setItem(
              "user",
              JSON.stringify(result.data.loginByEmail[0].user)
            );
            localStorage.setItem("token", result.data.loginByEmail[0].token);
            this.$store.commit("SET_TOKEN", result.data.loginByEmail[0].token);
            this.$store.commit(
              "SET_USER",
              JSON.stringify(result.data.loginByEmail[0].user)
            );
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$swal.fire(
              "Error",
              result.data.loginByEmail[0].message,
              "error"
            );
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
          this.$swal.fire("Error", error, "error");
        })
        .then(() => {
          self.loading = false;
        });
    },
  },
};
</script>
