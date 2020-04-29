<template>
  <div class="card-a">
    <h1 class="text-center">สมัครสมาชิก</h1>
    <b-form @submit="onSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group id="input-group-1" label="ชื่อ" label-for="firstname">
            <b-form-input id="firstname" v-model="form.firstname" type="text" :state="isValidate('first_name')"></b-form-input>
            <b-form-invalid-feedback v-for="error in errors.email" :key="error" :state="isValidate('first_name')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="input-group-2" label="นามสกุล" label-for="lastname">
            <b-form-input id="lastname" v-model="form.lastname" type="text" :state="isValidate('last_name')"></b-form-input>
            <b-form-invalid-feedback v-for="error in errors.last_name" :key="error" :state="isValidate('last_name')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-2" label="เพศ" label-for="gender">
            <b-form-select
              id="input-3"
              v-model="form.gender"
              :options="gender"
              class="primary-select"
              :state="isValidate('gender')"
            ></b-form-select>
            <b-form-invalid-feedback v-for="error in errors.gender" :key="error" :state="isValidate('gender')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-2" label="วันเกิด" label-for="birthday">
            <b-form-input id="birthday" v-model="form.birthday" type="date" :state="isValidate('birthday')"></b-form-input>
             <b-form-invalid-feedback v-for="error in errors.birthday" :key="error" :state="isValidate('birthday')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6"></b-col>
        <b-col md="12">
          <b-form-group id="input-group-3" label="อีเมลล์ (Email)" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" :state="isValidate('email')"></b-form-input>
            <b-form-invalid-feedback v-for="error in errors.email" :key="error" :state="isValidate('email')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-row>
            <b-col md="8">
              <b-form-group id="input-group-4" label="เบอร์โทรศัพท์" label-for="phone">
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                  <b-input-group-prepend is-text>
                    <i class="flag-icon thailand-flag">ประเทศไทย</i>
                    <b>+66</b>
                  </b-input-group-prepend>
                  <b-form-input
                    id="phone"
                    v-model="form.phone"
                    type="text"
                    placeholder="0812345678"
                    :disabled="form.firebase_uid != ''"
                    :state="isValidate('phone') && isValidate('firebase_uid')"
                  ></b-form-input>
                  <b-form-invalid-feedback v-for="error in errors.phone" :key="error" :state="isValidate('phone')">
                    {{ error }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="isValidate('firebase_uid')">
                    กรุณายืนยันเบอร์โทรศัพท์ของคุณ
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
              <span v-if="waitingOTP"><b-spinner type="grow" label="Loading..."></b-spinner> กำลังส่งรหัส OTP ไปที่เบอร์โทรศัพท์...</span>
            </b-col>
            <b-col md="4" class="d-flex align-items-end">
              <b-form-group>
                <b-button variant="primary" @click="onRequestOTP" id="request-otp">ขอรหัสยืนยัน OTP</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="12" v-if="showOTP">
          <div class="verify-phone">
            <b-row>
              <b-col sm="7">
                <b-form-group id="input-group-4" label="OTP Code" label-for="otp">
                  <b-form-input id="otp" v-model="form.otp" type="text" :state="otpValidate()"></b-form-input>
                  <b-form-invalid-feedback :state="otpValidate()">
                    รหัส OTP ไม่ถูกต้อง
                  </b-form-invalid-feedback>
                </b-form-group>
                <span v-if="validatingOTP"><b-spinner variant="success" label="Spinning"></b-spinner> กำลังยืนยันรหัส OTP</span>
              </b-col>
              <b-col sm="5" class="d-flex align-items-end">
                <b-form-group>
                  <b-button variant="primary" @click="onConfirmOTP">ยืนยันรหัส OTP</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col md="7">
          <b-form-group id="input-group-4" label="รหัสผ่าน" label-for="password">
            <b-form-input id="password" v-model="form.password" type="password" :state="isValidate('password')"></b-form-input>
            <b-form-invalid-feedback v-for="error in errors.password" :key="error" :state="isValidate('password')">
              {{ error }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-4" label="รหัสผ่าน" label-for="password_confirmation">
            <b-form-input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              :state="passwordValidate()"
            ></b-form-input>
            <b-form-invalid-feedback :state="passwordValidate()">
              รหัสผ่านไม่ตรงกัน
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="5">
          <div id="recaptcha-container"></div>
          <br>
          <p>การตั้งรหัสผ่านที่ดี ควรมีความยาวมากกว่า 6 ตัวอักษร มีการผสมตัวอักษร [A-z] และอักขระพิเศษอื่นๆ (! . _ -)</p>
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
import firebase from 'firebase'
// import axios from 'axios'
// import { constants } from 'crypto'
import { mapActions } from 'vuex'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
}

firebase.initializeApp(config)

export default {
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        gender: null,
        email: '',
        phone: '',
        otp: '',
        birthday: null,
        password: '',
        password_confirmation: '',
        firebase_uid: ''
      },
      gender: [
        { text: 'กรุณาระบุเพศ', value: null },
        { text: 'ชาย', value: 'F' },
        { text: 'หญิง', value: 'M' },
        { text: 'อื่นๆ', value: 'X' }
      ],
      showOTP: false,
      waitingOTP: false,
      validatingOTP: false,
      otpError: null,
      errors: {

      }
    }
  },
  mounted () {
    firebase.auth().languageCode = 'th'
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onRequestOTP()
        }
      }
    )
  },
  methods: {
    ...mapActions(['loadUserToken', 'loadUser']),
    async onSubmit (event) {
      event.preventDefault()
      let response = null

      try {
        response = await this.$axios.post('/user/register/', {
          email: this.form.email,
          first_name: this.form.firstname,
          last_name: this.form.lastname,
          password: this.form.password,
          phone: this.phoneWithZeroPrepare,
          firebase_uid: this.form.firebase_uid,
          gender: this.form.gender,
          birthday: this.form.birthday
        })

        this.$store.commit('setUserToken', response.data.token)
        this.$store.commit('setUser', response.data)
        this.$emit('submit', self.form)
        this.loadUser()
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          this.errors = error.response.data
          console.log('ok')
        }
      }
    },
    onRequestOTP () {
      let appVerifier = window.recaptchaVerifier
      let self = this
      this.waitingOTP = true
      firebase
        .auth()
        .signInWithPhoneNumber(this.phoneWithCountryCode, appVerifier)
        .then(function (confirmationResult) {
          window.confirmationResult = confirmationResult
          console.log(confirmationResult)
          self.showOTP = true
          self.waitingOTP = false
        })
        .catch(function (error) {
          // Error; SMS not sent
          console.log(error)
          grecaptcha.reset(window.recaptchaWidgetId)
          //   window.recaptchaVerifier.render().then(function(widgetId) {
          //     grecaptcha.reset(widgetId);
          //   });
        })
    },
    async onConfirmOTP () {
      this.validatingOTP = true
      try {
        var credential = firebase.auth.PhoneAuthProvider.credential(
          confirmationResult.verificationId,
          this.form.otp
        )
        await firebase.auth().signInAndRetrieveDataWithCredential(credential)
        this.form.firebase_uid = firebase.auth().currentUser.uid
        console.log(credential)
        console.log(firebase.auth().currentUser.uid)
        this.otpError = false
      } catch (error) {
        this.otpError = true
      }
      this.validatingOTP = false
    },
    otpValidate () {
      if (this.otpError) {
        return false
      }
      if (this.form.firebase_uid !== '') {
        return true
      }
      return null
    },
    isValidate (field) {
      if (Object.keys(this.errors).length !== 0) {
        if (this.errors[field]) {
          return false
        } else {
          return true
        }
      }
      return null
    },
    passwordValidate () {
      if (this.form.password !== '' && this.form.password_confirmation !== '') {
        return this.form.password_confirmation === this.form.password
      }
    }
  },
  computed: {
    phoneWithCountryCode: function () {
      let phoneNumber = this.form.phone
      let countryCode = '+66'

      if (phoneNumber[0] === '0') {
        phoneNumber = phoneNumber.slice(1, phoneNumber.length)
      }

      return countryCode + phoneNumber
      // return this.form.phone
    },
    phoneWithZeroPrepare: function () {
      let phoneNumber = this.form.phone

      if (phoneNumber[0] !== '0') {
        phoneNumber = '0' + phoneNumber
      }

      return phoneNumber
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/custom.scss";

.verify-phone {
  background: $secondary-color;
  padding: 20px;
  margin: 10px 0px;
}

.flag-icon {
  text-indent: 1000px;
  overflow: hidden;
  display: inline-block;
  width: 30px;
}

.thailand-flag {
  background: url("~@/assets/thailand.svg") no-repeat;
}
</style>
