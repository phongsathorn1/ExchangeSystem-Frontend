<template>
  <div class="card-a">
    <h1 class="text-center">สมัครสมาชิก</h1>
    <b-form @submit="onSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group id="input-group-1" label="ชื่อ" label-for="firstname">
            <b-form-input id="firstname" v-model="form.firstname" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
            <b-form-group id="input-group-2" label="นามสกุล" label-for="lastname">
                <b-form-input id="lastname" v-model="form.lastname" type="text" required></b-form-input>
            </b-form-group>
        </b-col>
        <b-col sm="6">
            <b-form-group id="input-group-2" label="เพศ" label-for="gender">
                <b-form-select id="input-3" v-model="form.gender" :options="gender" required></b-form-select>
            </b-form-group>
        </b-col>
        <b-col sm="6">
            <b-form-group id="input-group-2" label="วันเกิด" label-for="age">
                <b-form-input id="age" v-model="form.age" type="date" required></b-form-input>
            </b-form-group>
        </b-col>
        <b-col md="6">
        </b-col>
        <b-col md="12">
            <b-form-group id="input-group-3" label="อีเมลล์ (Email)" label-for="email">
                <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
            </b-form-group>
        </b-col>
        <b-col md="8">
            <b-form-group id="input-group-4" label="เบอร์โทรศัพท์" label-for="phone">
                <b-form-input id="phone" v-model="form.phone" type="text" required></b-form-input>
            </b-form-group>
            <b-button variant="primary" @click="onRequestOTP">ขอรหัสยืนยัน OTP</b-button>
        </b-col>
        <b-col md="12" v-if="showOTP">
            <div class="verify-phone">
                <b-row>
                    <b-col sm="7">
                        <b-form-group id="input-group-4" label="OTP Code" label-for="otp">
                            <b-form-input id="otp" v-model="form.otp" type="text" required></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col sm="5">
                        <b-button variant="primary">ยืนยันรหัส OTP</b-button>
                    </b-col>
                </b-row>
            </div>
        </b-col>
        <b-col md="7">
            <b-form-group id="input-group-4" label="รหัสผ่าน" label-for="password">
                <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="รหัสผ่าน" label-for="password_confirmation">
                <b-form-input id="password_confirmation" v-model="form.password_confirmation" type="password" required></b-form-input>
            </b-form-group>
        </b-col>
        <b-col md="5">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quidem ad doloribus assumenda officia eius consequatur. Minima, deserunt, excepturi eos ea pariatur voluptates animi aspernatur at sit eaque deleniti et!</p>
        </b-col>
      </b-row>
      <b-col md="12">
          <b-row>
            <b-button type="submit" variant="primary">สมัครสมาชิก</b-button>
          </b-row>
      </b-col>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        form: {
            firstname: "",
            lastname: "",
            gender: null,
            email: "",
            phone: "",
            otp: "",
            password: "",
            password_confirmation: ""
        },
        gender: [
            {text: 'กรุณาระบุเพศ', value: null},
            'ชาย',
            'หญิง',
            'อื่นๆ'
        ],
        showOTP: false
    }
  },
  methods: {
      onSubmit() {
          this.$emit('submit', form)
      },
      onRequestOTP() {
          this.showOTP = true
      }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/custom.scss";

.verify-phone{
    background: $secondary-color;
    padding: 20px;
    margin: 10px 0px;
}
</style>
