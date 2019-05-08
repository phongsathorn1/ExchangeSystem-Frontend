<template>
  <div class="card-a login-box">
    <b-form @submit="onSubmit">
      <h1>เข้าสู่ระบบ</h1>
      <b-form-group id="input-group-1" label="อีเมลล์ (Email)" label-for="email">
        <b-form-input id="email" v-model="email" type="email" :state="isValidate('email')"></b-form-input>
        <b-form-invalid-feedback
          v-for="error in errors.email"
          :key="error"
          :state="isValidate('email')"
        >{{ error }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="รหัสผ่าน" label-for="password">
        <b-form-input id="password" v-model="password" type="password" :state="isValidate('password')"></b-form-input>
        <b-form-invalid-feedback
          v-for="error in errors.password"
          :key="error"
          :state="isValidate('password')"
        >{{ error }}</b-form-invalid-feedback>
      </b-form-group>
      <p style="color:red" v-if="errors.non_field_errors">อีเมลล์หรือรหัสผ่านไม่ถูกต้อง</p>
      <b-button type="submit" class="default-btn">เข้าสู่ระบบ</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {}
    };
  },
  methods: {
    ...mapActions(["loadUser"]),
    async onSubmit(event) {
      event.preventDefault();
      try {
        let response = await this.$axios.post("/user/auth/", {
          email: this.email,
          password: this.password
        });
        this.$store.commit("setUserToken", response.data.token);
        await this.loadUser();

        this.$router.push({ name: "home" });
      } catch (error) {
        this.errors = error.response.data;
      }
    },
    isValidate(field) {
      if (Object.keys(this.errors).length !== 0) {
        if (this.errors['non_field_errors']) {
          return null
        }
        if (this.errors[field]) {
          return false;
        } else {
          return true;
        }
      }
      return null;
    }
  },
  computed: {
    ...mapGetters(["getUserToken"])
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/custom.scss";

.login-box {
  box-shadow: 0px 6px 13px 1px rgba($color: #000000, $alpha: 0.3);
}
</style>
