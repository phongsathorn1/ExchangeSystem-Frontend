<template>
  <div id="app">
    <navbar @toggle="handleToggle" @logout="handleLogout()" :notiCount="notiCount"></navbar>
    <notification-pane
      :show="showNotification"
      @close="handleToggle('notification')"
      @notification-count="updateNotiCount"
    ></notification-pane>
    <router-view/>
    <div class="alert-modal" :class="{'show-modal': modalShow}">
      <div class="inner-alert-modal"><i class="icofont-info-circle"></i> {{ modalMsg }}</div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    Navbar,
    NotificationPane
  },
  data() {
    return {
      showNotification: false,
      notiCount: 0,
      modalShow: false,
      modalMsg: ""
    };
  },
  created() {
    this.loadUserToken();
    this.loadUser();
  },
  methods: {
    ...mapActions(["loadUserToken", "loadUser"]),
    handleToggle(element) {
      if (element == "notification") {
        this.showNotification = !this.showNotification;
      }
    },
    updateNotiCount(value) {
      this.notiCount = value;
    },
    handleLogout() {
      this.showModal("ออกจากระบบสำเร็จ");
    },
    showModal(message) {
      this.modalShow = true;
      this.modalMsg = message;

      let self = this

      setTimeout(function() {
        self.modalShow = false;
        self.modalMsg = "";
      }, 3000);
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userToken: "getUserToken"
    })
  }
};
</script>


<style lang="scss">
@import "assets/custom.scss";
@import "assets/icofont/icofont.min.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  min-height: 100vh;
  font-family: "Athiti", sans-serif;
  font-size: 1.02em;
}

.inner-alert-modal {
  background: #ffffff;
  text-align: center;
  box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.4);
  margin: auto;
  max-width: 900px;
  padding: 20px;
  font-size: 1.2em;
  position: relative;
  top: 0px;
  border-radius: 5px;
  font-weight: 500;
}

.alert-modal {
  position: absolute;
  top: -100px;
  width: 100%;
  transition: 0.5s;
}

.alert-modal.show-modal {
  top: 80px;
}
</style>
