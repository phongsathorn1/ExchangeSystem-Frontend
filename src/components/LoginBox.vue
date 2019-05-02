<template>
  <div class="card-a login-box">
    <b-form @submit="onSubmit">
      <h1>เข้าสู่ระบบ</h1>
      <b-form-group id="input-group-1" label="อีเมลล์ (Email)" label-for="email">
        <b-form-input id="email" v-model="email" type="email" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="รหัสผ่าน" label-for="password">
        <b-form-input id="password" v-model="password" type="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" class="default-btn">เข้าสู่ระบบ</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions([
      'loadUser'
    ]),
    async onSubmit(event) {
      event.preventDefault();
      let response = await axios.post("http://localhost:8000/user/auth/", {
        email: this.email,
        password: this.password
      });
      this.$store.commit("setUserToken", response.data.token);
      this.loadUser()
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    ...mapGetters([
      'getUserToken'
    ])
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/custom.scss";

.login-box {
  box-shadow: 0px 6px 13px 1px rgba($color: #000000, $alpha: 0.3);
}
</style>
