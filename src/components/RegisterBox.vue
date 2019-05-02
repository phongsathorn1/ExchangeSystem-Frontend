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
            <b-form-select
              id="input-3"
              v-model="form.gender"
              :options="gender"
              class="primary-select"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group id="input-group-2" label="วันเกิด" label-for="age">
            <b-form-input id="age" v-model="form.age" type="date" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6"></b-col>
        <b-col md="12">
          <b-form-group id="input-group-3" label="อีเมลล์ (Email)" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
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
                    required
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
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
                  <b-form-input id="otp" v-model="form.otp" type="text" required></b-form-input>
                </b-form-group>
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
            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="รหัสผ่าน" label-for="password_confirmation">
            <b-form-input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="5">
          <div id="recaptcha-container"></div>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quidem ad doloribus assumenda officia eius consequatur. Minima, deserunt, excepturi eos ea pariatur voluptates animi aspernatur at sit eaque deleniti et!</p>
        </b-col>
      </b-row>
      <b-col md="12">
        <b-row>
          <b-button type="submit" variant="primary">สมัครสมาชิก</b-button>
        </b-row>
      </b-col>
    </b-form>
    <div style="font-size:0.8em">{{ form.firebase_uid }} - {{ phoneWithCountryCode }}</div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { constants } from "crypto";

const config = {
  apiKey: "AIzaSyBLLAHvo386Ip9lsyyzmv5jjWtzHl3lIGE",
  authDomain: "exchangesystem-58880.firebaseapp.com",
  databaseURL: "https://exchangesystem-58880.firebaseio.com",
  projectId: "exchangesystem-58880",
  storageBucket: "exchangesystem-58880.appspot.com",
  messagingSenderId: "271076867854"
};

firebase.initializeApp(config);

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
        password_confirmation: "",
        firebase_uid: ""
      },
      gender: [{ text: "กรุณาระบุเพศ", value: null }, "ชาย", "หญิง", "อื่นๆ"],
      showOTP: false
    };
  },
  mounted() {
    firebase.auth().languageCode = "th";
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onRequestOTP();
        }
      }
    );
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let response = null

      try {
        response = await this.$axios.post("/user/register/", {
          email: this.form.email,
          first_name: this.form.firstname,
          last_name: this.form.lastname,
          password: this.form.password,
          phone: this.phoneWithZeroPrepare,
          firebase_uid: this.form.firebase_uid
        });

        this.$store.commit('setUserToken', response.data.token)
        this.$store.commit('setUser', response.data)
        this.$emit('submit', self.form)

      } catch (error) {
          console.log(error)
          console.log(error.response)
      }
    },
    onRequestOTP() {
      let appVerifier = window.recaptchaVerifier;
      let self = this;
      firebase
        .auth()
        .signInWithPhoneNumber(this.phoneWithCountryCode, appVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
          console.log(confirmationResult);
          self.showOTP = true;
        })
        .catch(function(error) {
          // Error; SMS not sent
          console.log(error);
          grecaptcha.reset(window.recaptchaWidgetId);
          //   window.recaptchaVerifier.render().then(function(widgetId) {
          //     grecaptcha.reset(widgetId);
          //   });
        });
    },
    onConfirmOTP() {
      var credential = firebase.auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        this.form.otp
      );
      firebase.auth().signInAndRetrieveDataWithCredential(credential);
      this.form.firebase_uid = firebase.auth().currentUser.uid;

      //For debugging
      console.log(credential);
      console.log(firebase.auth().currentUser.uid);
    }
  },
  computed: {
    phoneWithCountryCode: function() {
      let phoneNumber = this.form.phone;
      let countryCode = "+66";

      if (phoneNumber[0] == "0") {
        phoneNumber = phoneNumber.slice(1, phoneNumber.length);
      }

      return countryCode + phoneNumber;
      // return this.form.phone
    },
    phoneWithZeroPrepare: function() {
      let phoneNumber = this.form.phone;

      if (phoneNumber[0] != "0") {
        phoneNumber = "0" + phoneNumber;
      }

      return phoneNumber;
    }
  }
};
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
