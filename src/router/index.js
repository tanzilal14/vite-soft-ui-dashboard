import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";

import Product from "@/views/Product.vue";
import Histo from "@/views/TrackRecord/Histopathology/Histopathology.vue";

import FeederTransaction from "@/views/Master/FeederTransaction.vue";
import Clinician from "@/views/Clinician.vue";
import Place from "@/views/Place.vue";
import Trainer from "@/views/Trainer.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import User from "@/views/User.vue";
import Tnc from "@/views/Tnc.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Transaction from "@/views/Transaction.vue";

function lazyLoadView(view) {
  return () => import(`../views/${view}/${view}.vue`);
}

function lazyLoadViewTrackRecord(view) {
  return () => import(`../views/TrackRecord/${view}/${view}.vue`);
}

function lazyLoadViewResultForm(view) {
  return () => import(`../views/ResultForm/${view}/${view}.vue`);
}

function lazyLoadViewRequest(view) {
  return () => import(`../views/${view}/RequestForm${view}.vue`);
}
const routes = [
  {
    path: "/",
    name: "/",
    meta: {
      auth: false,
    },
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      auth: true,
    },
    component: Dashboard,
  },
  {
    path: "/transaction",
    name: "Transaction",
    meta: {
      auth: true,
    },
    component: Transaction,
  },
  {
    path: "/user",
    name: "user",
    meta: {
      auth: true,
    },
    component: User,
  },
  {
    path: "/tnc",
    name: "tnc",
    meta: {
      auth: true,
    },
    component: Tnc,
  },
  {
    path: "/trainer",
    name: "Trainer",
    meta: {
      auth: true,
    },
    component: Trainer,
  },
  {
    path: "/feeder",
    name: "feeder",
    meta: {
      auth: true,
    },
    component: FeederTransaction,
  },
  {
    path: "/place",
    name: "Place",
    meta: {
      auth: true,
    },
    component: Place,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      auth: true,
    },
    component: Product,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      auth: true,
    },
  },
  {
    path: "/histologi",
    name: "histologi",
    component: lazyLoadView("Histology"),
  },
  {
    path: "/histologi-request",
    name: "histologi-request",
    component: lazyLoadViewRequest("Histology"),
  },
  {
    path: "/clinician",
    name: "clinician",
    component: Clinician,
  },
  {
    path: "/hpv",
    name: "hpv",
    component: lazyLoadView("HPV"),
  },
  {
    path: "/molekuler",
    name: "molekuler",
    component: lazyLoadView("Molekuler"),
  },
  {
    path: "/mikrobiologi",
    name: "mikrobiologi",
    component: lazyLoadView("Mikrobiologi"),
  },
  {
    path: "/patologi",
    name: "patologi",
    component: lazyLoadView("Patologi"),
  },
  {
    path: "/pgex",
    name: "pgex",
    component: lazyLoadView("PGex"),
  },
  {
    path: "/sitologi",
    name: "sitologi",
    component: lazyLoadView("Sitology"),
  },
  {
    path: "/form-sitologi",
    name: "Form Sitologi",
    component: lazyLoadViewRequest("Sitology"),
  },
  {
    path: "/form-pgex",
    name: "Form pGex",
    component: lazyLoadViewRequest("Pgex"),
  },
  {
    path: "/form-hpv",
    name: "Form HPV",
    component: lazyLoadViewRequest("HPV"),
  },
  {
    path: "/form-molekuler",
    name: "Form Molekuler",
    component: lazyLoadViewRequest("Molekuler"),
  },
  {
    path: "/form-mikrobiologi",
    name: "Form Mikrobiologi",
    component: lazyLoadViewRequest("Mikrobiologi"),
  },
  {
    path: "/form-patologi",
    name: "Form Patologi",
    component: lazyLoadViewRequest("Patologi"),
  },

  // TRACK RECORD
  {
    path: "/track-record/histopathology",
    name: "Histopathology",
    component: lazyLoadViewTrackRecord("Histopathology"),
  },

  // RESULT FORM
  {
    path: "/result-form/histologi-sitologi",
    name: "Histologi Sitologi",
    component: lazyLoadViewResultForm("HistologiSitologi"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
